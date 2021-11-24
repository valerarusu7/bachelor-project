import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  header: string;
}

function Layout({ children, header }: LayoutProps) {
  return (
    <div className="light">
      <div className="bg-gray-100 dark:bg-gray-800 flex overflow-hidden relative h-screen transition duration-500">
        <Sidebar />
        <div className=" h-screen w-full transition duration-500">
          <div className="overflow-auto h-screen relative scrollbar-hide transition duration-500">
            <Header header={header} />
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
