import { Document, Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import { MouseEventHandler } from "react";

export type IHeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

// Pages
export interface IDashboardProps {
  candidates: ICandidate[];
  positions: IPositions[];
  regions: IRegions[];
}

// Objects
export interface ICandidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  region: string;
  countryCode: string;
  completed: boolean;
  score: number;
  time: string;
  startedUtc: string;
  completedUtc: string;
  favorite: boolean;
  companyId: string;
  jobId: string;
}

export interface IPosition {
  _id: string;
  name: string;
  openings: number;
  targetHireDate: string;
  status: string;
  requestCompletedDate: string;
  location: string;
  profile: string;
  isLinked: boolean;
  supervisoryOrganization: string;
  recruitingStartDate: string;
  companyId: string;
  type: any;
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
  idx: number;
}
export interface IRegions {
  name: string;
  code?: string;
}

export interface ICandidateProps {
  candidate: ICandidate;
  idx?: number;
}

export interface ICandidatesProps {
  candidates: ICandidate[];
}

export interface ICompany {
  _id?: string;
  name: string;
  website?: string;
}

export interface ICompanySettingsProps {
  company: {
    _id?: string;
    name: string;
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
  createdAt?: string;
  multiple?: boolean;
  mail?: boolean;
  single?: boolean;
  code?: boolean;
  tasks?: ITask[];
}

export interface ITask {
  _id?: string;
  question: string;
  taskType: string;
  order: number;
  choices?: IChoice[];
  templateId?: string;
}

export interface IChoice {
  _id?: number;
  value: string;
  isCorrect: boolean;
}

export interface ITemplateObject {
  template: {
    _id?: string;
    name: string;
    description: string;
    createdAt?: string;
    multiple?: boolean;
    email?: boolean;
    single?: boolean;
    code?: boolean;
    tasks?: ITask[] | number;
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
  candidate?: ICandidate;
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

export interface ITaskObject {
  task: ITask;
}

export interface ITaskTableObject {
  task: ITask;
  idx: number;
}
export interface IChoice {
  _id?: number;
  value: string;
  isCorrect: boolean;
}

export type AsyncRequestHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

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
  isLinked: boolean;
  supervisoryOrganization: string;
  recruitingStartDate: Date;
  companyId: Types.ObjectId;
}

export interface ITemplateDocument extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  tasks: ITaskDocument[];
  companyId: Types.ObjectId;
  jobId: string;
}

export interface ITaskDocument extends Document {
  question: string;
  taskType: string;
  order: number;
  correctChoice: string;
  choices: IChoiceDocument[];
}

export interface IChoiceDocument extends Document {
  value: string;
  isCorrect: boolean;
}

export interface ICandidateInterviewDocument extends Document {
  position: string;
  region: string;
  countryCode: string;
  completed: boolean;
  time: string;
  score: number;
  startedUtc: Date;
  completedUtc: Date;
  jobId: string;
}

export interface ICandidateDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  favorite: boolean;
  companyId: Types.ObjectId;
  jobId: string;
  interviews: ICandidateInterviewDocument[];
}

export interface IUserDocument extends Document {
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  isAdmin: boolean;
}
