import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { ICandidate, ICandidateDetailsProps } from "../../../types";

import Candidate from "../../../models/Candidate";
import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import protect from "../../../helpers/protect";
import CandidateVideoInterview from "../../../models/CandidateVideoInterview";
import CandidateComment from "../../../models/CandidateComment";
import Template from "../../../models/Template";
import InfoItem from "../../../components/CandidateDetails/InfoItem";
import moment from "moment";
import { CheckIcon, UserIcon, XIcon } from "@heroicons/react/solid";

function CandidateDetails({ candidate, videoInterview, comments, interviews }: ICandidateDetailsProps) {
  console.log(videoInterview, "video");
  console.log(interviews, "template");

  return (
    <Layout header="Candidate Details">
      <div className="grid grid-cols-6 mt-10 ">
        <div className="col-span-4 flex flex-col ">
          <CandidateInfo candidate={candidate} />
          {interviews.map((interview) => (
            <div key={interview._id} className="bg-white rounded-lg shadow-lg mt-4 mr-4 p-3 flex flex-col border border-gray-300 ">
              <div className=" flex justify-between items-center">
                <InfoItem label="Template" value={interview.name} />
                <InfoItem label="Region" value={interview.region !== undefined ? interview?.region : "Unknown"} />
                <InfoItem label="Status" value={interview.completed ? "Completed" : "Pending"} />
                <InfoItem label="Completion Date" value={moment(interview.completedUtc).format("DD/MM/YYYY")} />
              </div>
              <div className="p-1">
                <p className="text-gray-500 font-bold mt-3 uppercase">Tasks</p>
                {interview.tasks.map((task) => (
                  <div key={task._id} className="grid grid-cols-2 items-center justify-center border-b border-gray-300  pt-3 pb-3">
                    <div className="col-span-1 ">
                      <p className="font-semibold pr-3">{task.question}</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center w-full">
                      {task?.choices?.length !== 0 ? (
                        <div className="w-full ">
                          {task?.choices ? (
                            task.choices?.map((choice) => (
                              <div
                                key={choice._id}
                                className="flex justify-between items-center text-sm w-full border rounded-lg mb-2 p-1 border-gray-400"
                              >
                                <div>
                                  <p className={`${choice.isCorrect ? "text-green-600" : "text-red-600"} font-semibold text-left`}>
                                    {choice.value}
                                  </p>
                                </div>
                                <div className="flex justify-center items-center ">
                                  <div className="flex justify-center items-center w-5 h-5">
                                    {task?.answer?.includes(choice.value) ? <UserIcon className="w-5 h-5 text-gray-600" /> : null}
                                  </div>

                                  <div className="flex justify-center items-center  w-6 h-6 ">
                                    {choice.isCorrect ? (
                                      <CheckIcon className="w-6 h-6 text-green-600" />
                                    ) : (
                                      <XIcon className="w-6 h-6 text-red-600" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div>{task.answer}</div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 ">
          <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-300">
            <CandidateTimeline candidate={candidate} videoInterview={videoInterview} comments={comments} interviews={interviews} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CandidateDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protection = await protect(context.req as NextApiRequest, context.res as NextApiResponse);
  if (!protection.status && !protection.payload) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const id = context.params?.id;

  // @ts-ignore
  const [candidate, videoInterview, comments]: [
    ICandidate,
    // @ts-ignore
    ICandidateVideoInterview,
    // @ts-ignore
    ICandidateComment[],
  ] = await Promise.all([
    Candidate.findById(id).select("firstName lastName email favorite interviews").lean(),
    CandidateVideoInterview.findOne({ candidateId: id }).select("answers createdAt").lean(),
    CandidateComment.find({ candidateId: id }).select("comment userId createdAt").populate("userId", "firstName lastName").lean(),
  ]);
  let jobIds = candidate.interviews.map((interview) => interview.jobId);

  const templates = await Template.find({ jobId: { $in: jobIds } }).lean();

  const interviews = templates.map((template) => {
    const interview = candidate.interviews.find((interview) => interview.jobId === template.jobId);

    return {
      name: template.name,
      region: interview?.region,
      countryCode: interview?.countryCode,
      completed: interview?.completed,
      time: interview?.time,
      score: interview?.score,
      completedUtc: interview?.completedUtc.toString(),
      startedUtc: interview?.startedUtc.toString(),
      tasks: template.tasks.map((task) => {
        const answer = interview?.answers.find((answer) => answer.taskId.toString() === task._id.toString());

        if (!answer) {
          return {
            question: task.question,
            taskType: task.taskType,
            answer: "No answer found",
          };
        }

        if (task.choices.length !== 0) {
          return {
            question: task.question,
            taskType: task.taskType,
            answer: task.choices
              //@ts-ignore
              .filter((choice) => answer.choices.includes(choice._id))
              .map((choice) => choice.value),
            choices: task.choices,
          };
        } else {
          return {
            question: task.question,
            taskType: task.taskType,
            answer: answer.answer,
          };
        }
      }),
    };
  });

  return {
    props: {
      candidate: Candidate.toClientObject(candidate),
      videoInterview: CandidateVideoInterview.toClientObject(videoInterview),
      comments: CandidateComment.toClientArray(comments),
      interviews: interviews,
    },
  };
};
