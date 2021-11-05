import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import TaskModalContent from "./TaskModalContent";

export interface ITaskModal {
  closeModal: any;
  isOpen: boolean;
}

function TaskModal({ closeModal, isOpen }: ITaskModal) {
  return (
    <Modal open={isOpen} onClose={closeModal} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TaskModalContent />
      </Box>
    </Modal>
  );
}

export default TaskModal;
