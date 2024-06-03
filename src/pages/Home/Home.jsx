import Banner from "@/components/Home/Banner";
import Categories from "@/components/Home/Categories/Categories";
import ProductGrids from "@/components/Home/Products/ProductGrids";
import MetaData from "@/components/MetaData";
import DiscountsProduct from "@/components/DiscountsProduct";
export default function Home() {
  return (
    <>
      <MetaData title="Medicine Mart | Home" />
      <div>
        <Banner />
        <Categories />
        <DiscountsProduct />
        <ProductGrids />
      </div>
    </>
  );
}
