import Link from "next/link";

function NavBar({ navbar }) {
  return (
    <nav class="bg-gray-100">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex">
            <div>
              <a
                href="#"
                class="flex items-center py-2 px-2 text-gray-700 hover:text-gray-900"
              >
                <div class="flex justify-center items-center ">
                  <div class="h-20 w-20 rounded-full bg-white flex justify-center items-center mt-2  hover:animate-spin ">
                    <img
                      src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png"
                      alt="logo"
                      class="h-16 w-16 p-2 "
                    ></img>
                  </div>
                </div>
                <span class="text-3xl font-bold m-3">Eligo</span>
              </a>
            </div>

            <div class="hidden md:flex items-center space-x-1">
              <a href="#" class="py-5 px-2 text-gray-700 hover:text-gray-900">
                Welcome
              </a>
              <a href="#" class="py-5 px-2 text-gray-700 hover:text-gray-900">
                Features
              </a>
              <a href="#" class="py-5 px-2 text-gray-700 hover:text-gray-900">
                Team
              </a>
              <a href="#" class="py-5 px-2 text-gray-700 hover:text-gray-900">
                Success Stories
              </a>
            </div>
          </div>
          <div class="md:hidden flex items-center">
            <button class="mobile-menu-button">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="mobile-menu hidden md:hidden">
        <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">
          Welcome
        </a>
        <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">
          Team
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
