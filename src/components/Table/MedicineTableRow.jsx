import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { FiEye } from "react-icons/fi";
import PropTypes from "prop-types";
export default function MedicineTableRow({ item, idx }) {
  const { image, name, genericName, massUnit, unitPrice, company, category } =
    item || {};
  return (
    <TableRow>
      <TableCell>{idx + 1}</TableCell>
      <TableCell>
        <div>
          <img className="w-16 h-16 object-cover" src={image} alt="" />
        </div>
      </TableCell>
      <TableCell>
        {name} {massUnit}
      </TableCell>
      <TableCell>{genericName}</TableCell>
      <TableCell>{company?.name}</TableCell>
      <TableCell>{category?.name}</TableCell>
      <TableCell>$ {unitPrice}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Button variant="outline" type="button" size="icon">
            <FiEye className="h-6 w-6" />
          </Button>
          <Button variant="outline">Select</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

MedicineTableRow.propTypes = {
  item: PropTypes.object,
  idx: PropTypes.number,
};
