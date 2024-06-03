import { useState } from "react";
import { Switch } from "../ui/switch";
import { TableCell, TableRow } from "../ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureApi from "@/hooks/useSecureApi";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
export default function BannerTableRow({ item, idx }) {
  const [loading, setLoading] = useState(false);
  const { _id, seller, name, image, genericName, company, status } = item || {};
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const { mutateAsync: changeAdvertiseStatus } = useMutation({
    mutationFn: async (status) =>
      await secureApi.patch(`advertisements/change-status/${_id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries(["advertisements"]),
  });
  const handleStatusChange = async (status) => {
    setLoading(true);
    try {
      await changeAdvertiseStatus(status);
      toast.success("Advertisement added Home Slider");
      setLoading(false);
    } catch (error) {
      toast.error("Advertisement added Home Failed");
      setLoading(false);
    }
  };
  return (
    <TableRow>
      <TableCell>{idx + 1}</TableCell>
      <TableCell>
        <div>
          <img className="w-16" src={image} alt="" />
        </div>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{genericName}</TableCell>
      <TableCell>{company?.name}</TableCell>
      <TableCell>{seller?.email}</TableCell>
      <TableCell>{status ? "Added" : "Requested"}</TableCell>
      <TableCell>
        <Switch
          checked={status}
          onCheckedChange={(value) => handleStatusChange(value)}
        />
      </TableCell>
    </TableRow>
  );
}

BannerTableRow.propTypes = {
  item: PropTypes.object,
  idx: PropTypes.number,
};
