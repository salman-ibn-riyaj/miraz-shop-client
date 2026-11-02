import ProductEditor from "@/components/admin/ProductEditor";

export default async function EditAdminProductPage({ params }) {
  const { category, id } = await params;
  return <ProductEditor category={category} productId={id} />;
}