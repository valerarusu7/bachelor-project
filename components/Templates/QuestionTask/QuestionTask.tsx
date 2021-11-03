import { selectTemplate, setShow, setTasks } from "../../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";

import { BsQuestion } from "react-icons/bs";

function QuestionTask() {
  const dispatch = useAppDispatch();
  const { templateTask, templateTasks } = useAppSelector(selectTemplate);
  const [question, setQuestion] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (templateTask.id === undefined) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, []);

  function saveTask() {
    let newTask = {
      ...templateTask,
      question: question,
      order: templateTasks.length + 1,
    };
    dispatch(setTasks([...templateTasks, newTask]));
    setEdit(false);
    dispatch(setShow(true));
  }

  return (
    <div className="bg-white mt-10 rounded-lg  p-4 shadow-lg relative">
      <div className="bg-red-200 w-full flex justify-center items-center">
        <div className="rounded-full bg-gradient-to-tr from-green-500 to-green-400 h-12 w-12 flex justify-center items-center disabled:opacity-50 transition transform duration-400 ease-in-out absolute -top-4 shadow-lg">
          <BsQuestion className="text-white h-8 w-8" />
        </div>
      </div>
      <div className="w-full mt-8 p-2">
        {edit ? (
          <div>
            <label htmlFor="company-website" className="block text-md font-medium text-gray-700">
              Question
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                className="mt-1 w-full resize-none"
                rows={3}
                placeholder="Enter the question here."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-gray-700 text-xl">{`Question: ${question}`}</p>
          </div>
        )}
        {edit ? (
          <div className="mt-8 flex items-center justify-end">
            <button
              className="bg-green-500 text-white font-semibold pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg hover:opacity-80"
              onClick={() => saveTask()}
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default QuestionTask;
