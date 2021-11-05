import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import EmailTask from "./EmailTask/EmailTask";
import MultipleTask from "./MultipleTask/MultipleTask";
import QuestionTask from "./QuestionTask/QuestionTask";

export interface ITaskModal {
  closeModal: any;
  isOpen: boolean;
  type: string;
}

function TaskModal({ closeModal, isOpen, type }: ITaskModal) {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {type === "single" ? (
          <QuestionTask />
        ) : type === "multiple" ? (
          <MultipleTask />
        ) : type === "email" ? (
          <EmailTask />
        ) : null}
      </Box>
    </Modal>
  );
}

export default TaskModal;
