import Banner from "@/components/Home/Banner";
import Categories from "@/components/Home/Categories/Categories";
import ProductGrids from "@/components/Home/Products/ProductGrids";
import MetaData from "@/components/MetaData";
import DiscountsProduct from "@/components/DiscountsProduct";
import GetEverthing from "@/components/Home/GetEverthing";
import OrderRoad from "@/components/Home/OrderRoad";
import About from "@/components/Home/About";
import NewsLetter from "@/components/Home/NewsLetter";
import Review from "@/components/Home/Review";
export default function Home() {
  return (
    <>
      <MetaData title="Medicine Mart | Home" />
      <div>
        <Banner />
        <OrderRoad />
        <GetEverthing />
        <About />
        <Categories />
        <DiscountsProduct />
        <ProductGrids />
        <Review />
        <NewsLetter />
      </div>
    </>
  );
}
