import { Link, NavLink } from "react-router-dom";
import logo from "../assets/navLogo.png";
import { RiMenuFoldLine } from "react-icons/ri";
import { RiShoppingBasket2Line } from "react-icons/ri";
import useAuth from "@/hooks/useAuth";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import useCart from "@/hooks/useCart";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Nav() {
  const { authUser } = useAuth();
  const [data, isLoading] = useCart();
  if (isLoading) {
    return <Spinner />;
  }
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
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-themeColor border-b-2 border-themeColor"
                        : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive
                        ? "text-themeColor border-b-2 border-themeColor"
                        : ""
                    }
                  >
                    Shop
                  </NavLink>
                </li>
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
                    <Button variant="outline">Join US</Button>
                  </Link>
                </div>
              )}
              <Link to="/my-cart">
                <div className="relative cursor-pointer">
                  <RiShoppingBasket2Line className="w-7 h-7" />
                  <p className="bg-themeColor rounded-full absolute -right-2 -top-1 text-white font-semibold w-5 h-5 flex items-center justify-center">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <span className="text-sm">
                        {data?.data?.data?.length}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
              <div className="lg:hidden block">
                <Sheet>
                  <SheetTrigger>
                    <RiMenuFoldLine className="h-7 w-7" />
                  </SheetTrigger>
                  <SheetContent className="space-y-3">
                    <div>
                      <Link to="/">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full">
                            Home
                          </Button>
                        </SheetClose>
                      </Link>
                    </div>
                    <div>
                      <Link to="/shop">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full">
                            Shop
                          </Button>
                        </SheetClose>
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
