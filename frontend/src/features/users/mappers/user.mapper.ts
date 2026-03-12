import type { User, UserFormValues, UserPayload } from "../types/user";

export const mapUserToFormValues = (
  user: User
): UserFormValues => {

  return {
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: user.avatar,
    suspensionReason: user.suspensionReason,
    role: user.role._id
  }
}


export const mapFormValuesToPayload = (
  values: UserFormValues
): UserPayload => {

  return {
    firstname: values.firstname,
    lastname: values.lastname,
    avatar: values.avatar,
    suspensionReason: values.suspensionReason,
    role: values.role,
  }
}