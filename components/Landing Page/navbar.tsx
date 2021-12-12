import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();

  return (
    <div className=" w-full">
      <nav className=" w-full text-center" role="navigation">
        <div className="navbar-collapse collapse">
          <ul>
            <li className="float-left  inline-block ">
              <a
                href="#"
                className="px-32 border-b-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 hidden justify-center tracking-widest md:flex items-center space-x-4"
              ></a>
            </li>
            <li className="float-none inline-block space-x-8 px-4">
              <a
                href="/welcome"
                className="px-4  border-gray-400 border-b-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 hidden justify-center tracking-widest md:flex items-center space-x-8"
              >
                Welcome
              </a>
            </li>
            <li className="float-none inline-block  space-x-8 px-4">
              <a
                href="#"
                className="px-4  border-gray-400 border-b-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 hidden justify-center tracking-widest md:flex items-center space-x-8"
              >
                Features
              </a>
            </li>
            <li className="active float-none inline-block space-x-8 px-4">
              <a
                href="#"
                className="flex items-center py-2 px-2 text-gray-700 hover:text-blue-400 hidden justify-center tracking-widest md:flex items-center space-x-8"
              >
                <div className="flex justify-center items-center ">
                  <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center mt-2  ">
                    <img
                      src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png"
                      alt="logo"
                      className="h-16 w-16 p-2 "
                    ></img>
                  </div>
                </div>
              </a>
            </li>
            <li className="float-none inline-block space-x-8 px-4">
              <a
                href="/team"
                className=" px-2  border-gray-400 border-b-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 hidden justify-center tracking-widest md:flex items-center space-x-8"
              >
                Team
              </a>
            </li>
            <li className="float-none inline-block space-x-8 px-4">
              <a
                href="#"
                className=" px-2  border-gray-400 border-b-2 border-gray-400 border-b-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 hidden justify-center tracking-widest md:flex items-center space-x-8"
              >
                Success Stories
              </a>
            </li>

            <li className=" float-right space-x-8 px-4">
              <a
                href={`${
                  router.pathname === "/auth/login" ? "" : "/auth/login"
                }`}
                className="pt-16 px-2 mr-36 border-gray-400 border-b-2 border-gray-400 border-b-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 hidden  tracking-widest md:flex items-center space-x-8 "
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
