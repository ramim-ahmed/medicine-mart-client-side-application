import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { FiEye } from "react-icons/fi";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import MedicineDetails from "../MedicineDetails";
export default function MedicineTableRow({ item, idx, seller }) {
  const [open, setOpen] = useState(false);
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
        {!seller ? (
          <div className="flex items-center space-x-3">
            <Dialog open={open}>
              <DialogTrigger onClick={() => setOpen(true)}>
                <Button variant="outline" type="button" size="icon">
                  <FiEye className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <MedicineDetails item={item} />
                <div className="flex justify-end">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    type="button"
                    size="icon"
                  >
                    <TiDeleteOutline className="h-6 w-6" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Select</Button>
          </div>
        ) : null}
      </TableCell>
    </TableRow>
  );
}

MedicineTableRow.propTypes = {
  item: PropTypes.object,
  idx: PropTypes.number,
  seller: PropTypes.bool,
};
