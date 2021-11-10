import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion"
import NavBar from "../Landing Page/navbar";

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  header: string;
}

function LandindLayout({ children }: LayoutProps) {
  return (
    <div>
        <NavBar/>
      </div>
  );
}

export default LandindLayout;
