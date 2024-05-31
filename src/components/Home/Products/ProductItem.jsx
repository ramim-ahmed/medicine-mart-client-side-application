export default function ProductItem() {
  return (
    <div className="bg-white p-2 border flex items-center space-x-4">
      <div>
        <img
          className="w-36"
          src="https://medex.com.bd/storage/images/packaging/napa-500-mg-tablet-95324450053-i1-jtmMTho0xPmKADM1kMTq.jpg"
          alt=""
        />
      </div>
      <div>
        <h2 className="font-semibold">Napa 500 mg Tablet</h2>
        <p>Paracetamol</p>
        <p>Beximco Pharmaciticals Ltd</p>
        <p>Unit Price: $ 10</p>
        <div className="flex items-center space-x-3 mt-2">
          <div>
            <img
              className="w-8 rounded-full object-cover h-8"
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <h1>Ali Khan</h1>
        </div>
      </div>
    </div>
  );
}
