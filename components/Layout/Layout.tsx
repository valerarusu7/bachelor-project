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
      <div className="bg-white dark:bg-gray-800 flex overflow-hidden relative h-screen transition duration-500">
        <Sidebar />
        <div className=" h-screen w-full transition duration-500">
          <div className="overflow-auto h-screen  pl-4 pr-4 pb-8 relative scrollbar-hide transition duration-500">
            <Header header={header} />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
