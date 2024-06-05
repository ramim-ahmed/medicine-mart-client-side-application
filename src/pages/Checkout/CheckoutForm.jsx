/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import useSecureApi from "@/hooks/useSecureApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
export default function CheckoutForm({ shippingInfo }) {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const secureApi = useSecureApi();
  const { authUser } = useAuth();
  const [data, , refetch] = useCart();
  const navigate = useNavigate();

  const grandTotal = data?.data?.data?.reduce((total, current) => {
    return total + current.unitPrice * current.quantity;
  }, 0);

  useEffect(() => {
    if (grandTotal > 0) {
      secureApi
        .post("/payments/create-payment-intent", { price: grandTotal })
        .then((res) => {
          console.log(res.data.clientSecret, "client-secret");
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [secureApi, grandTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: authUser?.email || "anonymous",
            name: authUser?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        try {
          // sales
          const ids = data?.data?.data?.map((item) => item.productId);
          const orders = {
            transactionId: paymentIntent?.id,
            user: {
              name: authUser?.displayName,
              email: authUser?.email,
            },
            shippingInfo,
            products: data?.data?.data?.map(
              ({ _id, id, createdAt, updatedAt, __v, ...res }) => {
                return {
                  ...res,
                };
              }
            ),
            grandTotal,
          };

          const orderRes = await secureApi.post("/orders/create-new", orders);
          // now save the payment in the database
          const payment = {
            orderId: orderRes?.data?._id,
            user: {
              name: authUser?.displayName,
              email: authUser?.email,
            },
            price: grandTotal,
            transactionId: paymentIntent.id,
            productIds: data?.data?.data.map((item) => {
              return {
                productId: item.productId,
                quantity: item.quantity,
              };
            }),
          };

          await secureApi.post("/payments/create-new", payment);
          navigate("/invoice-page");
          toast.success("Order Placed Successfully!!");
          refetch();
        } catch (error) {
          toast.error("Orders Placed Failed!!");
          console.log(error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        className="mt-4"
        variant="outline"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </Button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
}

CheckoutForm.propTypes = {
  shippingInfo: PropTypes.object,
};
