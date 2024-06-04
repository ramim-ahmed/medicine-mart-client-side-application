import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MedicineTableRow from "./MedicineTableRow";
import PropTypes from "prop-types";
export default function MedicineListsTable({ medicines, isSeller }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>generic</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((item, idx) => (
            <MedicineTableRow
              key={item._id}
              idx={idx}
              item={item}
              isSeller={isSeller}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

MedicineListsTable.propTypes = {
  medicines: PropTypes.array,
  isSeller: PropTypes.bool,
};
