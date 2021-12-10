import { bool, object, string, array, number } from "yup";

export const favoriteSchema = object({
  favorite: bool().required("Favorite cannot be empty."),
});

export const answersSchema = object({
  answers: array()
    .of(
      object({
        order: number().required("Order cannot be empty.").min(0).max(20),
        answer: string().required("Answer cannot be empty."),
      })
    )
    .min(10)
    .required("Answers cannot be empty."),
});
