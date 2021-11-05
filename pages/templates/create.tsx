import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";
import { selectTemplate, setShow, setTask, setTasks } from "../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { BsQuestion } from "react-icons/bs";
import { ITask } from "../../types";
import Layout from "../../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import Task from "../../components/Templates/Task";
import TaskType from "../../components/Templates/TaskType";
import { VideoCameraIcon } from "@heroicons/react/solid";

import { useEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import TaskModal from "../../components/Templates/TaskModal";

function Create() {
  const dispatch = useAppDispatch();
  const { templateTasks, templateTask, showModal } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);
  const [type, setType] = useState("");

  useEffect(() => {
    console.log(tasks);
    dispatch(setTasks(tasks));
  }, [tasks]);

  function addEmailTask() {}

  function addSingleTask() {
    setType("single");
    dispatch(setShow(true));
  }

  function addMultipleTask() {
    setType("multiple");
    dispatch(setShow(true));

    // create temporary tasks to fill in the details
    // let newTask = {
    //   taskType: "multiple",
    //   order: templateTasks.length,
    //   question: "",
    // };
    // setTasks([...tasks, newTask]);
    // dispatch(setTask(newTask));
  }

  return (
    <Layout header="Create new template">
      <div className="m-2">
        {templateTasks.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-gray-700 text-xl font-semibold">You don't have any tasks in this template.</p>
          </div>
        ) : (
          <motion.div
            initial="pre"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={{
              pre: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-lg mt-2 border-r-2 border-l-2 border-gray-200"
          >
            <Reorder.Group axis="y" as="table" values={templateTasks} onReorder={setStateTasks} className="min-w-full">
              <thead className="bg-gray-300 text-gray-600 uppercase text-sm rounded-t-lg w-full">
                <tr>
                  <th className="py-3 px-6 text-center">Order</th>
                  <th className="py-3 px-6 text-left">Question</th>
                  <th className="py-3 px-6 text-center">Type</th>
                  <th className="py-3 px-6 text-center">Correct answers</th>
                  <th className="py-3 px-6 text-center">Score</th>
                  <th className="py-3 px-6 text-center">Options</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {templateTasks.map((item, idx) => (
                  <Task task={item} key={item.order} idx={idx} />
                ))}
              </tbody>
            </Reorder.Group>
          </motion.div>
        )}

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
                color="gray"
                disabled={true}
                onClick={() => {
                  return;
                }}
              />
            </div>
          </div>
        </div>
        <TaskModal isOpen={showModal} closeModal={() => dispatch(setShow(false))} type={type} />
      </div>
    </Layout>
  );
}

export default Create;
