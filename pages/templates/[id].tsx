import { GetServerSideProps } from "next";
import {
  IPosition,
  ITemplate,
  ITemplateDocument,
  ITemplateProps,
  IParams,
} from "../../types";
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

function TemplatePage({
  template,
  positions,
  selectedPosition,
}: ITemplateProps) {
  const templateData: ITemplate = JSON.parse(template);
  const positionsData: IPosition[] = JSON.parse(positions);
  const selectedPositionData: IPosition = JSON.parse(selectedPosition);

  const dispatch = useAppDispatch();
  const { templateTasks, showModal } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);
  const [position, setSelectedPosition] = useState(selectedPositionData);
  const [templateName, setTemplateName] = useState(templateData.name);
  const [templateDescription, setTemplateDescription] = useState(
    templateData.description
  );
  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks]);

  useEffect(() => {
    dispatch(setTasks(templateData.tasks));
  }, []);

  function closeModal() {
    dispatch(resetTask());
    dispatch(setShow(false));
    dispatch(setEdit(false));
  }

  function updateTemplate() {
    fetch(`/api/templates/${templateData._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...templateData,
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
    fetch(`/api/templates/${templateData._id}`, {
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
    <Layout header={templateData.name}>
      <div className="m-2">
        <TemplateDetails
          onChangeName={(e) => setTemplateName(e.target.value)}
          selectPosition={(e: any) => setSelectedPosition(e)}
          positions={positionsData}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();

  const { id } = context.params as IParams;

  const template: ITemplateDocument = await Template.findById(id).select(
    "_id name description tasks companyId jobId createdAt"
  );

  const jobPositions: IPosition[] = await JobPosition.find({})
    .select("_id name location type recruitingStartDate")
    .lean();

  const selectedPosition: IPosition = await JobPosition.findById(
    template.jobId
  ).lean();

  return {
    props: {
      template: JSON.stringify(template),
      positions: JSON.stringify(jobPositions),
      selectedPosition: JSON.stringify(selectedPosition),
    },
  };
};
