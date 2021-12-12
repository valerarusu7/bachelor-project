import { QuestionMarkCircleIcon, DotsCircleHorizontalIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useAppSelector } from "../../store/hooks";
import { selectInterview } from "../../store/reducers/interviewSlice";
import { ITemplate, TaskTypes } from "../../types";
import { BiSelectMultiple } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

import { BsQuestion } from "react-icons/bs";

interface IInterviewSidebar {
  template: ITemplate;
}
function InterviewSidebar({ template }: IInterviewSidebar) {
  const { currentTask } = useAppSelector(selectInterview);

  return (
    <div className="mt-16 flex flex-col justify-center">
      <div className="h-full w-96 bg-white border border-gray-300 flex flex-col  items-center shadow-lg">
        {template.tasks.map((task: any, idx: number) => (
          <div
            key={task._id}
            className={`${idx % 2 ? "bg-gray-50" : "bg-gray-100"} ${
              !task.completed && task._id === currentTask?._id
                ? "opacity-100"
                : !task.completed
                ? "opacity-30"
                : task.completed
                ? "opacity-70"
                : "opacity-100"
            } flex text-xl items-center p-4 justify-evenly w-full border-b border-gray-200 cursor-pointer hover:bg-gray-200`}
          >
            <div>
              {task.completed ? (
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              ) : (
                <QuestionMarkCircleIcon className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <p className="font-semibold">{`Task ${idx + 1}`}</p>
            </div>
            <div>
              {task.completed && task.taskType === TaskTypes.Multiple ? (
                <div className="rounded-full bg-gradient-to-tr from-purple-700 to-purple-400 h-8 w-8 flex justify-center items-center p-1">
                  <BiSelectMultiple className="h-6 w-6 text-white" />
                </div>
              ) : null}
              {task.completed && task.taskType === TaskTypes.Single ? (
                <div className="rounded-full bg-gradient-to-tr from-sky-700 to-sky-400 h-8 w-8 flex justify-center items-center">
                  <BsQuestion className="h-6 w-6 text-white" />
                </div>
              ) : null}

              {task.completed && task.taskType === TaskTypes.Email ? (
                <div className="rounded-full bg-gradient-to-tr from-red-700 to-red-400 h-8 w-8 flex justify-center items-center p-1">
                  <MdEmail className="h-6 w-6 text-white" />
                </div>
              ) : null}
              {!task.completed ? <DotsCircleHorizontalIcon className="h-8 w-8 text-gray-400" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewSidebar;
