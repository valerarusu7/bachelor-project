import { GetStaticPaths, GetStaticProps } from "next";
import { IPosition, ITemplate, ITemplateProps, IParams } from "../../types";
import {
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
import TaskModal from "../../components/Templates/TaskModal";
import Tasks from "../../components/Templates/Tasks";
import Template from "../../models/Template";
import TemplateDetails from "../../components/Templates/TemplateDetails";
import connectDB from "../../utils/mongodb";

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
  }, []);

  function closeModal() {
    dispatch(resetTask());
    dispatch(setShow(false));
    dispatch(setEdit(false));
  }

  function updateTemplate() {
    fetch(`/api/templates/${template._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...template,
        name: templateName,
        description: templateDescription,
        jobId: position._id,
        tasks: templateTasks,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function deleteTemplate() {
    fetch(`/api/templates/${template._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
          onClick={() => deleteTemplate()}
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

export const getStaticProps: GetStaticProps = async (context) => {
  await connectDB();

  const { id } = context.params as IParams;

  // @ts-ignore
  const [template, jobPositions]: [ITemplate, IPosition[]] = await Promise.all([
    Template.findById(id)
      .select("_id name description tasks companyId jobId createdAt")
      .lean(),
    JobPosition.find({})
      .select("_id name location type recruitingStartDate")
      .lean(),
  ]);

  const selectedPosition = jobPositions.find(
    (jobPosition) => jobPosition._id === template.jobId
  );

  return {
    props: {
      template: Template.toClientObject(template),
      positions: JobPosition.toClient(jobPositions),
      selectedPosition: selectedPosition,
    },
    revalidate: 5,
  };
};
