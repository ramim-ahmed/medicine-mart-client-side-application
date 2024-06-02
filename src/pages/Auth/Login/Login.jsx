import LoginForm from "@/components/Form/LoginForm";
import MetaData from "@/components/MetaData";

export default function Login() {
  return (
    <>
      <MetaData title="Medicine Mart | Login" />
      <div className="flex justify-center h-screen items-center">
        <div className="max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
