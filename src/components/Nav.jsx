import { Link } from "react-router-dom";
import logo from "../assets/navLogo.png";
import { RiMenuFoldLine } from "react-icons/ri";
import { RiShoppingBasket2Line } from "react-icons/ri";
import useAuth from "@/hooks/useAuth";
import UserProfile from "./UserProfile";

export default function Nav() {
  const { authUser } = useAuth();
  return (
    <nav className="py-3 border-b">
      <div className="max-w-7xl px-3 mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <ul className="flex items-center space-x-6">
                <li>Home</li>
                <li>Shop</li>
                <li>Language</li>
              </ul>
            </div>
            <div className="flex items-center space-x-3">
              {authUser ? (
                <div>
                  <UserProfile />
                </div>
              ) : (
                <div>
                  <Link to="/login">
                    <button className="bg-themeColor text-white rounded-3xl px-5 py-0.5">
                      Join US
                    </button>
                  </Link>
                </div>
              )}
              <div className="relative">
                <RiShoppingBasket2Line className="w-7 h-7" />
                <p className="bg-themeColor rounded-full absolute -right-2 -top-1 text-white font-semibold w-5 h-5 flex items-center justify-center">
                  <span className="text-sm">0</span>
                </p>
              </div>
              <div className="lg:hidden block">
                <RiMenuFoldLine className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
