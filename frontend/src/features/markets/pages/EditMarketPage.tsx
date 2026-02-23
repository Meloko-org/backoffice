import { useParams } from "react-router-dom";
import MarketFormPage from "./MarketFormPage";

export default function EditMarketPage() {

  const { id } = useParams<{ id: string}>();
  
  return <MarketFormPage mode="edit" marketId={id} />
}