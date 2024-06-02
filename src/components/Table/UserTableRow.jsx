import { TableCell, TableRow } from "../ui/table";
import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "../ui/button";
import { LiaEdit } from "react-icons/lia";
import { TiDeleteOutline } from "react-icons/ti";
export default function UserTableRow({ user, idx }) {
  const [roleEditable, setRoleEditable] = useState(false);
  const { photo, name, email, role } = user || {};
  return (
    <TableRow>
      <TableCell>{idx + 1}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <img
            src={photo}
            className="w-12 border border-themeColor h-12 rounded-full object-cover"
            alt=""
          />
          <h2>{name}</h2>
        </div>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {!roleEditable && (
          <div className="flex space-x-2 items-center">
            <p>{role}</p>
            <Button
              onClick={() => setRoleEditable(true)}
              variant="outline"
              size="icon"
            >
              <LiaEdit className="h-4 w-4" />
            </Button>
          </div>
        )}
        {roleEditable && (
          <div className="flex items-center space-x-3">
            <Select defaultValue={role}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="SELLER">SELLER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Change Role</Button>
            <Button
              onClick={() => setRoleEditable(false)}
              variant="outline"
              size="icon"
            >
              <TiDeleteOutline className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
UserTableRow.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
};
