import { NextApiRequest, NextApiResponse } from "next";
import { Document, Types } from "mongoose";
import { string } from "yup";

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
  id: string;
  name: string;
  location: string;
  type: string;
  posted: string;
}

export interface IPositions {
  name: string;
}

export interface IPositionsProps {
  positions: IPosition[];
}

export interface IPositionProps {
  position: {
    id: string;
    name: string;
    location: string;
    type: string;
    posted: string;
  };
}
export interface IRegions {
  name: string;
  code?: string;
}

export interface ICandidateProps {
  candidate: {
    id: number;
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

export type AsyncRequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<any>;

export interface ICompany extends Document {
  name: string;
  website?: string;
}

export interface IJobPosition extends Document {
  name: string;
  openings: number;
  targetHireDate: Date;
  status: string;
  requestCompletedDate: Date;
  profile: string;
  supervisoryOrganization: string;
  recruitingStartDate: Date;
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
