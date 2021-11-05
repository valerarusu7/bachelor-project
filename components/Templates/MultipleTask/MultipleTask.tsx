import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addChoice, selectTemplate, setShow, setTasks } from "../../../store/reducers/template";
import CustomButton from "../../common/CustomButton";
import EmailChoice from "../Choice";

function MultipleTask() {
  const dispatch = useAppDispatch();
  const { templateChoices, templateTask, templateTasks } = useAppSelector(selectTemplate);
  const [question, setQuestion] = useState("");

  function saveTask() {
    dispatch(
      setTasks([
        ...templateTasks,
        {
          ...templateTask,
          taskType: "multiple",
          question: question,
          choices: templateChoices,
          order: templateTasks.length,
        },
      ]),
    );
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
        <div className="bg-red-200 w-full flex justify-center items-center ">
          <div className="rounded-full bg-gradient-to-tr from-purple-500 to-purple-400 h-16 w-16 flex justify-center items-center disabled:opacity-50 transition transform duration-400 ease-in-out absolute -top-8 shadow-lg">
            <BiSelectMultiple className="text-white h-10 w-10" />
          </div>
        </div>
        <div className="w-full mt-2 p-2">
          <div>
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

            <div className="mt-6 flex items-center">
              <div className="w-1/3">
                <label htmlFor="company-website" className="block text-md font-medium text-gray-700">
                  Choices
                </label>
              </div>
            </div>

            <div className="mt-4">
              {templateChoices.map((choice, idx) => (
                <EmailChoice key={idx} id={idx + 1} />
              ))}
              {templateChoices.length <= 4 ? (
                <div className="mt-2">
                  <CustomButton color="purple" onClick={() => dispatch(addChoice())}>
                    Add choice
                  </CustomButton>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex items-center justify-end">
              <CustomButton color="green" onClick={() => saveTask()}>
                Save
              </CustomButton>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MultipleTask;
