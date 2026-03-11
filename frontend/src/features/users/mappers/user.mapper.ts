import type { User, UserFormValues, UserPayload } from "../types/user";

export const mapUserToFormValues = (
  user: User
): UserFormValues => {

  return {
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: user.avatar,
    suspensionReason: user.suspensionReason,
    roles: user.roles._id
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
    roles: values.roles,
  }
}