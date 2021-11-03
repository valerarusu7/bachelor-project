import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element,
  header: string 
}

function Layout({ children, header } : LayoutProps) {
  return (
    <div className="light">
      <div className="bg-gray-200 dark:bg-gray-800 flex overflow-hidden relative h-screen transition duration-500">
        <Sidebar />
        <div className="pl-2 pr-2 h-screen w-full transition duration-500">
          <Header header={header} />
          <div className="hidden sm:block" aria-hidden="true">
            <div className="border-t border-gray-300" />
          </div>
          <div className="overflow-auto h-screen mt-2 p-1 pb-24 relative scrollbar-hide transition duration-500">
              {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
