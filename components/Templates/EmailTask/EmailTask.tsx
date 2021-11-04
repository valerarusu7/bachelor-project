import { BiText } from "react-icons/bi";
import { CheckIcon } from "@heroicons/react/solid";
import EmailChoice from "../Choice";
import { MdEmail } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";

function EmailTask() {
  return (
    <div className="bg-white mt-10 rounded-lg  p-4 shadow-lg relative">
      <div className="bg-red-200 w-full flex justify-center items-center">
        <div className="rounded-full bg-gradient-to-tr from-red-500 to-red-400 h-12 w-12 flex justify-center items-center disabled:opacity-50 transition transform duration-400 ease-in-out absolute -top-4 shadow-lg">
          <MdEmail className="text-white h-8 w-8" />
        </div>
      </div>
      <div className="w-full mt-8 p-2">
        <div>
          <label htmlFor="company-website" className="block text-md font-medium text-gray-700">
            Email content
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <textarea
              className="mt-1 w-full resize-none"
              rows={6}
              placeholder="Enter the email content here."
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <div className="w-1/3">
            <label htmlFor="company-website" className="block text-md font-medium text-gray-700">
              Email answer
            </label>
          </div>

          <div className="flex justify-end items-center w-2/3">
            <button
              disabled
              className="rounded-lg p-2 bg-gradient-to-tr from-red-500 to-red-400 flex justify-center items-center text-white cursor-pointer font-semibold mr-6 disabled:opacity-50"
            >
              <BiText className="h-6 w-6" />
              <p>Text answer</p>
            </button>
            <button className="rounded-lg p-2 bg-gradient-to-tr from-red-500 to-red-400 flex justify-center items-center text-white cursor-pointer font-semibold disabled:opacity-50">
              <div className="absolute rounded-full bg-green-500 p-1 mb-12 ml-36 shadow-lg border-2 border-white">
                <CheckIcon className="h-4 w-4" />
              </div>

              <VscTasklist className="h-6 w-6 mr-1" />
              <p>Choice answer</p>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <EmailChoice id={1} />
          <EmailChoice id={2} />
          <div className="mt-2">
            <button className="rounded-lg text-white bg-gradient-to-tr from-red-500 to-red-400 pl-4 pr-4 pt-2 pb-2 font-semibold hover:opacity-80">
              Add choice
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end">
          <button className="bg-green-500 text-white font-semibold pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg hover:opacity-80">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailTask;
