import prisma from "@/modules/db";
import BottomNav from "./components/BottomNav";
import Header from "./components/home/Header";
import Products from "./components/home/Products";

export default async function page() {
  const response = await prisma.product.findMany();

  return (
    <div className="bg-white overflow-x-hidden">
      <Header />
      <Products products={response} />
      <BottomNav />
    </div>
  );
}
