import { Eye, Pencil } from "lucide-react";
import type { OrderDetail } from "../types/order";
import { useNavigate } from "react-router-dom";

interface Props {
  order: OrderDetail;
}

export function CustomerSection({ order }: Props) {
  const navigate = useNavigate();
  const { user, billingAddress } = order;

  return (
    <div className="bloc space-y-3">
      <h1 className="">Client</h1>

      <div className="flex flex-row justify-between items-center">
        <p><strong>{user.firstname} {user.lastname}</strong></p>
        <button 
          className="btn-outline-primary"
          onClick={() => navigate(`/admin/users/${order.user._id}`)}
        >
          <Eye />
        </button>
      </div>

      
      <p>{user.email}</p>

      <div className="mt-5 text-sm space-y-1">
        <p>{billingAddress.address1}</p>
        <p>{billingAddress.postalCode} {billingAddress.city}</p>
        <p>{billingAddress.country}</p>
      </div>
    </div>
  );
}
