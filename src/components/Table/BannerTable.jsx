import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BannerTableRow from "./BannerTableRow";
import PropTypes from "prop-types";
export default function BannerTable({ items }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Generic</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <BannerTableRow key={item._id} item={item} idx={idx} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

BannerTable.propTypes = {
  items: PropTypes.array,
};
