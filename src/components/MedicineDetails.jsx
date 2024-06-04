import PropTypes from "prop-types";
import { Button } from "./ui/button";
export default function MedicineDetails({ item }) {
  const {
    image,
    name,
    description,
    genericName,
    massUnit,
    unitPrice,
    company,
    category,
  } = item || {};
  return (
    <div className="bg-gray-50">
      <div className="flex space-x-8 p-2">
        <div className="">
          <img className="w-96" src={image} alt="" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl">
            {name} {massUnit}{" "}
            <span className="text-sm text-gray-500">{category?.name}</span>
          </h1>
          <p>{genericName}</p>
          <p>{company?.name}</p>
          <p>Unit Price : ${unitPrice}</p>
          <div>
            <Button className="w-32" variant="outline">
              Select
            </Button>
          </div>
        </div>
      </div>
      <div className="mt3 bg-white p-2">
        <h3 className="font-semibold text-lg">Description</h3>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
}

MedicineDetails.propTypes = {
  item: PropTypes.object,
};
