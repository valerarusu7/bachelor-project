import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { removeTask, setChoices, setEdit, setShow, setTask, setTaskType } from "../../store/reducers/template";

import { BiSelectMultiple } from "react-icons/bi";
import { BsQuestion } from "react-icons/bs";
import { ITaskTableObject, TaskTypes } from "../../types";
import { MdEmail } from "react-icons/md";
import { Reorder } from "framer-motion";
import { useAppDispatch } from "../../store/hooks";

function Task({ task, idx }: ITaskTableObject) {
  const dispatch = useAppDispatch();

  function correctAnswersCount() {
    let correctAnswers = 0;
    task.choices?.map((choice) => {
      if (choice.isCorrect) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  }

  function editTask() {
    console.log(task);
    dispatch(setTaskType(task.taskType));
    dispatch(setTask(task));
    dispatch(setEdit(true));
    dispatch(setShow(true));
  }

  return (
    <Reorder.Item
      key={task._id}
      value={task}
      as="tr"
      className={`${idx % 2 ? "bg-white" : "bg-gray-50"} border-b border-gray-200 hover:bg-gray-100 cursor-move hover:overflow-hidden`}
    >
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <p className="text-xl font-bold">{idx + 1}</p>
      </td>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">{task.question}</div>
      </td>
      <td className="py-3 px-6 text-center whitespace-nowrap">
        <div className="flex justify-center items-center">
          {task.taskType === TaskTypes.Single ? (
            <div className="rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 h-8 w-8 flex justify-center items-center transition transform duration-400 ease-in-out shadow-lg">
              <BsQuestion className="text-white h-6 w-6" />
            </div>
          ) : task.taskType === TaskTypes.Multiple ? (
            <div className="rounded-full bg-gradient-to-tr from-purple-700 to-purple-400 h-8 w-8 flex justify-center items-center transition transform duration-400 ease-in-out shadow-lg">
              <BiSelectMultiple className="text-white h-6 w-6" />
            </div>
          ) : task.taskType === TaskTypes.Email ? (
            <div className="rounded-full bg-gradient-to-tr from-red-700 to-red-400 h-8 w-8 flex justify-center items-center transition transform duration-400 ease-in-out shadow-lg">
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
          <PencilAltIcon className="h-6 w-6 text-green-500 mr-2 cursor-pointer hover:text-green-400" onClick={() => editTask()} />
          <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-400" onClick={() => dispatch(removeTask(task.order))} />
        </div>
      </td>
    </Reorder.Item>
  );
}

export default Task;
