import { string, number, object, date, array } from "yup";

export const formSchema = object({
  client: object({
    name: string()
      .matches(/\S/, "cannot be empty")
      .required("Client name is required")
      .min(5, "must be at least 5 characters"),
    email: string()
      .matches(/\S/, "cannot be empty")
      .required("Invalid email address")
      .email(),
    street: string()
      .matches(/\S/, "cannot be empty")
      .required("Client street is required")
      .min(4, "must be at least 4 characters"),
    city: string()
      .matches(/\S/, "cannot be empty")
      .required("Client city is required")
      .min(3, "must be at least 3 characters"),
    postCode: string()
      .matches(/\S/, "cannot be empty")
      .required("Client post code is required")
      .min(5, "must be ast least 5 characters"),
    country: string()
      .matches(/\S/, "cannot be empty")
      .required("Client country is required")
      .min(4, "must be at least 4 characters"),
  }),
  sender: object({
    street: string()
      .matches(/\S/, "cannot be empty")
      .required("Sender street is required")
      .min(4, "must be at least 4 characters"),
    city: string()
      .matches(/\S/, "cannot be empty")
      .required("Sender city is required")
      .min(3, "must be at least 3 characters"),
    postCode: string()
      .matches(/\S/, "cannot be empty")
      .required("Sender post code is required")
      .min(6, "must be at least 6 characters"),
    country: string()
      .matches(/\S/, "cannot be empty")
      .required("Sender country is required")
      .min(4, "must be at least 4 characters"),
  }),
  invoice: object({
    description: string()
      .matches(/\S/, "cannot be empty")
      .required("Invoice description is required"),
  }),
  orders: array().of(
    object({
      item: string()
        .matches(/\S/, "cannot be empty")
        .required("Item name is required")
        .min(3, "must have at least 3 characters."),
      quantity: number()
        .integer()
        .required("Item quantity is required")
        .min(1, "must be at least 1"),
      price: number().required("Item price is required").min(1, "must be at least £1"),
    })
  ),
});
