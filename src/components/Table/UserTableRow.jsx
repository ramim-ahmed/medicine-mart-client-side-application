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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureApi from "@/hooks/useSecureApi";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
export default function UserTableRow({ user, idx }) {
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [roleEditable, setRoleEditable] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const { photo, name, email, role } = user || {};
  const { mutateAsync: changeUserRole } = useMutation({
    mutationFn: async () =>
      await secureApi.patch(`/users/change-role/${email}`, {
        role: selectedRole,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
  const userRoleHanlder = async () => {
    setLoading(true);
    try {
      await changeUserRole();
      toast.success("Role Change Successfully!!");
      setRoleEditable(false);
      setLoading(false);
    } catch (error) {
      toast.error("Role Change Failed!!");
      setRoleEditable(false);
      setLoading(false);
    }
  };
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
            <Select
              defaultValue={role}
              onValueChange={(value) => setSelectedRole(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="SELLER">SELLER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => userRoleHanlder()} variant="outline">
              {loading ? <CgSpinner className="w-4 h-4" /> : "Change Role"}
            </Button>
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
