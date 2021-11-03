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
  id: number;
  name: string;
  description: string;
  created: string;
  multiple: boolean;
  mail: boolean;
  single: boolean;
  code: boolean;
  tasks: number;
}

export interface ITemplateObject {
  template: {
    id: number;
    name: string;
    description: string;
    created: string;
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
