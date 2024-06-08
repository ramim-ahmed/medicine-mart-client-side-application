import img from "../../assets/medicine.jpg";
export default function GetEverthing() {
  return (
    <div className="max-w-7xl mx-auto px-3 pt-16">
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="h-[400px] rounded-2xl bg-center flex justify-center items-center bg-no-repeat bg-cover"
      >
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Enjoy Shop</h1>
          <p className="mt-2 text-xl">
            To Get All Kinds Of Medicine From One Places!
          </p>
        </div>
      </div>
    </div>
  );
}
