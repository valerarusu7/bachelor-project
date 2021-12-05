import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";
import { setShow, setTaskType } from "../../store/reducers/template";

import { BsQuestion } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import TaskType from "./TaskType";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../store/hooks";
import { TaskTypes } from "../../types";

function AddTask() {
  const dispatch = useAppDispatch();

  function addTask(type: string) {
    dispatch(setTaskType(type));
    dispatch(setShow(true));
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="border-2 border-dashed border-gray-500 h-56 rounded-lg p-2 flex flex-col justify-center  w-full">
        <div className="flex justify-center font-bold text-gray-700 mb-12 text-xl ">
          Add new task
        </div>
        <div className="flex justify-evenly items-center ">
          <TaskType
            Icon={BsQuestion}
            taskName="Question"
            color="sky"
            disabled={false}
            onClick={() => addTask(TaskTypes.Single)}
          />
          <TaskType
            Icon={BiSelectMultiple}
            taskName="Multiple question"
            color="purple"
            disabled={false}
            onClick={() => addTask(TaskTypes.Multiple)}
          />
          <TaskType
            Icon={MdEmail}
            taskName="Email"
            color="red"
            disabled={false}
            onClick={() => addTask(TaskTypes.Email)}
          />
          <TaskType
            Icon={BiCodeAlt}
            taskName="Coding"
            color="yellow"
            disabled={true}
            onClick={() => {
              return null;
            }}
          />
          <TaskType
            Icon={VideoCameraIcon}
            taskName="Video question"
            color="orange"
            disabled={true}
            onClick={() => {
              return;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddTask;
