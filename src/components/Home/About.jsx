import img from "../../assets/about.png";
import { Button } from "../ui/button";
export default function About() {
  return (
    <div className="max-w-7xl grid lg:grid-cols-2 grid-cols-1 items-center mx-auto px-3 pt-16">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <div className="space-y-3">
          <p>WELCOME TO MEDICINE MART</p>
          <h1 className="text-3xl font-bold">
            We make healthcare Products, Accessible and Affordable Price.
          </h1>
          <p className="text-gray-500">
            Medicine Mart is a dynamic multi-vendor online marketplace designed
            to streamline the purchase and sale of medicines and healthcare
            products. The platform concern individual sellers, and consumers,
            ensuring a seamless and efficient experience for all users.
          </p>
          <Button className="bg-themeColor">KNOW MORE</Button>
        </div>
      </div>
    </div>
  );
}
