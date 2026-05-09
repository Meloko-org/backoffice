import type { OrderDetail } from "../types/order";
import { type UserCardData } from "../../../types/admin";
import Usercard from "../../../components/admin/cards/UserCard";
import Loader from "../../../components/admin/Loader";

interface Props {
  order: OrderDetail;
}

export function CustomerSection({ order }: Props) {
  const { user, billingAddress } = order;

  if (!order.user) {
    return <Loader />
  }  

  const userCard: UserCardData = {
    id: user._id,
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    avatar: user.avatar || "",
    type: "user",
  }


  return (
    <div className="bloc">

      <h1 className="">Client</h1>

      <Usercard user={userCard} />
      
      <div className="text-sm space-y-1">
        <p>{billingAddress.address1}</p>
        <p>{billingAddress.postalCode} {billingAddress.city}</p>
        <p>{billingAddress.country}</p>
      </div>

    </div>
  );
}
