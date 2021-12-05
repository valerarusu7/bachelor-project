import { useEffect, useState } from "react";
import { QuestionMarkCircleIcon, DotsCircleHorizontalIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { MailIcon, ClipboardListIcon } from "@heroicons/react/outline";

import { BiSelectMultiple } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

import { BsQuestion } from "react-icons/bs";
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

function Interview({ companyName, template, tasksLength }: IInterviewProps) {
  console.log(companyName);
  console.log(template);
  console.log(tasksLength);
  const [emailCount, setEmailCount] = useState(0);
  const [showTasks, setShowTasks] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const dispatch = useDispatch();
  const { currentTask } = useAppSelector(selectInterview);

  useEffect(() => {
    dispatch(setCurrentTask(template.tasks[0]));
    if (template.tasks[0].taskType === "email") {
      setEmailCount(1);
    }
    if (template.tasks[0].taskType === "single" || template.tasks[0].taskType === "multiple") {
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
  return (
    <div className="h-screen bg-gradient-to-r from-gray-100 to-white">
      <nav className="bg-darkGray shadow w-full h-16 flex items-center justify-between absolute p-6">
        <div>
          <p className="text-white font-bold text-lg">{`${companyName} | ${template.name}`}</p>
        </div>
        <div className="flex items-center">
          <div
            onClick={() => openEmails()}
            className={`${
              showEmails ? "bg-darkGrayLight" : ""
            } flex items-center pt-2 pb-2 pl-12 pr-3 cursor-pointer rounded-md hover:bg-darkGrayLight mr-1`}
          >
            <MailIcon className="h-6 w-6 text-gray-200 mr-1" />
            <p className="font-semibold text-white mr-3">Email</p>
            {emailCount !== 0 ? (
              <div className="h-6 w-6 rounded-full flex justify-center items-center bg-red-500 p-1">
                <p className="text-sm text-white font-bold">{emailCount}</p>
              </div>
            ) : (
              <div className="h-6 w-6"></div>
            )}
          </div>
          <div
            onClick={() => openTasks()}
            className={`${
              showTasks ? "bg-darkGrayLight" : ""
            }  flex items-center pt-2 pb-2 pl-12 pr-3 cursor-pointer rounded-md hover:bg-darkGrayLight`}
          >
            <ClipboardListIcon className="h-6 w-6 text-gray-200" />
            <p className="font-semibold text-white mr-3">Tasks</p>
            {taskCount !== 0 ? (
              <div className="h-6 w-6 rounded-full flex justify-center items-center bg-blue-500 p-1">
                <p className="text-sm text-white font-bold">{taskCount}</p>
              </div>
            ) : (
              <div className="h-6 w-6"></div>
            )}
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-8 gap-6 h-screen">
        <div className="col-span-2 flex flex-col justify-center">
          <div className="bg-white m-10 rounded-md border border-gray-300 flex flex-col justify-center items-center shadow-lg">
            {template.tasks.map((task: any, idx: number) => (
              <div
                key={task._id}
                className={`${idx % 2 ? "bg-gray-50" : "bg-gray-100"} ${
                  !task.completed && task._id === currentTask?._id
                    ? "opacity-100"
                    : !task.completed
                    ? "opacity-30"
                    : task.completed
                    ? "opacity-70"
                    : "opacity-100"
                } flex items-center p-2 justify-evenly w-full border-b border-gray-200 cursor-pointer hover:bg-gray-200`}
              >
                <div>
                  {task.completed ? (
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                  ) : (
                    <QuestionMarkCircleIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{`Task ${idx + 1}`}</p>
                </div>
                <div>
                  {task.completed && task.taskType === TaskTypes.Multiple ? (
                    <div className="rounded-full bg-gradient-to-tr from-purple-700 to-purple-400 h-8 w-8 flex justify-center items-center p-1">
                      <BiSelectMultiple className="h-6 w-6 text-white" />
                    </div>
                  ) : null}
                  {task.completed && task.taskType === TaskTypes.Single ? (
                    <div className="rounded-full bg-gradient-to-tr from-sky-700 to-sky-400 h-8 w-8 flex justify-center items-center">
                      <BsQuestion className="h-6 w-6 text-white" />
                    </div>
                  ) : null}

                  {task.completed && task.taskType === TaskTypes.Email ? (
                    <div className="rounded-full bg-gradient-to-tr from-red-700 to-red-400 h-8 w-8 flex justify-center items-center p-1">
                      <MdEmail className="h-6 w-6 text-white" />
                    </div>
                  ) : null}
                  {!task.completed ? <DotsCircleHorizontalIcon className="h-8 w-8 text-gray-400" /> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        {showTasks ? (
          <div className="col-span-6 bg-gray-50 ml-10 flex flex-col justify-center ">
            <div className="mt-28 mb-28 mr-10 p-10 ">
              <div className="border border-gray-200 bg-white rounded-md p-4 shadow-lg">
                <div>
                  <p className="text-xl font-semibold mb-2">{currentTask?.question}</p>
                  <textarea className="mt-1 w-full resize-none rounded-lg" rows={5} placeholder="Answer here"></textarea>
                  <div className="flex justify-end mt-2">
                    <CustomButton color="blue">
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
      return {
        redirect: {
          permanent: false,
          destination: "/_error",
        },
      };
    }

    let candidate = await Candidate.findOne({
      // @ts-ignore
      "interviews._id": decoded.interviewId,
    })
      .select("interviews")
      .lean();

    if (!candidate) {
      return {
        redirect: {
          permanent: false,
          destination: "/_error",
        },
      };
    }

    var foundInterview = candidate.interviews.find(
      // @ts-ignore
      (interview) => interview._id == decoded.interviewId,
    );

    if (!foundInterview) {
      return {
        redirect: {
          permanent: false,
          destination: "/_error",
        },
      };
    }

    const template: ITemplate = await Template.findOne({
      jobId: foundInterview.jobId,
    })
      .select("_id name description tasks companyId")
      .populate("companyId")
      .lean();

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
        destination: "/_error",
      },
    };
  }
};
