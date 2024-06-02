import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryRow from "./CategoryRow";
import PropTypes from "prop-types";
export default function CategoriesTable({ categories }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Total Items</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, idx) => (
          <CategoryRow key={category._id} category={category} idx={idx} />
        ))}
      </TableBody>
    </Table>
  );
}

CategoriesTable.propTypes = {
  categories: PropTypes.array,
};
