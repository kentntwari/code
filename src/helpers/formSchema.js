import { string, number, object, date, array } from "yup";

export const formSchema = object({
  client: object({
    name: string()
      .matches(/\S/, "The client's name cannot be empty or just spaces.")
      .required("Client name is required")
      .min(5),
    email: string()
      .matches(/\S/, "The client's email cannot be empty or just spaces.")
      .required("Invalid email address")
      .email(),
    street: string()
      .matches(/\S/, "The client's street address cannot be empty or just spaces.")
      .required("Client street is required")
      .min(4),
    city: string()
      .matches(/\S/, "The client's city cannot be empty or just spaces.")
      .required("Client city is required")
      .min(3),
    postCode: string()
      .matches(/\S/, "The client's postCode cannot be empty or just spaces.")
      .required("Client post code is required")
      .min(6),
    country: string()
      .matches(/\S/, "The client's country cannot be empty or just spaces.")
      .required("Client country is required")
      .min(4),
  }),
  sender: object({
    street: string()
      .matches(/\S/, "The sender's street address cannot be empty or just spaces.")
      .required("Sender street is required")
      .min(4),
    city: string()
      .matches(/\S/, "The sender's city cannot be empty or just spaces.")
      .required("Sender city is required")
      .min(3),
    postCode: string()
      .matches(/\S/, "The sender's post code cannot be empty or just spaces.")
      .required("Sender post code is required")
      .min(6),
    country: string()
      .matches(/\S/, "The sender's country cannot be empty or just spaces.")
      .required("Sender country is required")
      .min(4),
  }),
  invoice: object({
    description: string()
      .matches(/\S/, "The invoice description cannot be empty or just spaces.")
      .required("Invoice description is required"),
  }),
  orders: array().of(
    object({
      item: string()
        .matches(/\S/, "The item name cannot be empty or just spaces.")
        .required("Item name is required")
        .min(3, "The iteam must have at least 3 characters."),
      quantity: number()
        .integer()
        .required("Item quantity is required")
        .min(1, "The quantity must be at least 1"),
      price: number()
        .required("Item price is required")
        .min(1, "The price must be at least £1"),
    })
  ),
});
