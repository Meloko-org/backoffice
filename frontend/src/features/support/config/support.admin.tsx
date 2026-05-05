import { createModelAdmin } from "../../../layouts/admin/registries/admin/createModelAdmin";
import { getTicketsList, simulateTicket } from "../api/support.api";
import { createSupportColumns } from "./support.columns";
import { createSupportFilters } from "./support.filters";

const USERIDS_TEST = [
  "66b5bb74535fa09834dc3bd1",
  "673b3596c9fb3996cb58ebf3",
  "6747619b353bf7adcbca5b75",
  "674ed0b7dff4df94302254b6",
  "67efa009e2ac321b5eb5813c",
]

export const supportAdmin = createModelAdmin({
  model: "support",

  getList: getTicketsList,

  columns: createSupportColumns,
  filters: createSupportFilters,
  toolbar: {
    actions: () => (
      <button
        onClick={async () => {
          for (let i = 0; i < 5; i++) {
            await simulateTicket({
              userId: USERIDS_TEST[i], 
            })
          }
          window.location.reload()
        }}
        className="btn-success"
      >
        + Ticket test
      </button>
    )
  },
  entityName: "support",

  // ❌ volontairement vide
  actions: undefined,
  details: undefined,
  form: undefined,



})
