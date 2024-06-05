import MetaData from "@/components/MetaData";
import useCart from "@/hooks/useCart";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { GrDocumentMissing } from "react-icons/gr";
import { Link } from "react-router-dom";
import { PiPlusCircleBold } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureApi from "@/hooks/useSecureApi";
import toast from "react-hot-toast";
export default function Cart() {
  const [data, isLoading] = useCart();
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCartItem } = useMutation({
    mutationFn: async (productId) =>
      await secureApi.delete(`/carts/cart-item/${productId}`),
    onSuccess: () => queryClient.invalidateQueries(["my-carts"]),
  });

  const { mutateAsync: incrementQuantity } = useMutation({
    mutationFn: async (productId) =>
      await secureApi.patch(`/carts/increment/${productId}`),
    onSuccess: () => queryClient.invalidateQueries(["my-carts"]),
  });

  const { mutateAsync: decrementQuantity } = useMutation({
    mutationFn: async (productId) =>
      await secureApi.patch(`/carts/decrement/${productId}`),
    onSuccess: () => queryClient.invalidateQueries(["my-carts"]),
  });

  const handleDeleteCartItem = async (productId) => {
    try {
      await deleteCartItem(productId);
      toast.success("Product Deleted From Cart!!");
    } catch (error) {
      toast.error("Product Deleted From Cart!!");
    }
  };

  const handleIncrementQuantity = async (productId) => {
    await incrementQuantity(productId);
  };
  const handleDecrementQuantity = async (productId) => {
    await decrementQuantity(productId);
  };

  const grandTotal = data?.data?.data?.reduce((total, current) => {
    return total + current.unitPrice * current.quantity;
  }, 0);

  return (
    <>
      <MetaData title="Medicine Mart | My Cart" />
      <div className="max-w-4xl py-10 mx-auto px-3">
        <div>
          <div className="flex justify-between">
            <Button variant="outline">My Shopping Cart</Button>
            <Button variant="outline">Clear Cart</Button>
          </div>
          <div className="mt-3 bg-white">
            {isLoading ? (
              <div>
                <Spinner />
              </div>
            ) : data?.data?.data?.length > 0 ? (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.data?.map(
                      (
                        { _id, name, productId, company, unitPrice, quantity },
                        idx
                      ) => (
                        <TableRow key={_id}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{company?.name}</TableCell>
                          <TableCell>${unitPrice}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                onClick={() =>
                                  handleDecrementQuantity(productId)
                                }
                                variant="outline"
                                size="icon"
                              >
                                <HiOutlineMinusCircle className="h-4 w-4" />
                              </Button>
                              <p>{quantity}</p>
                              <Button
                                onClick={() =>
                                  handleIncrementQuantity(productId)
                                }
                                variant="outline"
                                size="icon"
                              >
                                <PiPlusCircleBold className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>${unitPrice * quantity}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleDeleteCartItem(productId)}
                              variant="outline"
                              size="icon"
                            >
                              <TiDeleteOutline className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4 pr-10 pb-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-end">Grand Total : ${grandTotal}</h3>
                    </div>
                    <div>
                      <Link to="/checkout">
                        <Button variant="outline" className="w-36">
                          Checkout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center pt-2">
                <div className="flex flex-col items-center">
                  <GrDocumentMissing className="w-12 h-12 text-red-400" />
                  <h3 className="text-bold mt-2 text-red-400">
                    Cart Is Empty!!
                  </h3>
                  <Link to="/shop">
                    <Button variant="outline">Shop Now</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
