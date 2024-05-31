import Banner from "@/components/Home/Banner";
import Categories from "@/components/Home/Categories/Categories";
import ProductGrids from "@/components/Home/Products/ProductGrids";

export default function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <ProductGrids />
    </div>
  );
}
