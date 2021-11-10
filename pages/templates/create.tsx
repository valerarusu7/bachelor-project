import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";
import { IPosition, ITemplate } from "../../types";
import {
  selectTemplate,
  setShow,
  setTaskType,
  setTasks,
} from "../../store/reducers/template";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

import { BsQuestion } from "react-icons/bs";
import CustomButton from "../../components/common/CustomButton";
import JobPosition from "../../models/JobPosition";
import Layout from "../../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import SelectionFilter from "../../components/Dashboard/SelectionFilter";
import TaskModal from "../../components/Templates/TaskModal";
import TaskType from "../../components/Templates/TaskType";
import Tasks from "../../components/Templates/Tasks";
import { VideoCameraIcon } from "@heroicons/react/solid";
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

  function addTask(type: string) {
    dispatch(setTaskType(type));
    dispatch(setShow(true));
  }

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

  return (
    <Layout header="Create new template">
      <div className="m-2">
        <div className="grid grid-cols-2 gap-4 items-center mb-2">
          <div className="col-span-1">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Template name
            </label>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Link to a position
            </label>

            <SelectionFilter
              data={positions}
              selected={selectedPosition}
              setSelected={(e: any) => setSelectedPosition(e)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="company-website"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            className="rounded-md w-1/2"
            name="template-description"
            id="template-description"
            rows={5}
            onChange={(e) => setTemplateDescription(e.target.value)}
          ></textarea>
        </div>
        <Tasks setStateTasks={setStateTasks} />
        <div className="flex justify-center mt-8">
          <div className="border-2 border-dashed border-gray-500 h-56 rounded-lg p-2 flex flex-col justify-center  w-full">
            <div className="flex justify-center font-bold text-gray-700 mb-12 text-xl ">
              Add new task
            </div>
            <div className="flex justify-evenly items-center ">
              <TaskType
                Icon={BsQuestion}
                taskName="Question"
                color="sky"
                disabled={false}
                onClick={() => addTask("single")}
              />
              <TaskType
                Icon={BiSelectMultiple}
                taskName="Multiple question"
                color="purple"
                disabled={false}
                onClick={() => addTask("multiple")}
              />
              <TaskType
                Icon={MdEmail}
                taskName="Email"
                color="red"
                disabled={false}
                onClick={() => addTask("email")}
              />
              <TaskType
                Icon={BiCodeAlt}
                taskName="Coding"
                color="yellow"
                disabled={true}
                onClick={() => {
                  return null;
                }}
              />
              <TaskType
                Icon={VideoCameraIcon}
                taskName="Video question"
                color="orange"
                disabled={true}
                onClick={() => {
                  return;
                }}
              />
            </div>
          </div>
        </div>
        <TaskModal
          isOpen={showModal}
          closeModal={() => dispatch(setShow(false))}
        />
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
