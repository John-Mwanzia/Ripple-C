import BottomNav from "./components/BottomNav";
import Header from "./components/home/Header";
import Products from "./components/home/Products";

export default function page() {
  return (
    <div className="bg-white">
      <Header />
      <Products />

      <BottomNav />
    </div>
  );
}
