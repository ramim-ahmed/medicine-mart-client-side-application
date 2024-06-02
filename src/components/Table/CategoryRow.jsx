import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import PropTypes from "prop-types";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

export default function CategoryRow({ category, idx }) {
  const { name, photo } = category || {};
  return (
    <TableRow>
      <TableCell>{idx + 1}</TableCell>
      <TableCell>
        <div>
          <img src={photo} className="w-10" alt="" />
        </div>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>0</TableCell>
      <TableCell>
        <div className="space-x-3">
          <Button variant="outline" size="icon">
            <TiEdit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RiDeleteBin7Line className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

CategoryRow.propTypes = {
  category: PropTypes.object,
  idx: PropTypes.number,
};
