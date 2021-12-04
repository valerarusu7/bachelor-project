import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { IHeroIcon } from "../../types";

export interface ICustomButton {
  color: string;
  children: string | JSX.Element | IHeroIcon;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean | undefined;
  customStyles?: string | undefined;
  type?: string;
}

function CustomButton({ color, children, onClick, disabled, customStyles }: ICustomButton) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${customStyles} bg-gradient-to-tr ${
        color === "red"
          ? "from-red-600 to-red-400"
          : color === "blue"
          ? "from-blue-600 to-blue-400"
          : color === "sky"
          ? "from-sky-600 to-sky-400"
          : color === "green"
          ? "from-green-600 to-green-400"
          : color === "purple"
          ? "from-purple-600 to-purple-400"
          : null
      } text-white pr-4 pl-4 pb-2 pt-2 rounded-lg font-semibold shadow-lg hover:opacity-80 ${disabled ? "opacity-50" : null}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default CustomButton;
