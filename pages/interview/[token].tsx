import { useEffect, useState } from "react";
import { PlusIcon, UserIcon } from "@heroicons/react/solid";

import CustomButton from "../../components/common/CustomButton";
import connectDB from "../../utils/mongodb";
import jwt from "jsonwebtoken";
import Candidate from "../../models/Candidate";
import Template from "../../models/Template";
import { ITemplate, IInterviewProps, ITask, TaskTypes } from "../../types";
import { GetServerSidePropsContext } from "next";
import { selectInterview, setCurrentTask } from "../../store/reducers/interviewSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import InterviewHeader from "../../components/Interview/InterviewHeader";
import InterviewSidebar from "../../components/Interview/InterviewSidebar";

function Interview({ companyName, template, tasksLength }: IInterviewProps) {
  // console.log(template, "template");
  const [emailCount, setEmailCount] = useState(0);
  const [showTasks, setShowTasks] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [answer, setAnswer] = useState<any>();
  const dispatch = useDispatch();
  const { currentTask } = useAppSelector(selectInterview);
  const router = useRouter();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [choices, setChoices] = useState<any>([]);
  const [finished, setFinished] = useState(false);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    dispatch(setCurrentTask(template.tasks[0]));
    if (template.tasks[0].taskType === "Email") {
      setEmailCount(1);
    }
    if (template.tasks[0].taskType === "Single" || template.tasks[0].taskType === "Multiple") {
      setTaskCount(1);
    }
  }, []);

  function openTasks() {
    setShowEmails(false);
    setShowTasks(true);
  }

  function openEmails() {
    setShowTasks(false);
    setShowEmails(true);
  }

  function addOrDeleteChoice(newItem: any) {
    let newChoices = [...choices];
    let contains = newChoices.includes(newItem);
    if (!contains) {
      newChoices.push(newItem);
    }
    if (contains) {
      newChoices = arrayRemove(newChoices, newItem);
    }
    setChoices(newChoices);
  }

  function arrayRemove(arr: any, value: any) {
    return arr.filter(function (ele: any) {
      return ele != value;
    });
  }

  async function getNextTask() {
    let body;
    if (currentTask?.choices?.length === 0) {
      body = { answer: answer };
    }
    if (currentTask?.choices?.length !== 0) {
      body = { answer: choices };
    }
    setChoices([]);
    console.log(body);
    console.log(`${currentTask?.order}`);
    try {
      const response = await fetch(`/api/interview/task?order=${currentTask?.order}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          Authorization: `Bearer ${router.query.token}`,
        }),
      });
      const data = await response.json();
      console.log(data, "next task");
      dispatch(setCurrentTask(data));
      setShowEmails(false);
      setShowTasks(false);
      if (data.taskType === TaskTypes.Email) {
        setEmailCount(1);
        setTaskCount(0);
      }
      if (data.taskType === TaskTypes.Single || data.taskType === TaskTypes.Multiple) {
        setEmailCount(0);
        setTaskCount(1);
      }
      if (data.finished) {
        setEmailCount(0);
        setTaskCount(0);

        setFinished(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function startInterview() {
    fetch(`/api/interview/start`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${router.query.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          setInterviewStarted(true);
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        //Handle error
        console.log(error);
      });
  }

  function onSubmit() {
    fetch(`/api/interview/complete`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${router.query.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          if (response.ok) {
            setCompleted(true);
          }
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        //Handle error
        console.log(error);
      });
  }

  return (
    <>
      {completed ? (
        <div>Completed</div>
      ) : (
        <>
          {interviewStarted ? (
            <div
              className={`${
                interviewStarted ? "opacity-100" : "opacity-0"
              } h-screen bg-gradient-to-r from-gray-100 to-white transition transform duration-1000`}
            >
              <InterviewHeader
                companyName={companyName}
                templateName={template.name}
                openEmails={() => openEmails()}
                openTasks={() => openTasks()}
                emailCount={emailCount}
                taskCount={taskCount}
                showEmails={showEmails}
                showTasks={showTasks}
                finished={finished}
                onSubmit={() => onSubmit()}
              />
              <div className="flex h-screen">
                <InterviewSidebar template={template} />
                {showTasks ? (
                  <div className="w-full bg-gray-100 flex flex-col justify-center ">
                    <div className="mr-10 ml-10 p-10 ">
                      <div className="border border-gray-300 bg-white rounded-md p-4 shadow-lg">
                        <div>
                          <p className="text-xl font-semibold mb-2">{currentTask?.question}</p>
                          <textarea
                            className="mt-1 w-full resize-none rounded-lg"
                            rows={5}
                            placeholder="Answer here"
                            onChange={(e) => setAnswer(e.target.value)}
                          ></textarea>
                          <div className="flex justify-end mt-2">
                            <CustomButton color="blue" onClick={() => getNextTask()}>
                              <p>Next</p>
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {showEmails ? (
                  <div className="w-full bg-gray-100 flex flex-col justify-center ">
                    <div className="mr-10 ml-10 p-10 ">
                      <div className="border border-gray-300 bg-white rounded-md p-4 shadow-lg">
                        <div>
                          <p className="text-xl font-semibold mb-2">{currentTask?.question}</p>
                          {currentTask !== undefined && currentTask?.choices?.length !== 0 ? (
                            <div className="flex justify-evenly items-center">
                              {currentTask?.choices?.map((choice) => (
                                <CustomButton
                                  color="blue"
                                  key={choice._id}
                                  customStyles={`${choices.includes(choice?._id) ? "opacity-100" : "opacity-50"}`}
                                  onClick={() => addOrDeleteChoice(choice?._id)}
                                >
                                  {choice.value}
                                </CustomButton>
                              ))}
                            </div>
                          ) : (
                            <textarea
                              className="mt-1 w-full resize-none rounded-lg"
                              rows={5}
                              placeholder="Answer here"
                              onChange={(e) => setAnswer(e.target.value)}
                            ></textarea>
                          )}
                          <div className="flex justify-end mt-2">
                            <CustomButton color="blue" onClick={() => getNextTask()}>
                              <p>Next</p>
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => startInterview()}>Start Interview</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Interview;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  await connectDB();
  const { INTERVIEW_PRIVATE_KEY } = process.env;

  // @ts-ignore
  const { token } = context.params;

  try {
    const decoded = jwt.verify(token, INTERVIEW_PRIVATE_KEY as string);
    // @ts-ignore
    if (!decoded.interviewId) {
      return new Error("No interview id.");
    }

    let candidate = await Candidate.findOne({
      // @ts-ignore
      "interviews._id": decoded.interviewId,
    })
      .select("interviews")
      .lean()
      .orFail();

    var interview = candidate.interviews.find(
      // @ts-ignore
      (interview) => interview._id == decoded.interviewId,
    );

    // @ts-ignore
    const template: ITemplate = await Template.findOne({
      jobId: interview?.jobId,
    })
      .select("_id name description tasks companyId")
      .populate("companyId")
      .lean()
      .orFail();

    const tasksLength = (template.tasks as ITask[]).length;

    // @ts-ignore
    const company = template.companyId.name;

    return {
      props: {
        companyName: company,
        template: Template.toClientObject(template),
        tasksLength: tasksLength,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/interview_error",
      },
    };
  }
};
