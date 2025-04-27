export const themeEffect = () => {
  const theme = localStorage.theme;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    return;
  }
  document.documentElement.classList.remove("dark");
};
