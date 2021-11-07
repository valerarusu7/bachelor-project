import { Reorder } from "framer-motion";
import { ITaskTableObject } from "../../types";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { BiSelectMultiple } from "react-icons/bi";
import { BsQuestion } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function Task({ task, idx }: ITaskTableObject) {
  function correctAnswersCount() {
    let correctAnswers = 0;
    task.choices?.map((choice) => {
      if (choice.isCorrect) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  }

  return (
    <Reorder.Item
      key={task._id}
      value={task}
      as="tr"
      className={`${
        idx % 2 ? "bg-white" : "bg-gray-50"
      } border-b border-gray-200 hover:bg-gray-100 cursor-move hover:overflow-hidden`}
    >
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <p className="text-xl font-bold">{idx + 1}</p>
      </td>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">{task.question}</div>
      </td>
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <div className="flex justify-center items-center">
          {task.taskType === "single" ? (
            <div className="rounded-full bg-gradient-to-tr from-green-500 to-green-400 h-8 w-8 flex justify-center items-center transition transform duration-400 ease-in-out shadow-lg">
              <BsQuestion className="text-white h-6 w-6" />
            </div>
          ) : task.taskType === "multiple" ? (
            <div className="rounded-full bg-gradient-to-tr from-purple-500 to-purple-400 h-8 w-8 flex justify-center items-center transition transform duration-400 ease-in-out shadow-lg">
              <BiSelectMultiple className="text-white h-6 w-6" />
            </div>
          ) : task.taskType === "email" ? (
            <div className="rounded-full bg-gradient-to-tr from-red-500 to-red-400 h-8 w-8 flex justify-center items-center transition transform duration-400 ease-in-out shadow-lg">
              <MdEmail className="text-white h-6 w-6" />
            </div>
          ) : null}
        </div>
      </td>
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <div className="flex justify-center items-center">
          <p className="font-semibold">{correctAnswersCount()}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <div className="flex justify-center items-center">
          <p className="font-semibold">{task._id}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <div className="flex justify-center items-center">
          <PencilAltIcon className="h-6 w-6 text-green-500 mr-2 cursor-pointer hover:text-green-400" />
          <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-400" />
        </div>
      </td>
    </Reorder.Item>
  );
}

export default Task;
