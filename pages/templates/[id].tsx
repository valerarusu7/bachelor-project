import { GetStaticPaths, GetStaticProps } from "next";
import { IPosition, ITaskDocument, ITemplate } from "../../types";
import template, {
  resetTask,
  selectTemplate,
  setEdit,
  setShow,
  setTasks,
} from "../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

import AddTask from "../../components/Templates/AddTask";
import CustomButton from "../../components/common/CustomButton";
import JobPosition from "../../models/JobPosition";
import Layout from "../../components/Layout/Layout";
import { ParsedUrlQuery } from "querystring";
import TaskModal from "../../components/Templates/TaskModal";
import Tasks from "../../components/Templates/Tasks";
import Template from "../../models/Template";
import TemplateDetails from "../../components/Templates/TemplateDetails";
import connectDB from "../../utils/mongodb";

export interface ITemplateProps {
  template: ITemplate;
  positions: IPosition[];
  selectedPosition: IPosition;
}

function TemplatePage({
  template,
  positions,
  selectedPosition,
}: ITemplateProps) {
  const dispatch = useAppDispatch();
  const { templateTasks, showModal } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);
  const [position, setSelectedPosition] = useState(selectedPosition);
  const [templateName, setTemplateName] = useState(template.name);
  const [templateDescription, setTemplateDescription] = useState(
    template.description
  );
  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks]);

  useEffect(() => {
    dispatch(setTasks(template.tasks));
    console.log(template);
  }, []);

  function closeModal() {
    dispatch(resetTask());
    dispatch(setShow(false));
    dispatch(setEdit(false));
  }

  function updateTemplate() {
    console.log({
      ...template,
      name: templateName,
      description: templateDescription,
      jobId: position._id,
      tasks: templateTasks,
    });
  }

  return (
    <Layout header={template.name}>
      <div className="m-2">
        <TemplateDetails
          onChangeName={(e) => setTemplateName(e.target.value)}
          selectPosition={(e: any) => setSelectedPosition(e)}
          positions={positions}
          selectedPosition={position}
          onChangeDescription={(e) => setTemplateDescription(e.target.value)}
          templateDescription={templateDescription}
          templateName={templateName}
        />
      </div>
      <Tasks setStateTasks={setStateTasks} />
      <AddTask />
      <TaskModal isOpen={showModal} closeModal={() => closeModal()} />
      <div className="mt-4 flex justify-end items-center">
        <CustomButton
          color="red"
          onClick={() => console.log("aaa")}
          customStyles="mr-2"
        >
          <p>Delete</p>
        </CustomButton>

        <CustomButton color="green" onClick={() => updateTemplate()}>
          <p>Save</p>
        </CustomButton>
      </div>
    </Layout>
  );
}

export default TemplatePage;

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();

  const templates = await Template.find({}).select("_id").lean();

  const paths = templates.map((template) => {
    return {
      params: { id: template._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  await connectDB();

  const { id } = context.params as IParams; // no longer causes error

  const template = await Template.findById(id)
    .select("_id name description tasks companyId jobId createdAt")
    .lean();

  template._id = template._id.toString();
  template.companyId = template.companyId.toString();
  template.createdAt = template.createdAt.toString();
  template.tasks.map((task: ITaskDocument) => {
    task._id = task._id.toString();
  });

  const jobPositions = await JobPosition.find({})
    .select("_id name location type recruitingStartDate")
    .lean();
  const positionsData = jobPositions.map((position) => {
    position.recruitingStartDate = position.recruitingStartDate.toString();
    if (position.location === undefined) {
      position.location = null;
    }
    return position;
  });

  let selectedPosition = await JobPosition.findById(template.jobId).lean();
  selectedPosition.recruitingStartDate =
    selectedPosition.recruitingStartDate.toString();
  selectedPosition.requestCompletedDate =
    selectedPosition.requestCompletedDate.toString();
  selectedPosition.companyId = selectedPosition.companyId.toString();

  if (selectedPosition.location === undefined) {
    selectedPosition.location = null;
  }

  return {
    props: {
      template: template,
      positions: jobPositions,
      selectedPosition: selectedPosition,
    },
  };
};
