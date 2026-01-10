// components/ThemeSwitcher.js
import { useTheme } from "next-themes";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (theme === "claro") {
      setTheme("oscuro");
    } else {
      setTheme("claro");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-globalone transition-all duration-300 p-[7px] rounded-lg hover:bg-tertiary/100 "
      aria-label="Cambiar tema"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export default ThemeSwitcher;
