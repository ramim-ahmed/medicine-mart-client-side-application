import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { useState } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { authUser } = useAuth();
  const [data] = useCart();
  const grandTotal = data?.data?.data?.reduce((total, current) => {
    return total + current.unitPrice * current.quantity;
  }, 0);
  const shippingInfo = {
    name,
    email,
    phoneNumber,
    address,
  };
  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="bg-white p-10 border">
        <div>
          <div className="flex justify-between items-center">
            <h1>Shipping Info</h1>
            <h1>Total: ${grandTotal}</h1>
          </div>
          <div className="space-y-4 mt-2">
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={authUser?.displayName}
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={authUser?.email}
            />
            <Input
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <Input
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
        </div>
        <div className="mt-4">
          <Elements stripe={stripePromise}>
            <CheckoutForm shippingInfo={shippingInfo}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
}
