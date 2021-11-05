import { selectTemplate, setShow, setTask, setTasks } from "../../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useState } from "react";

import { BsQuestion } from "react-icons/bs";
import CustomButton from "../../common/CustomButton";
import { AnimatePresence, motion } from "framer-motion";

function QuestionTask() {
  const dispatch = useAppDispatch();
  const { templateTask, templateTasks } = useAppSelector(selectTemplate);
  const [question, setQuestion] = useState("");

  function saveTask() {
    let newTask = {
      taskType: "single",
      order: templateTasks.length,
      question: question,
    };
    dispatch(setTasks([...templateTasks, newTask]));
    dispatch(setShow(false));
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="pre"
        animate="visible"
        exit={{ opacity: 0 }}
        variants={{
          pre: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="bg-white rounded-lg pl-4 pr-4 pt-4 pb-2  shadow-lg relative w-full"
      >
        <div className="bg-red-200 w-full flex justify-center items-center">
          <div className="rounded-full bg-gradient-to-tr from-green-500 to-green-400 h-16 w-16 flex justify-center items-center disabled:opacity-50 transition transform duration-400 ease-in-out absolute -top-8 shadow-lg">
            <BsQuestion className="text-white h-10 w-10" />
          </div>
        </div>
        <div className="w-full mt-2 p-2">
          <div>
            <label htmlFor="company-website" className="block text-md font-medium text-gray-700">
              Question
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                className="mt-1 w-full resize-none rounded-lg"
                rows={3}
                placeholder="Enter the question here."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end">
            <CustomButton onClick={() => saveTask()} color="green">
              <p>Save</p>
            </CustomButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionTask;
