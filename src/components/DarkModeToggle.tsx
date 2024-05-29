import { FC } from "react";
import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {darkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkModeToggle;
