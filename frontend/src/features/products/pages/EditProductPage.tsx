import { useParams } from "react-router-dom";
import ProductFormPage from "./ProductFormPage";

export default function EditProductPage() {

  const { id } = useParams<{ id: string}>();

  return <ProductFormPage mode="edit" productId={id}/>
}