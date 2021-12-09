import {
  IChoiceDocument,
  ITask,
  ITaskDocument,
  ITemplate,
  ITemplateDocument,
  ITemplateModel,
  TaskTypes,
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
    required: [true, "Choice value cannot be empty."],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "Choice must be selected as correct or not correct."],
  },
});

const TaskSchema = new Schema<ITaskDocument>({
  question: {
    type: String,
    required: [true, "Task question cannot be empty."],
    maxLength: [2048, "Task question cannot be more than 2048 characters."],
  },
  order: {
    type: Number,
    required: [true, "Task order cannot be empty."],
    min: [0, "Task order cannot be negative."],
  },
  taskType: {
    type: String,
    enum: Object.values(TaskTypes),
    required: [true, "Task type cannot be empty."],
  },
  choices: [ChoiceSchema],
});

const TemplateSchema = new Schema<ITemplateDocument>(
  {
    name: {
      type: String,
      required: [true, "Template name cannot be empty."],
      maxLength: [256, "Template name cannot be more than 256 characters."],
    },
    description: {
      type: String,
      maxLength: [
        256,
        "Template description cannot be more than 256 characters.",
      ],
    },
    tasks: {
      type: [TaskSchema],
      required: [true, "Tasks cannot be empty."],
      validate: {
        validator: function (arr: ITask[]) {
          return arr.length > 0;
        },
        message: "Template needs to have at least 1 task.",
      },
    },
    companyId: {
      type: Schema.Types.ObjectId,
      required: [true, "Company id cannot be empty for the template."],
      ref: "Company",
    },
    jobId: {
      type: String,
      required: [true, "Job id cannot be empty for the template."],
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
    template.multiple = taskTypes.includes(TaskTypes.Multiple);
    template.email = taskTypes.includes(TaskTypes.Email);
    template.single = taskTypes.includes(TaskTypes.Single);
    template.tasksLength = taskTypes.length;
    //@ts-ignore
    delete template.tasks;

    return template;
  });
};

export default (models.Template as ITemplateModel) ||
  model<ITemplateDocument, ITemplateModel>("Template", TemplateSchema);
