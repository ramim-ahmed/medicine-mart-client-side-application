/* eslint-disable react/prop-types */
export default function OrderItem({ num, title, description }) {
  return (
    <div className="flex space-x-3">
      <div className="bg-themeColor h-16 w-16 flex justify-center items-center p-5 rounded-full">
        <p className="text-xl font-bold text-white">{num}</p>
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
