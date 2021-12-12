import { BellIcon } from "@heroicons/react/outline";

export interface HeaderProps {
  header: string;
}

function Header({ header }: HeaderProps) {
  function logout() {
    fetch("/api/account/logout", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        //Handle error
        console.log(error);
      });
  }

  return (
    <header className="bg-white h-16 relative w-full items-center flex justify-end transition duration-500  p-4 shadow">
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-2xl font-bold">{header}</p>
        </div>
        <div className="flex">
          <div className="h-8 w-8 rounded-full flex justify-center items-center mr-1  hover:border-2 hover:border-blue-500 hover:text-blue-500 text-black cursor-pointer transition transform ease-in-out duration-400">
            <BellIcon className="h-6 w-6 " />
          </div>
          <div className="flex items-center mr-2">
            <img
              src="https://www.cityam.com/wp-content/uploads/2021/01/Manchester-United-v-Manchester-City---Premier-League-1290892183-960x640.jpg"
              className="mx-auto object-cover rounded-full h-8 w-8 cursor-pointer hover:opacity-90 mr-1"
            />
          </div>
          <div
            className="flex justify-center items-center text-gray-600 text-sm font-semibold cursor-pointer hover:opacity-80"
            onClick={() => logout()}
          >
            <p>Log out</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
