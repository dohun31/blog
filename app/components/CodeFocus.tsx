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

    if (!pre || !target) return;

    const tokens = pre.querySelectorAll("span");

    Array.from(tokens).forEach((node) => {
      if (node.textContent === target) {
        node.classList.add("focus-target");
      } else {
        node.classList.remove("focus-target");
      }
    });
  }, [target]);

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

export function CodeFocusTarget({
  children,
  target,
}: {
  children: ReactNode;
  target: string;
}) {
  const { setHovered, setTarget } = useCodeFocusContext();

  return (
    <code
      className="code-focus-target"
      onMouseEnter={() => {
        setHovered(true);
        setTarget(target);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: "opacity 0.2s" }}
    >
      {children}
    </code>
  );
}
