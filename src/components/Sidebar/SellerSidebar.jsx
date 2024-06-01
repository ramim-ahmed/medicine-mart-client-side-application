import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../../assets/navLogo.png";
import { Button } from "../ui/button";
export default function SellerSidebar() {
  return (
    <div className="lg:border-r border-b">
      <div className="flex p-5 lg:p-0 lg:min-h-screen items-center lg:flex-col flex-row justify-between">
        <div>
          <div className="lg:mt-5 ;g:px-5">
            <Link
              to="/"
              className="text-xl font-bold text-center text-themeColor"
            >
              <img src={logo} className="w-44" alt="" />
            </Link>
          </div>
          <div className="hidden lg:block space-y-4 mt-5 px-5">
            <div>
              <NavLink
                to="/dashboard/seller"
                end
                className={({ isActive }) =>
                  isActive ? "text-themeColor font-bold border-b" : ""
                }
              >
                <p className="font-semibold">Seller Home</p>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="medicines"
                className={({ isActive }) =>
                  isActive ? "text-themeColor font-bold border-b " : ""
                }
              >
                <p className="font-semibold">Medicines</p>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="payment-history"
                className={({ isActive }) =>
                  isActive ? "text-themeColor font-bold border-b" : ""
                }
              >
                <p className="font-semibold">Payment History</p>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="ask-advertisement"
                className={({ isActive }) =>
                  isActive ? "text-themeColor font-bold border-b" : ""
                }
              >
                <p className="font-semibold">Ask Advertisement</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="hidden lg:block px-5 pb-5 space-y-3">
          <Button variant="outline" className="w-full">
            Profile
          </Button>
          <Button variant="outline" className="w-full">
            Logout
          </Button>
        </div>
        <div className="lg:hidden block">
          <Sheet>
            <SheetTrigger>
              <AiOutlineMenuFold className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4">
                <div>
                  <SheetClose asChild>
                    <NavLink
                      to="/dashboard/seller"
                      end
                      className={({ isActive }) =>
                        isActive ? "text-themeColor font-bold border-b" : ""
                      }
                    >
                      <p className="font-semibold">Seller Home</p>
                    </NavLink>
                  </SheetClose>
                </div>
                <div>
                  <SheetClose asChild>
                    <NavLink
                      to="medicines"
                      className={({ isActive }) =>
                        isActive ? "text-themeColor font-bold border-b " : ""
                      }
                    >
                      <p className="font-semibold">Medicines</p>
                    </NavLink>
                  </SheetClose>
                </div>
                <div>
                  <SheetClose asChild>
                    <NavLink
                      to="payment-history"
                      className={({ isActive }) =>
                        isActive ? "text-themeColor font-bold border-b" : ""
                      }
                    >
                      <p className="font-semibold">Payment History</p>
                    </NavLink>
                  </SheetClose>
                </div>
                <div>
                  <SheetClose asChild>
                    <NavLink
                      to="ask-advetisement"
                      className={({ isActive }) =>
                        isActive ? "text-themeColor font-bold border-b" : ""
                      }
                    >
                      <p className="font-semibold">Ask Advertisement</p>
                    </NavLink>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
