import { useParams } from "react-router-dom";

export default function Invoice() {
  const { orderId } = useParams();
  return (
    <div>
      <h1>Invoice Page: {orderId}</h1>
    </div>
  );
}
