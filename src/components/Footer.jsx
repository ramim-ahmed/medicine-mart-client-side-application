import logo from "../assets/navLogo.png";
import paymentImg from "../assets/stripe.png";
export default function Footer() {
  return (
    <div>
      <div className="max-w-7xl px-3 mx-auto">
        <div className="grid grid-cols-4 py-10 gap-x-8 justify-between">
          <div>
            <div>
              <img src={logo} alt="" />
              <p className="mt-2 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea
                assumenda magnam, maiores fugit at cumque temporibus
                necessitatibus nemo. Provident.
              </p>
              <div className="mt-2">social Icon</div>
            </div>
          </div>
          <div>
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
          <div>
            <div>
              <h3 className="font-bold">Categories</h3>
              <ul className="mt-3 space-y-4">
                <li>Shipping Options</li>
                <li>My Wishlist</li>
                <li>My Account</li>
                <li>Return Policy</li>
                <li>Shopping FAQs</li>
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
