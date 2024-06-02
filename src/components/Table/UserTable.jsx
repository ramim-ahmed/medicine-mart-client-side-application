import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserTableRow from "./UserTableRow";
import PropTypes from "prop-types";
export default function UserTable({ users }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, idx) => (
          <UserTableRow key={user._id} user={user} idx={idx} />
        ))}
      </TableBody>
    </Table>
  );
}

UserTable.propTypes = {
  users: PropTypes.array,
};
