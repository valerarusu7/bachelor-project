import { BellIcon } from "@heroicons/react/outline";

function Header() {
  return (
    <header className="bg-white dark:bg-gray-700 h-16 rounded-lg shadow-lg relative z-40 w-full items-center flex justify-end p-4 transition duration-500">
      <div className="flex items-center justify-end">
        <div></div>
        <img
          src="https://www.cityam.com/wp-content/uploads/2021/01/Manchester-United-v-Manchester-City---Premier-League-1290892183-960x640.jpg"
          className="mx-auto object-cover rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
        />
      </div>
    </header>
  );
}

export default Header;
