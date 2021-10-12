import { BellIcon } from "@heroicons/react/outline";

function Header({ header }) {
  return (
    <header className=" dark:bg-gray-700 h-16 relative z-40 w-full items-center flex justify-end p-1 transition duration-500">
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-4xl font-bold text-gray-700">{header}</p>
        </div>
        <div className="flex">
          <div className="h-8 w-8 rounded-full flex justify-center items-center mr-1 hover:bg-gray-300 text-gray-500 cursor-pointer">
            <BellIcon className="h-6 w-6 " />
          </div>
          <div className="flex items-center">
            <img
              src="https://www.cityam.com/wp-content/uploads/2021/01/Manchester-United-v-Manchester-City---Premier-League-1290892183-960x640.jpg"
              className="mx-auto object-cover rounded-full h-8 w-8 cursor-pointer hover:opacity-90 mr-1"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
