import { motion, Reorder } from "framer-motion";
import { useAppSelector } from "../../store/hooks";
import { selectTemplate } from "../../store/reducers/template";
import Task from "./Task";

export interface ITasks {
  setStateTasks: (newOrder: any[]) => void;
}

function Tasks({ setStateTasks }: ITasks) {
  const { templateTasks } = useAppSelector(selectTemplate);

  return (
    <div>
      {templateTasks.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-700 text-xl font-semibold">You don't have any tasks in this template.</p>
        </div>
      ) : (
        <motion.div
          initial="pre"
          animate="visible"
          exit={{ opacity: 0 }}
          variants={{
            pre: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-lg mt-2 border-r-2 border-l-2 border-gray-200"
        >
          <Reorder.Group axis="y" as="table" values={templateTasks} onReorder={setStateTasks} className="min-w-full">
            <thead className="bg-gray-300 text-gray-600 uppercase text-sm rounded-t-lg w-full">
              <tr>
                <th className="py-3 px-6 text-center">Order</th>
                <th className="py-3 px-6 text-left">Question</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Correct answers</th>
                <th className="py-3 px-6 text-center">Score</th>
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
