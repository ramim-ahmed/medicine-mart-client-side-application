import RegisterForm from "@/components/Form/RegisterForm";
import MetaData from "@/components/MetaData";

export default function Register() {
  return (
    <>
      <MetaData title="Medicine Mart | Register" />
      <div className="flex justify-center">
        <div className="m-10 max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
