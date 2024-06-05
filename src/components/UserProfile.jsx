import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useRole from "@/hooks/useRole";
export default function UserProfile() {
  const { authUser, logout } = useAuth();
  const [role] = useRole();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <img
              className="w-10 h-10 rounded-full object-cover border border-themeColor"
              src={authUser?.photoURL}
              alt=""
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <Link to="/update-profile">
            <DropdownMenuItem>
              <Button variant="outline" className="w-full">
                Update Profile
              </Button>
            </DropdownMenuItem>
          </Link>
          {role === "ADMIN" && (
            <Link to="/dashboard/admin">
              <DropdownMenuItem>
                <Button variant="outline" className="w-full">
                  Admin Dashboard
                </Button>
              </DropdownMenuItem>
            </Link>
          )}
          {role === "SELLER" && (
            <Link to="/dashboard/seller">
              <DropdownMenuItem>
                <Button variant="outline" className="w-full">
                  Seller Dashboard
                </Button>
              </DropdownMenuItem>
            </Link>
          )}
          {role === "USER" && (
            <Link to="/dashboard/user">
              <DropdownMenuItem>
                <Button variant="outline" className="w-full">
                  User Dashboard
                </Button>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem>
            <Button
              onClick={() => logout()}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
