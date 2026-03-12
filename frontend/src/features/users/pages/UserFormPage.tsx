import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { UserFormValues } from "../types/user";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { getUserById, updateUser } from "../api/users.api";
import { mapFormValuesToPayload, mapUserToFormValues } from "../mappers/user.mapper";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { userSchema } from "../schema/user.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import { useNavigate } from "react-router-dom";
import type { ApiResponse } from "../../../types/global.types";
import Loader from "../../../components/admin/Loader";

type UserFormPageProps = {
  userId?: string;
  mode: "edit" | "create"
}

export default function UserFormPage({ userId }: UserFormPageProps) {

  const navigate = useNavigate();
  // const { getToken } = useAuth();

  const defaultValues: UserFormValues = {
    firstname: "",
    lastname: "",
    avatar: "",
    suspensionReason: "",
    role: "",
  }

  const [ initialValues, setInitialValues ] = 
    useState<UserFormValues>(defaultValues);

  const [ loading, setLoading ] = useState<boolean>(false);

  useAdminPage("Modifier le user");

  useEffect(() => {
    if (!userId) return;

    const loadUser = async () => {
      setLoading(true);

      try {
        const user = await getUserById(userId);

        setInitialValues(
          mapUserToFormValues(user)
        )
      } finally {
        setLoading(false)
      }
    }

    loadUser();
  }, [userId])


    const handleSubmit = async (
      values: UserFormValues
    ): Promise<ApiResponse<any>> => {

      // const token = await getToken();
      // console.log("le token :", token)

      const payload =
        mapFormValuesToPayload(values);
  
      return updateUser(userId!, payload);
    };


  if (loading) {
    return (
      <Loader />
    );
  }


  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <AdminForm<UserFormValues>
          schema={userSchema}
          initialValues={initialValues}
          mode="edit"
          submitLabel="Mettre à jour"
          onSubmit={handleSubmit}
          onSuccess={() => {
            navigate("/admin/users");
          }}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  )

}