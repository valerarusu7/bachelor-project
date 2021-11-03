import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";
import { selectTemplate, setShow, setTask } from "../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { BsQuestion } from "react-icons/bs";
import { ITask } from "../../types";
import Layout from "../../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import Task from "../../components/Templates/Task";
import TaskType from "../../components/Templates/TaskType";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { useState } from "react";

function Create() {
  const dispatch = useAppDispatch();
  const { templateTasks, templateTask, showAddTask } = useAppSelector(selectTemplate);
  const [tasks, setTasks] = useState(templateTasks);

  function addEmailTask() {}

  function addSingleTask() {
    dispatch(setShow(false));
    // create temporary tasks to fill in the details
    let newTask = {
      taskType: "single",
      order: templateTasks.length,
      question: "",
    };
    setTasks([...tasks, newTask]);
    dispatch(setTask(newTask));
  }

  function addMultipleTask() {
    dispatch(setShow(false));
    // create temporary tasks to fill in the details
    let newTask = {
      taskType: "multiple",
      order: templateTasks.length,
      question: "",
    };
    setTasks([...tasks, newTask]);
    dispatch(setTask(newTask));
  }

  return (
    <Layout header="Create new template">
      <div className="m-2">
        <div>
          {tasks.map((task: ITask, idx: number) => (
            <Task task={task} key={idx} />
          ))}
        </div>
        {showAddTask ? (
          <div className="flex justify-center mt-8">
            <div className="border-2 border-dashed border-gray-500 h-56 rounded-lg p-2 flex flex-col justify-center  w-full">
              <div className="flex justify-center font-bold text-gray-700 mb-12 text-xl ">Add new task</div>
              <div className="flex justify-evenly items-center ">
                <TaskType
                  Icon={BsQuestion}
                  taskName="Question"
                  color="green"
                  disabled={false}
                  onClick={() => addSingleTask()}
                />
                <TaskType
                  Icon={BiSelectMultiple}
                  taskName="Multiple question"
                  color="purple"
                  disabled={false}
                  onClick={() => addMultipleTask()}
                />
                <TaskType
                  Icon={MdEmail}
                  taskName="Email"
                  color="red"
                  disabled={false}
                  onClick={() => {
                    return null;
                  }}
                />
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
                  color="orange"
                  disabled={true}
                  onClick={() => {
                    return null;
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default Create;
