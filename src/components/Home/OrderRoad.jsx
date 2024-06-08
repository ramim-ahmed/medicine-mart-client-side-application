import OrderItem from "./OrderItem";

export default function OrderRoad() {
  return (
    <div className="pt-16 px-3 max-w-7xl mx-auto">
      <div className="py-16 rounded-2xl grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4 px-3 border">
        <OrderItem
          num="1"
          title="Your Order"
          description="Add products to your cart, enter your details and confirm."
        />
        <OrderItem
          num="2"
          title="Your Order"
          description="Pay your total orders amount that's give order place confirmation."
        />
        <OrderItem
          num="3"
          title="Picking your order"
          description="Your order is being picked and now will be forwarded for packaging."
        />
        <OrderItem
          num="4"
          title="Packing Your Order"
          description="We are packing your order and will be out for delivery soon."
        />
        <OrderItem
          num="5"
          title="Deliver"
          description="Your order has been prepared and out for delivery. It will be delivered soon."
        />
      </div>
    </div>
  );
}
