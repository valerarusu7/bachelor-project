import Header from "./Header";
import Separator from "../common/Separator";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

function Layout({ children, header }) {
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
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 0, y: 0 },
                enter: { opacity: 1, x: 0, y: 0 },
                exit: { opacity: 0, x: 0, y: 0 },
              }} // Pass the variant object into Framer Motion
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
