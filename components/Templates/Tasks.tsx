import { Reorder, motion } from "framer-motion";

import Task from "./Task";
import { selectTemplate } from "../../store/reducers/template";
import { useAppSelector } from "../../store/hooks";

export interface ITasks {
  setStateTasks: (newOrder: any[]) => void;
}

function Tasks({ setStateTasks }: ITasks) {
  const { templateTasks } = useAppSelector(selectTemplate);

  return (
    <div>
      {templateTasks.length === 0 ? null : (
        <motion.div
          initial="pre"
          animate="visible"
          exit={{ opacity: 0 }}
          variants={{
            pre: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-md mt-2 border border-gray-300"
        >
          <Reorder.Group axis="y" as="table" values={templateTasks} onReorder={setStateTasks} className="min-w-full">
            <thead className="bg-gray-200 uppercase text-sm rounded-t-lg w-full">
              <tr>
                <th className="py-3 px-6 text-center">Order</th>
                <th className="py-3 px-6 text-left">Question</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Correct answers</th>
                <th className="py-3 px-6 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {templateTasks.map((item, idx) => (
                <Task task={item} key={item.order} idx={idx} />
              ))}
            </tbody>
          </Reorder.Group>
        </motion.div>
      )}
    </div>
  );
}

export default Tasks;
