import ListProduct from "@/components/ListProduct";
import db from "@/lib/db";

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}

export default async function Products() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* <h1 className="text-4xl text-white">Products!</h1> */}
      {products.map((product) => (
        <ListProduct {...product} key={product.id} />
      ))}
    </div>
  );
}
