import * as yup from "yup";

export const RegistrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@stud.noroff\.no$/,
      "Email should be a student account"
    )
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match") // Add validation rule to check if passwords match
    .required("Confirm Password is required"),
  venueManager: yup.boolean().required("Please select an option"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@stud.noroff\.no$/,
      "Email should be a student account"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const bookingSchema = yup.object().shape({
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  guests: yup.number().required("Number of guests is required"),
});

export const venueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  media: yup.string().required("Image is required"),
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Maximum guests is required"),
});

export const updateAvatarSchema = yup.object().shape({
  avatar: yup.string().required("Image is required"),
});

export const ContactSchema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});
