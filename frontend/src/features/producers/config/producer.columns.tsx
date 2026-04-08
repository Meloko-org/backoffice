import { DataInlineRowActions } from "../../../components/data-table/DataInlineRowActions";
import type { Column } from "../../../components/data-table/DataTable";
import { renderUserStatus } from "../../users/utils/renderUserStatus";
import type { Producer } from "../types/producer";
import type { ProducerActionContext } from "./producer.action";
import { producerActions } from "./producerActionsRegistry";

export function createProducerColumns(
  ctx: ProducerActionContext,
): Column<Producer>[] {

  return [
    {
      key: "socialReason",
      label: "Raison sociale",
      sortable: true,
    },
    { 
      key: "createdAt", 
      label: "Crée le", 
      sortable: true,
      render: (producer) => 
        new Date(producer.createdAt).toLocaleDateString()
    },
    {
      key: "onboardingStep",
      label: "Onboarding",
      sortable: true,

    },
    { 
      key: "owner.firstname", 
      label: "Nom", 
      sortable: true,
      render: (producer) => (
        `${producer.owner.firstname} ${producer.owner.lastname}`
      ) 
    },
    {
      key: "status",
      label: "User Status",
      sortable: true,
      render: (producer) => (
        <div className="table-status">
          {renderUserStatus(producer.owner)}
        </div>
      )
    },
    { 
      key: "actions",
      label: "",
      render: (producer) => (
        <div className="table-actions">
          <DataInlineRowActions
            actions={producerActions.getActions(producer, ctx, "inline")}
          />
        </div>
      )
    }

  ]
}