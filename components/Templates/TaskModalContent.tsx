import { addChoice, selectTemplate, setShow, setTasks } from "../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { BiText } from "react-icons/bi";
import EmailChoice from "./Choice";
import { MdEmail } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { BiSelectMultiple } from "react-icons/bi";

import { BsQuestion } from "react-icons/bs";
import CustomButton from "../common/CustomButton";
import { AnimatePresence, motion } from "framer-motion";

function TaskModalContent() {
  const dispatch = useAppDispatch();
  const { templateChoices, templateTasks, templateTaskType } = useAppSelector(selectTemplate);
  const [question, setQuestion] = useState("");
  const [textAnswer, setTextAnswer] = useState(true);
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (templateTaskType) {
      case "single":
        setColor("green");
        break;
      case "multiple":
        setColor("purple");
        break;
      case "email":
        setColor("red");
        break;
      default:
        break;
    }
  }, [templateTaskType]);

  function saveTask() {
    dispatch(
      setTasks([
        ...templateTasks,
        {
          taskType: templateTaskType,
          order: templateTasks.length,
          choices: templateChoices,
          question: question,
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
        <div className="bg-red-200 w-full flex justify-center items-center">
          <div
            className={`rounded-full bg-gradient-to-tr from-${color}-500 to-${color}-400 h-16 w-16 flex justify-center items-center disabled:opacity-50 transition transform duration-400 ease-in-out absolute -top-8 shadow-lg`}
          >
            {templateTaskType === "email" ? (
              <MdEmail className="text-white h-8 w-8" />
            ) : templateTaskType === "single" ? (
              <BsQuestion className="text-white h-10 w-10" />
            ) : templateTaskType === "multiple" ? (
              <BiSelectMultiple className="text-white h-10 w-10" />
            ) : null}
          </div>
        </div>
        <div className="w-full mt-2 p-2">
          <div>
            <label htmlFor="task" className="block text-md font-medium text-gray-700">
              Task
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                className="mt-1 w-full resize-none rounded-lg"
                rows={3}
                placeholder="Enter the task here."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
          </div>

          {templateTaskType === "email" ? (
            <div>
              <div className="mt-6 flex items-center">
                <div className="w-1/3">
                  <label htmlFor="company-website" className="block text-md font-medium text-gray-700">
                    Answer
                  </label>
                </div>

                <div className="flex justify-end items-center w-2/3">
                  <CustomButton disabled={!textAnswer} color={color} onClick={() => setTextAnswer(true)} customStyles="mr-2">
                    <div className="flex">
                      <BiText className="h-6 w-6" />
                      <p>Text answer</p>
                    </div>
                  </CustomButton>
                  <CustomButton disabled={textAnswer} color={color} onClick={() => setTextAnswer(false)}>
                    <div className="flex">
                      <VscTasklist className="h-6 w-6 mr-1" />
                      <p>Choice answer</p>
                    </div>
                  </CustomButton>
                </div>
              </div>
              {!textAnswer ? (
                <div className="mt-4">
                  {templateChoices.map((choice, idx) => (
                    <EmailChoice key={idx} id={idx + 1} />
                  ))}
                  {templateChoices.length <= 4 ? (
                    <div className="mt-2">
                      <CustomButton color={color} onClick={() => dispatch(addChoice())}>
                        Add choice
                      </CustomButton>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : templateTaskType === "multiple" ? (
            <div>
              <div className="mt-4">
                {templateChoices.map((choice, idx) => (
                  <EmailChoice key={idx} id={idx + 1} />
                ))}
                {templateChoices.length <= 4 ? (
                  <div className="mt-2">
                    <CustomButton color={color} onClick={() => dispatch(addChoice())}>
                      Add choice
                    </CustomButton>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

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

export default TaskModalContent;
