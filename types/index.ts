import { NextApiRequest, NextApiResponse } from "next";
import { Document, Types } from "mongoose";
import { MouseEventHandler } from "react";

export type IHeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

// Pages
export interface IDashboardProps {
  candidates: ICandidates[];
  positions: IPositions[];
  regions: IRegions[];
}

// Objects
export interface ICandidates {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  region: string;
  countryCode: string;
  completed: boolean;
  score: number;
  time: string;
  favorite: boolean;
}

export interface IPosition {
  _id: string;
  name: string;
  location: string;
  type: string;
  recruitingStartDate: string;
}

export interface IPositions {
  name: string;
}

export interface IPositionsProps {
  positions: IPosition[];
}

export interface IPositionProps {
  position: {
    _id: string;
    name: string;
    location: string;
    type: string;
    recruitingStartDate: string;
  };
}
export interface IRegions {
  name: string;
  code?: string;
}

export interface ICandidateProps {
  candidate: {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    region: string;
    countryCode: string;
    completed: boolean;
    time: string;
    score: number;
    favorite: boolean;
  };
}

export interface ICompanySettingsProps {
  company: {
    name?: string;
    website?: string;
  };
}

export interface ISettingsProps {
  settings: {
    user: IUser;
    company: ICompanySettingsProps;
  };
}

export interface ICompanyFormValues {
  name: string;
}

export interface IPasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUser {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    birthday?: string;
  };
}

export interface IUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

export interface ITemplate {
  _id?: string;
  name: string;
  description: string;
  companyId: string;
  jobId: string;
  tasks: Array<ITask>;
  createdAt?: string;
  multiple?: boolean;
  mail?: boolean;
  single?: boolean;
  code?: boolean;
  tasksLength?: number;
}

export interface ITask {
  _id?: string;
  question: string;
  taskType: string;
  order: number;
  choices?: IChoice[];
}

export interface IChoice {
  _id?: string;
  value: string;
  isCorrect: boolean;
}

export interface ITemplateObject {
  template: {
    _id: number;
    name: string;
    description: string;
    createdAt: string;
    multiple: boolean;
    mail: boolean;
    single: boolean;
    code: boolean;
    tasks: number;
  };
}

export interface ITemplatesProps {
  templates: ITemplate[];
}

export interface ITimelineItem {
  Icon: IHeroIcon;
  helpText?: string;
  position?: string;
  date?: string;
  color?: string;
  comment?: boolean;
  candidate?: ICandidates;
  time?: string;
  show?: boolean;
}

export interface ITaskType {
  Icon: IHeroIcon;
  taskName: string;
  color: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export interface ITask {
  _id?: string;
  question: string;
  taskType: string;
  order: number;
  choices?: IChoice[];
  templateId?: string;
}

export interface ITaskObject {
  task: {
    _id?: string;
    question: string;
    taskType: string;
    order: number;
    choices?: IChoice[];
    templateId?: string;
  };
}

export interface IChoice {
  _id?: string;
  value: string;
  isCorrect: boolean;
}

export type AsyncRequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<any>;

export interface ICompanyDocument extends Document {
  name: string;
  website?: string;
}

export interface IPositionDocument extends Document {
  name: string;
  openings: number;
  targetHireDate: Date;
  status: string;
  requestCompletedDate: Date;
  location: string;
  profile: string;
  supervisoryOrganization: string;
  recruitingStartDate: Date;
  companyId: Types.ObjectId;
}

export interface ITemplateDocument extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  companyId: Types.ObjectId;
  jobId: string;
}

export interface ITaskDocument extends Document {
  question: string;
  taskType: string;
  order: number;
  correctChoice: string;
  choices: Array<IChoice>;
  templateId: Types.ObjectId;
}

export interface IChoiceDocument extends Document {
  value: string;
  isCorrect: boolean;
}
