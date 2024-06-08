import logo from "../assets/navLogo.png";
import paymentImg from "../assets/stripe.png";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
export default function Footer() {
  return (
    <div>
      <div className="max-w-7xl px-3 mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 py-10 gap-x-8 justify-between">
          <div className="flex justify-center">
            <div>
              <img src={logo} alt="" />
              <p className="mt-2 text-gray-500">
                Medicine Mart is a dynamic multi-vendor online marketplace
                designed to streamline the purchase and sale of medicines and
                healthcare products. The platform concern individual sellers,
                and consumers, ensuring a seamless and efficient experience for
                all users.
              </p>
              <div className="mt-4">
                <div className="flex space-x-5">
                  <FaFacebook className="w-6 h-6 text-themeColor" />
                  <FaSquareTwitter className="w-6 h-6 text-themeColor" />
                  <FaLinkedin className="w-6 h-6 text-themeColor" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <div>
              <h3 className="font-bold">Useful Links</h3>
              <ul className="mt-3 space-y-4">
                <li>Shipping Options</li>
                <li>My Wishlist</li>
                <li>My Account</li>
                <li>Return Policy</li>
                <li>Shopping FAQs</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <div>
              <h3 className="font-bold">Categories</h3>
              <ul className="mt-3 space-y-4">
                <li>Tablet</li>
                <li>Capsule</li>
                <li>Syrup</li>
                <li>Inhaler</li>
                <li>Cream</li>
              </ul>
            </div>
          </div>
          <div>
            {" "}
            <div>
              <img src={paymentImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center bg-white py-4">
        <p>
          Copyright {new Date().getFullYear()}{" "}
          <span className="text-themeColor">Medicine Mart</span>. All Rights
          Reserved
        </p>
      </div>
    </div>
  );
}
