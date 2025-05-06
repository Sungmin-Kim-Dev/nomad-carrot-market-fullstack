async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function ProductDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct()
  return <div>Product Details {id}</div>;
}
