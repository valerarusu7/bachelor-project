import { Document, Types, Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from "querystring";

import { MouseEventHandler } from "react";

export type IHeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

export enum Roles {
  Manager = "Manager",
  Admin = "Admin",
  Viewer = "Viewer",
}

export enum TaskTypes {
  Multiple = "Multiple",
  Single = "Single",
  Email = "Email",
}

export interface IParams extends ParsedUrlQuery {
  id: string;
}

export type AsyncRequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<any>;

// Pages
export interface IDashboardProps {
  candidates: ICandidate[];
  positions: IPositions[];
  regions: IRegions[];
}

// Objects
export interface ICandidateAnswer {
  _id: string;
  taskId: string;
  answer: string;
}

export interface ICandidateInterview {
  _id: string;
  position: string;
  region: string;
  countryCode: string;
  completed: boolean;
  time: string;
  score: number;
  startedUtc: string;
  completedUtc: string;
  answers: ICandidateAnswer[];
  jobId: string;
}

export interface ICandidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyId: string;
  favorite: boolean;
  interviews: ICandidateInterview[];
}

export interface ICandidateComment {
  _id: string;
  comment: string;
  createdAt: string;
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

export interface IPositionsObject {
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

export interface ICandidateDetailsProps {
  candidate: ICandidate;
  videoInterview: ICandidateVideoInterview;
  comments: ICandidateComment[];
  interviews: ITemplate[];
  idx?: number;
}

export interface ICandidateProps {
  candidate: ICandidate;
  videoInterview?: any;
  comments?: any;
  interviews?: any;
  idx?: number;
}

export interface ICandidateInterviewProps {
  candidateInterview: ICandidateInterview;
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
  company: ICompany;
}

export interface ISettingsProps {
  user: IUser;
  company: ICompany;
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
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
  companyId: string;
}

export interface IRoles {
  id: number;
  role: string;
}

export interface IUsersProps {
  users: IUser[];
}

export interface IUserObject {
  user: IUser;
}

export interface IUserProps {
  user: IUser;
  idx: number;
}

export interface IUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ITemplate {
  _id?: string;
  name: string;
  description: string;
  companyId?: string;
  jobId: string;
  createdAt?: string;
  multiple?: boolean;
  email?: boolean;
  single?: boolean;
  code?: boolean;
  tasks: ITask[];
  tasksLength?: number;
  completed?: boolean;
  completedUtc?: any;
  region?: string | undefined;
}

export interface IInterviewProps {
  companyName: string;
  template: ITemplate;
  tasksLength: number;
}

export interface IRegisterProps {
  email: string;
  companyName: string;
}

export interface ITemplateProps {
  template: ITemplate;
  positions: IPosition[];
  selectedPosition: IPosition;
  candidates: ICandidate[];
}

export interface ITemplatesProps {
  templates: ITemplate[];
}

export interface ITemplateObject {
  template: ITemplate;
}

export interface ITask {
  _id?: string;
  question: string;
  taskType: string;
  order: number;
  choices?: IChoice[];
  templateId?: string;
  answer?: string | string[];
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

export interface ITimelineItem {
  Icon: IHeroIcon;
  helpText?: string;
  position?: string;
  date?: string;
  color?: string;
  comment?: boolean;
  manager?: any;
  time?: string;
  show?: boolean;
  commentText?: string;
}

export interface IChoice {
  _id?: number;
  value: string;
  isCorrect: boolean;
}

export interface IInterviewTokenPayload {
  interviewId: string;
}

export interface IRegistrationTokenPayload {
  email: string;
  companyId: string;
  companyName: string;
}

export interface IAccessTokenPayload {
  id: Types.ObjectId;
  email: string;
  name: string;
  companyId: Types.ObjectId;
  role: string;
}

export interface IRefreshTokenPayload {
  id: Types.ObjectId;
}

export interface IProtection {
  status: boolean;
  payload: IAccessTokenPayload | undefined;
}

export interface ICandidateVideoInterview {
  _id: string;
  answers: ICandidateVideoInterviewAnswer[];
  createdAt: string;
}

export interface ICandidateVideoInterviewAnswer {
  order: number;
  answer: string;
}

//Interfaces for mongoose models

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

export interface IPositionModel extends Model<IPositionDocument> {
  toClientArray(positions: IPosition[]): IPosition[];
}

export interface ITemplateDocument extends Document {
  name: string;
  description: string;
  tasks: ITaskDocument[];
  companyId: Types.ObjectId;
  jobId: string;
}

export interface ITemplateModel extends Model<ITemplateDocument> {
  toClientObject(template: ITemplate): ITemplate;
  toClientArray(templates: ITemplate[]): ITemplate[];
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

export interface ICandidateAnswerDocument extends Document {
  taskId: Types.ObjectId;
  answer: string;
  choices: number[];
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
  answers: ICandidateAnswerDocument[];
  jobId: string;
}

export interface ICandidateDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  companyId: Types.ObjectId;
  favorite: boolean;
  interviews: ICandidateInterviewDocument[];
}

export interface ICandidateModel extends Model<ICandidateDocument> {
  toClientObject(candidate: ICandidate): ICandidate;
  toClientArray(candidates: ICandidate[]): ICandidate[];
}

export interface IUserDocument extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  position: string;
  department: string;
  role: string;
  companyId: Types.ObjectId;
  comparePassword(userPassword: string): Promise<boolean>;
}

export interface ICandidateVideoInterviewAnswerDocument extends Document {
  order: number;
  answer: string;
}

export interface ICandidateVideoInterviewDocument extends Document {
  candidateId: Types.ObjectId;
  answers: ICandidateVideoInterviewAnswerDocument[];
}

export interface ICandidateVideoInterviewModel
  extends Model<ICandidateVideoInterviewDocument> {
  toClientObject(
    candidateVideoInterview: ICandidateVideoInterview
  ): ICandidateVideoInterview;
}

export interface IUserModel extends Model<IUserDocument> {
  toClientObject(user: IUser): IUser;
  toClientArray(users: IUser[]): IUser[];
}

export interface ICandidateCommentDocument extends Document {
  comment: string;
  candidateId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface ICandidateCommentModel
  extends Model<ICandidateCommentDocument> {
  toClientArray(comments: ICandidateComment[]): ICandidateComment[];
}

export interface IUserRequest extends NextApiRequest {
  user: string;
}
