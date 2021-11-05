import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";
import { selectTemplate, setShow, setTasks, setTaskType } from "../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { BsQuestion } from "react-icons/bs";
import Layout from "../../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import TaskType from "../../components/Templates/TaskType";
import { VideoCameraIcon } from "@heroicons/react/solid";

import { useEffect, useState } from "react";
import TaskModal from "../../components/Templates/TaskModal";
import Tasks from "../../components/Templates/Tasks";

function Create() {
  const dispatch = useAppDispatch();
  const { templateTasks, showModal } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks]);

  function addTask(type: string) {
    dispatch(setTaskType(type));
    dispatch(setShow(true));
  }

  return (
    <Layout header="Create new template">
      <div className="m-2">
        <Tasks setStateTasks={setStateTasks} />

        <div className="flex justify-center mt-8">
          <div className="border-2 border-dashed border-gray-500 h-56 rounded-lg p-2 flex flex-col justify-center  w-full">
            <div className="flex justify-center font-bold text-gray-700 mb-12 text-xl ">Add new task</div>
            <div className="flex justify-evenly items-center ">
              <TaskType Icon={BsQuestion} taskName="Question" color="green" disabled={false} onClick={() => addTask("single")} />
              <TaskType
                Icon={BiSelectMultiple}
                taskName="Multiple question"
                color="purple"
                disabled={false}
                onClick={() => addTask("multiple")}
              />
              <TaskType Icon={MdEmail} taskName="Email" color="red" disabled={false} onClick={() => addTask("email")} />
              <TaskType
                Icon={BiCodeAlt}
                taskName="Coding"
                color="blue"
                disabled={true}
                onClick={() => {
                  return null;
                }}
              />
              <TaskType
                Icon={VideoCameraIcon}
                taskName="Video question"
                color="blue"
                disabled={true}
                onClick={() => {
                  return;
                }}
              />
            </div>
          </div>
        </div>
        <TaskModal isOpen={showModal} closeModal={() => dispatch(setShow(false))} />
      </div>
    </Layout>
  );
}

export default Create;
