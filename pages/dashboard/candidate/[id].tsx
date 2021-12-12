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

function CandidateDetails({ candidate, videoInterview, comments, interviews }: ICandidateDetailsProps) {
  console.log(interviews);
  return (
    <Layout header="Candidate Details">
      <div className="grid grid-cols-6 mt-10 ">
        <div className="col-span-4 flex flex-col ">
          <CandidateInfo candidate={candidate} />
          {interviews.map((interview) => (
            <div className="bg-white rounded-lg shadow-lg mt-4 mr-4 p-3 flex flex-col border border-gray-300 ">
              <div className=" flex justify-between items-center">
                <InfoItem label="Template" value={interview.name} />
                <InfoItem label="Region" value={interview.region} />
                <InfoItem label="Status" value={interview.completed ? "Completed" : "Pending"} />
                <InfoItem label="Completion Date" value={moment(interview.completedUtc).format("DD/MM/YYYY")} />
              </div>
              <div>
                <p>Tasks</p>
                {interview.tasks.map((task) => (
                  <div>
                    <p>{task.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-2 h-auto border border-gray-300">
          <CandidateTimeline candidate={candidate} />
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
