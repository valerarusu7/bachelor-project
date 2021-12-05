import {
  IChoiceDocument,
  ITask,
  ITaskDocument,
  ITemplate,
  ITemplateDocument,
  ITemplateModel,
} from "../types";
import { Schema, model, models } from "mongoose";
import "./Company";

const ChoiceSchema = new Schema<IChoiceDocument>({
  _id: {
    type: Number,
    min: 0,
  },
  value: {
    type: String,
    required: [true, "Choice cannot be empty."],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "Choice must be selected as correct or not correct."],
  },
});

const TaskSchema = new Schema<ITaskDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  question: {
    type: String,
    required: [true, "Question cannot be empty."],
    maxLength: [2048, "Question cannot be more than 2048 characters."],
  },
  order: {
    type: Number,
    required: true,
    min: [0, "Order cannot be negative integer"],
  },
  taskType: {
    type: String,
    required: true,
  },
  choices: [ChoiceSchema],
});

const TemplateSchema = new Schema<ITemplateDocument>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: [true, "Name cannot be empty."],
    },
    description: {
      type: String,
      maxLength: [256, "Description cannot be more than 256 characters."],
    },
    tasks: [TaskSchema],
    companyId: {
      type: Schema.Types.ObjectId,
      required: [true, "Company id cannot be empty."],
      ref: "Company",
    },
    jobId: {
      type: String,
      required: [true, "Job id cannot be empty."],
      unique: true,
      ref: "JobPosition",
    },
  },
  {
    timestamps: true,
  }
);

TemplateSchema.statics.toClientObject = function (template: ITemplate) {
  // @ts-ignore
  template._id = template._id.toString();
  if (template.companyId?.constructor === Object) {
    // @ts-ignore
    template.companyId = template.companyId._id.toString();
  } else {
    template.companyId = template.companyId?.toString();
  }

  if (template.createdAt) {
    // @ts-ignore
    template.createdAt = template.createdAt.toISOString();
  }

  (template.tasks as ITask[]).forEach((task) => {
    task._id = task._id?.toString();
  });

  return template;
};

TemplateSchema.statics.toClientArray = function (templates: ITemplate[]) {
  return templates.map((template) => {
    // @ts-ignore
    template._id = template._id.toString();
    // @ts-ignore
    template.createdAt = template.createdAt.toISOString();
    template.companyId = template.companyId?.toString();

    const tasks = template.tasks as ITask[];
    const taskTypes = tasks.map((task: ITask) => task.taskType);
    template["multiple"] = taskTypes.includes("multiple");
    template["email"] = taskTypes.includes("email");
    template["single"] = taskTypes.includes("single");
    template["code"] = taskTypes.includes("code");
    template["tasks"] = taskTypes.length;

    return template;
  });
};

export default (models.Template as ITemplateModel) ||
  model<ITemplateDocument, ITemplateModel>("Template", TemplateSchema);
