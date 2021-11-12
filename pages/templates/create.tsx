import { IPosition, ITemplate } from "../../types";
import {
  resetTask,
  resetTemplateState,
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
import TemplateDetails from "../../components/Templates/TemplateDetails";
import connectDB from "../../utils/mongodb";

export interface ICreateTemplate {
  positions: IPosition[];
}
function Create({ positions }: ICreateTemplate) {
  const dispatch = useAppDispatch();
  const { templateTasks, showModal } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);
  const [selectedPosition, setSelectedPosition] = useState({
    name: "Select position",
    _id: "",
  });
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks]);

  useEffect(() => {
    dispatch(resetTemplateState());
  }, []);

  function createTemplate() {
    let template: ITemplate = {
      name: templateName,
      description: templateDescription,
      companyId: "6182887f8a051eb01be80084",
      jobId: selectedPosition._id,
      tasks: templateTasks,
    };
    console.log(template);
    fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify(template),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function closeModal() {
    dispatch(resetTask());
    dispatch(setShow(false));
    dispatch(setEdit(false));
  }

  return (
    <Layout header="Create new template">
      <div className="m-2">
        <TemplateDetails
          onChangeName={(e) => setTemplateName(e.target.value)}
          selectPosition={(e: any) => setSelectedPosition(e)}
          positions={positions}
          selectedPosition={selectedPosition}
          onChangeDescription={(e) => setTemplateDescription(e.target.value)}
        />

        <Tasks setStateTasks={setStateTasks} />
        <AddTask />
        <TaskModal isOpen={showModal} closeModal={() => closeModal()} />
        <div className="mt-4 flex justify-end items-center">
          <CustomButton color="blue" onClick={() => createTemplate()}>
            <p>Create template</p>
          </CustomButton>
        </div>
      </div>
    </Layout>
  );
}

export default Create;

export const getServerSideProps = async () => {
  connectDB();
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
  return {
    props: {
      positions: positionsData,
    },
  };
};
