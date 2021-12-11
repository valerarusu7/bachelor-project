import { MailIcon, ClipboardListIcon } from "@heroicons/react/outline";
import { MouseEventHandler } from "react";
import { ITemplate } from "../../types";
import CustomButton from "../common/CustomButton";

interface IInterviewHeader {
  companyName: string;
  templateName: string;
  openEmails: any;
  openTasks: any;
  emailCount: Number;
  taskCount: Number;
  showEmails: boolean;
  showTasks: boolean;
  finished: boolean;
  onSubmit: any;
}
function InterviewHeader({
  companyName,
  templateName,
  openEmails,
  openTasks,
  emailCount,
  taskCount,
  showEmails,
  showTasks,
  finished,
  onSubmit,
}: IInterviewHeader) {
  return (
    <nav className="bg-darkGray shadow w-full h-16 flex items-center justify-between absolute p-6">
      <div>
        <p className="text-white font-bold text-lg">{`${companyName} | ${templateName}`}</p>
      </div>
      <div className="flex items-center">
        <div
          onClick={openEmails}
          className={`${
            showEmails ? "bg-darkGrayLight" : ""
          } flex items-center pt-2 pb-2 pl-12 pr-3 cursor-pointer rounded-md hover:bg-darkGrayLight mr-1`}
        >
          <MailIcon className="h-6 w-6 text-gray-200 mr-1" />
          <p className="font-semibold text-white mr-3">Email</p>
          {emailCount !== 0 ? (
            <div className="h-6 w-6 rounded-full flex justify-center items-center bg-red-500 p-1">
              <p className="text-sm text-white font-bold">{emailCount}</p>
            </div>
          ) : (
            <div className="h-6 w-6"></div>
          )}
        </div>
        <div
          onClick={openTasks}
          className={`${
            showTasks ? "bg-darkGrayLight" : ""
          }  flex items-center pt-2 pb-2 pl-12 pr-3 cursor-pointer rounded-md hover:bg-darkGrayLight mr-1`}
        >
          <ClipboardListIcon className="h-6 w-6 text-gray-200" />
          <p className="font-semibold text-white mr-3">Tasks</p>
          {taskCount !== 0 ? (
            <div className="h-6 w-6 rounded-full flex justify-center items-center bg-blue-500 p-1">
              <p className="text-sm text-white font-bold">{taskCount}</p>
            </div>
          ) : (
            <div className="h-6 w-6"></div>
          )}
        </div>
        <div className={`${finished ? "visible" : "hidden"}`}>
          <CustomButton
            color="green"
            customStyles={`${finished ? "cursor-pointer" : "cursor-not-allowed animate-none"} disabled:opacity:50 `}
            disabled={!finished}
            onClick={onSubmit}
          >
            <p>Submit</p>
          </CustomButton>
        </div>
      </div>
    </nav>
  );
}

export default InterviewHeader;
