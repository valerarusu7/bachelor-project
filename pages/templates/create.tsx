import {
  IPosition,
  ITemplate,
  IPositionsProps,
  IAccessTokenPayload,
} from "../../types";
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
import protect from "../../helpers/protect";
import { useRouter } from "next/router";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

function Create({ positions }: IPositionsProps) {
  const dispatch = useAppDispatch();
  const { templateTasks, showModal } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);
  const [selectedPosition, setSelectedPosition] = useState({
    name: "Select position",
    _id: "",
  });
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  const router = useRouter();

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
      jobId: selectedPosition._id,
      tasks: templateTasks,
    };

    fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify(template),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/templates");
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
          templateDescription={templateDescription}
          templateName={templateName}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protection = await protect(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );
  if (!protection.status && !protection.payload) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  
  const jobPositions: IPosition[] = await JobPosition.find({
    companyId: (protection.payload as IAccessTokenPayload).companyId,
  })
    .select("_id name location type recruitingStartDate")
    .lean();

  return {
    props: {
      positions: JobPosition.toClientArray(jobPositions),
    },
  };
};
