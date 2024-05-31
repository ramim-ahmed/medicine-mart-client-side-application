import { Link } from "react-router-dom";
import logo from "../assets/navLogo.png";
import { RiMenuFoldLine } from "react-icons/ri";
export default function Nav() {
  return (
    <nav className="py-3 border-b">
      <div className="max-w-7xl px-3 mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="flex  items-center space-x-6">
              <li>Home</li>
              <li>Shop</li>
              <li>Cart</li>
              <li>Language</li>
              <li>
                <button className="bg-themeColor text-white rounded-3xl px-5 py-1">
                  Join US
                </button>
              </li>
            </ul>
          </div>
          <div className="lg:hidden block">
            <RiMenuFoldLine className="h-7 w-7" />
          </div>
        </div>
      </div>
    </nav>
  );
}
