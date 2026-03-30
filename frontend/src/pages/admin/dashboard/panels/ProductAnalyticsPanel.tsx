import { useAdminInfo, type WithId } from "../../../../layouts/admin/contexts/AdminInfoContext"

type Props = {
  context: WithId<"productAnalytics">
}

export default function ProductAnalyticsPanel({ context }: Props) {

  const { setInfoContext } = useAdminInfo();

  console.log("context analytics:", context)

  const handleBack = () => {
    setInfoContext({
      id: context.meta.stockId,
      type: "topProduct",
      title: context.meta.stockName,
      level:1,
      direction: "back"
    });
  };

  return (
    <div className="h-full flex flex-col justify-center mt-5">




      <div className="flex items-center justify-between p-4">
        <button
          onClick={handleBack}
          className="btn-outline-primary"
        >
          ← Retour
        </button>
      </div>
    </div>
  )
}