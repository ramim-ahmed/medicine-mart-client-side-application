/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { FiEye } from "react-icons/fi";
import PropTypes from "prop-types";
import { HiDotsVertical } from "react-icons/hi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import MedicineDetails from "../MedicineDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useBaseApi from "@/hooks/useBaseApi";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSecureApi from "@/hooks/useSecureApi";
export default function MedicineTableRow({ item, idx, isSeller }) {
  const navigate = useNavigate();
  const secureApi = useSecureApi();
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { image, name, genericName, massUnit, unitPrice, company, category } =
    item || {};

  const { mutateAsync: addToCart } = useMutation({
    mutationFn: async (data) => {
      const res = await secureApi.post("/carts/create-new", data);
      if (!res.data?.data) {
        toast.error("Already Product Added To Cart!!");
      } else {
        toast.success("Product Added To Cart!!");
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["my-carts"]),
  });

  const handleAddToCart = async ({
    _id,
    id,
    __v,
    company,
    category,
    createdAt,
    updatedAt,
    ...res
  } = product) => {
    if (!authUser) {
      return navigate("/login");
    }
    try {
      const newData = {
        email: authUser?.email,
        productId: _id,
        company: company?._id,
        category: category?._id,
        ...res,
      };
      await addToCart(newData);
    } catch (error) {
      toast.error("Product Add To Cart Failed!!");
    }
  };
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
        {!isSeller ? (
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
            <Button onClick={() => handleAddToCart(item)} variant="outline">
              Select
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="icon">
            <HiDotsVertical className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

MedicineTableRow.propTypes = {
  item: PropTypes.object,
  idx: PropTypes.number,
  isSeller: PropTypes.bool,
};
