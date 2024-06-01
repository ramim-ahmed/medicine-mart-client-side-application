import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
export default function UserProfile() {
  const { authUser, logout } = useAuth();
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
        <DropdownMenuContent className="w-36">
          <Link to="/update-profile">
            <DropdownMenuItem>
              <Button variant="outline" className="w-full">
                Update Profile
              </Button>
            </DropdownMenuItem>
          </Link>
          <Link to="/dashboard">
            <DropdownMenuItem>
              <Button variant="outline" className="w-full">
                Dashboard
              </Button>
            </DropdownMenuItem>
          </Link>
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
