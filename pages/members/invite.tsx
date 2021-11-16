import { IPosition, ITemplate, IPositionsProps } from "../../types";
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
import MemberData from ".././members/invite";

function Invite() {
  return (
    <Layout header="Invite New Member">
      <div className="m-2">
        <div className="container mx-auto bg-white py-24 px-12 rounded-xl shadow-md">
          <div className="flex flex-col items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-xl text-gray-800">Assemble Team</span>
            <span className="text-gray-600">
              Add members to your reqruiting team
            </span>
            <div className="flex flex-row w-full mt-4">
              <input
                type="text"
                className="rounded-md flex-grow border border-gray-400 focus:border-blue-400 mr-4"
              ></input>
              <CustomButton color="blue">Invite Members</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Invite;
