import { lazy, object, array, string, number } from "yup";

export const taskSchema = object({
  answer: lazy((val) => (Array.isArray(val) ? array().of(number()) : string())),
});
