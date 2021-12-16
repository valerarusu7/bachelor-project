import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import {
  IPosition,
  ITemplate,
  ITemplateProps,
  IParams,
  ICandidate,
  IAccessTokenPayload,
} from "../../types";
import {
  resetTask,
  selectTemplate,
  setEdit,
  setInvitedCandidates,
  setSearch,
  setShow,
  setShowInvite,
  setShowDelete,
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
import InviteCandidate from "../../components/Templates/InviteCandidate";
import Candidate from "../../models/Candidate";
import { useRouter } from "next/router";
import protect from "../../helpers/protect";
import DeleteConfirmation from "../../components/common/DeleteConfirmation";

function TemplatePage({
  template,
  positions,
  selectedPosition,
  candidates,
}: ITemplateProps) {
  const dispatch = useAppDispatch();
  const {
    templateTasks,
    showModal,
    invitedCandidates,
    showInviteModal,
    showDeleteModal,
  } = useAppSelector(selectTemplate);
  const [tasks, setStateTasks] = useState(templateTasks);
  const [position, setSelectedPosition] = useState(selectedPosition);
  const [templateName, setTemplateName] = useState(template.name);
  const [templateDescription, setTemplateDescription] = useState(
    template.description
  );

  const router = useRouter();

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

  function closeInviteModal() {
    dispatch(setShowInvite(false));
    dispatch(setSearch(""));
    dispatch(setInvitedCandidates([]));
  }

  function closeDeleteModal() {
    dispatch(setShowDelete(false));
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
        if (response.ok) {
          router.push("/templates");
        } else {
          return response.json().then((text) => {
            throw new Error(text.error[0]);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function deleteTemplate() {
    fetch(`/api/templates/${template._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          router.push("/templates");
        } else {
          return response.json().then((text) => {
            throw new Error(text.error);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function invite() {
    let emails: string[] = [];
    invitedCandidates.map((candidate) => {
      emails.push(candidate.email);
    });

    fetch(`/api/templates/emails/${template._id}`, {
      method: "POST",
      body: JSON.stringify({ emails: emails }),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(setShowInvite(false));
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
  {
    console.log(templateTasks);
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
      <InviteCandidate
        isOpen={showInviteModal}
        onClose={() => closeInviteModal()}
        candidates={candidates}
        inviteCandidates={() => invite()}
      />
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => closeDeleteModal()}
        deleteItem={() => deleteTemplate()}
        question="Do you really want to delete this template?"
      />
      <TaskModal isOpen={showModal} closeModal={() => closeModal()} />
      <div className="mt-4 space-x-2 flex justify-end items-center">
        <CustomButton color="red" onClick={() => dispatch(setShowDelete(true))}>
          <p>Delete</p>
        </CustomButton>
        <CustomButton
          color="blue"
          onClick={() => dispatch(setShowInvite(true))}
        >
          <p>Invite candidates</p>
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

  const { id } = context.params as IParams;

  // @ts-ignore
  const [template, jobPositions]: [ITemplate, IPosition[]] = await Promise.all([
    Template.findById(id)
      .select("_id name description tasks companyId jobId createdAt")
      .lean(),
    JobPosition.find({
      companyId: (protection.payload as IAccessTokenPayload).companyId,
    })
      .select("_id name location type recruitingStartDate")
      .lean(),
  ]);

  // @ts-ignore
  const candidates: ICandidate[] = await Candidate.find({
    companyId: (protection.payload as IAccessTokenPayload).companyId,
    interviews: { $elemMatch: { jobId: template.jobId, completed: false } },
  })
    .select("firstName lastName email")
    .lean();

  console.log(candidates);

  const selectedPosition = jobPositions.find(
    (jobPosition) => jobPosition._id === template.jobId
  );

  return {
    props: {
      template: Template.toClientObject(template),
      positions: JobPosition.toClientArray(jobPositions),
      selectedPosition: selectedPosition,
      candidates: Candidate.toClientArray(candidates),
    },
  };
};
