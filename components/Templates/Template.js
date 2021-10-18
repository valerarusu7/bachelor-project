import { BiSelectMultiple, BiCodeAlt } from "react-icons/bi";
import { BsQuestion } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function Template({ template }) {
  return (
    <div className="bg-white  pt-4 pb-2 rounded-lg shadow-xl cursor-pointer ">
      <div className="relative h-20 flex items-center">
        <div className="absolute w-full flex justify-end mb-10 pr-4">
          <p className="uppercase font-bold text-gray-400">{template.created}</p>
        </div>
        <div className="absolute h-0.5 w-full bg-gray-200"></div>
        <div className="rounded-full h-16 w-16 white absolute ml-10 flex justify-center items-center">
          <div className="p-2 rounded-full h-16 w-16 bg-white">
            <img src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png" alt="logo" className="  " />
          </div>
        </div>
      </div>

      <div className="pl-4 pr-2 mt-2 flex justify-between">
        <div className="flex">
          {template.multiple ? (
            <div className="rounded-full bg-blue-400 h-8 w-8 flex justify-center items-center border-2 border-blue-500 mr-1 p-1">
              <BiSelectMultiple className="h-6 w-6 text-white" />
            </div>
          ) : null}
          {template.single ? (
            <div className="rounded-full bg-blue-400 h-8 w-8 flex justify-center items-center border-2 border-blue-500 mr-1">
              <BsQuestion className="h-6 w-6 text-white" />
            </div>
          ) : null}

          {template.mail ? (
            <div className="rounded-full bg-blue-400 h-8 w-8 flex justify-center items-center border-2 border-blue-500 mr-1 p-1">
              <MdEmail className="h-6 w-6 text-white" />
            </div>
          ) : null}
          {template.code ? (
            <div className="rounded-full bg-blue-400 h-8 w-8 flex justify-center items-center border-2 border-blue-500 mr-1 p-1">
              <BiCodeAlt className="h-6 w-6 text-white" />
            </div>
          ) : null}
        </div>
        <div className="flex justify-center items-center pr-2">
          <p className="uppercase font-extrabold text-green-500 text-sm">{`${template.tasks} tasks`}</p>
        </div>
      </div>

      <div className="pl-4 pr-2 mt-4">
        <p className="text-2xl font-extrabold text-gray-800 truncate">{template.name}</p>
        <div className="mt-1 ">
          <p className="text-sm text-gray-600 break-normal line-clamp-2 ...">{template.description} </p>
        </div>
      </div>

      <div className="pl-4 pr-4 mt-4 flex justify-between items-center">
        <div>
          <p className="font-bold text-gray-700">{`87 candidates`}</p>
        </div>
        <div>
          <p className="font-bold text-gray-700">{`Avg score: 80%`}</p>
        </div>
      </div>

      <div className="pb-2 pt-4 flex justify-center items-center">
        <button className="bg-gray-800 pr-2 pl-2 pb-1 pt-1 rounded-lg text-white font-semibold hover:bg-gray-700">In Use</button>
      </div>
    </div>
  );
}

export default Template;
