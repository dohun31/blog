"use client";

import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface CodeFocusContextType {
  hovered: boolean;
  setHovered: (v: boolean) => void;
  target: string;
  setTarget: (v: string) => void;
}

const CodeFocusContext = createContext<CodeFocusContextType>({
  hovered: false,
  setHovered: () => {},
  target: "",
  setTarget: () => {},
});

export function useCodeFocusContext() {
  return useContext(CodeFocusContext);
}

export function CodeFocus({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [target, setTarget] = useState("");
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pre = areaRef.current?.querySelector("pre");
    if (!pre) return;

    // 모든 span에서 focus-target 제거
    pre
      .querySelectorAll("span.focus-target")
      .forEach((el) => el.classList.remove("focus-target"));

    if (!hovered || !target) return;

    // leaf span 중 target 포함하는 것만 focus-target 부여
    pre.querySelectorAll("span").forEach((node) => {
      if (
        node.childElementCount === 0 &&
        Array.from(node.childNodes).some(
          (n) =>
            n.nodeType === Node.TEXT_NODE && n.textContent?.includes(target)
        )
      ) {
        node.classList.add("focus-target");
      }
    });
  }, [hovered, target]);

  return (
    <CodeFocusContext.Provider
      value={{ hovered, setHovered, target, setTarget }}
    >
      <style>{`
        pre[data-hovered="true"] {
          --code-opacity: 0.3;
        }
      `}</style>
      <div ref={areaRef}>
        {React.Children.map(children, (child) => {
          if (
            typeof child === "object" &&
            child !== null &&
            "type" in child &&
            child.type === "pre"
          ) {
            return cloneElement(child, {
              "data-hovered": hovered,
            });
          }
          return child;
        })}
      </div>
    </CodeFocusContext.Provider>
  );
}

CodeFocus.Target = function Target({
  children,
  target,
}: {
  children: ReactNode;
  target: string;
}) {
  const { setHovered, setTarget } = useCodeFocusContext();

  useEffect(() => {
    setTarget(target);
  }, [target, setTarget]);

  return (
    <code
      className="code-focus-target"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: "opacity 0.2s" }}
    >
      {children}
    </code>
  );
};
