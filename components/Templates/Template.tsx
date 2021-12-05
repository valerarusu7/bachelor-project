import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";

import { BsQuestion } from "react-icons/bs";
import { ITemplateObject } from "../../types";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import moment from "moment";

function Template({ template }: ITemplateObject) {
  return (
    <Link href={`/templates/${template._id}`}>
      <div className="bg-white pt-4 pb-4 rounded-lg shadow-xl cursor-pointer border border-gray-300">
        <div className="relative h-20 flex items-center">
          <div className="absolute w-full flex justify-end mb-10 pr-4">
            <p className="uppercase font-bold text-gray-400">
              {moment(moment.utc(template.createdAt), "YYYYMMDD").fromNow()}
            </p>
          </div>
          <div className="absolute h-0.5 w-full bg-gray-200"></div>
          <div className="rounded-full h-16 w-16 white absolute ml-10 flex justify-center items-center">
            <div className="p-2 rounded-full h-16 w-16 bg-white">
              <img
                src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png"
                alt="logo"
                className="  "
              />
            </div>
          </div>
        </div>

        <div className="pl-4 pr-2 mt-2 flex justify-between">
          <div className="flex">
            {template.multiple ? (
              <div className="rounded-full bg-gradient-to-tr from-purple-700 to-purple-400 h-8 w-8 flex justify-center items-center mr-1 p-1">
                <BiSelectMultiple className="h-6 w-6 text-white" />
              </div>
            ) : null}
            {template.single ? (
              <div className="rounded-full bg-gradient-to-tr from-sky-700 to-sky-400 h-8 w-8 flex justify-center items-center mr-1">
                <BsQuestion className="h-6 w-6 text-white" />
              </div>
            ) : null}

            {template.email ? (
              <div className="rounded-full bg-gradient-to-tr from-red-700 to-red-400 h-8 w-8 flex justify-center items-center  mr-1 p-1">
                <MdEmail className="h-6 w-6 text-white" />
              </div>
            ) : null}
            {template.code ? (
              <div className="rounded-full bg-gradient-to-tr from-orange-700 to-orange-400 h-8 w-8 flex justify-center items-center mr-1 p-1">
                <BiCodeAlt className="h-6 w-6 text-white" />
              </div>
            ) : null}
          </div>
          <div className="flex justify-center items-center pr-2">
            <p className="uppercase font-extrabold text-green-500 text-sm">{`${
              template.tasksLength
            } ${
              template.tasksLength !== undefined && template?.tasksLength > 1
                ? "tasks"
                : "task"
            }`}</p>
          </div>
        </div>

        <div className="pl-4 pr-2 mt-4">
          <p className="text-2xl font-extrabold text-gray-800 truncate">
            {template.name}
          </p>
          <div className="mt-1 ">
            <p className="text-sm text-gray-600 break-normal line-clamp-2 ...">
              {template.description}{" "}
            </p>
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

        <Link href={`/interview`}>
          <button>preview</button>
        </Link>
      </div>
    </Link>
  );
}

export default Template;
