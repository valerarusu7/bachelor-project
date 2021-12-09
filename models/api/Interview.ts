import { mixed, object, array, string, number } from "yup";

export const taskSchema = object({
  answer: mixed().when("isArray", {
    is: Array.isArray,
    then: array().of(number()),
    otherwise: string(),
  }),
});
