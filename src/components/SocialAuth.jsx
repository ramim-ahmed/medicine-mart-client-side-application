import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
export default function SocialAuth() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      navigate(location?.state ? location?.state : "/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleGoogleAuth}
        className="border border-baseColor w-full text-primary font-medium py-1 px-4 rounded-3xl mt-2 flex justify-between items-center dark:bg-dark-color"
      >
        <FcGoogle className="h-6 w-6" />
        <p>Google</p>
      </button>
    </div>
  );
}
