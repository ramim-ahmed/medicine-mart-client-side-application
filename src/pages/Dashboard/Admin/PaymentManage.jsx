import MetaData from "@/components/MetaData";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSecureApi from "@/hooks/useSecureApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
export default function PaymentManage() {
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["all-transactions"],
    queryFn: async () => await secureApi.get("/payments"),
  });

  const { mutateAsync: updatePaymentStatus } = useMutation({
    mutationFn: async (id) =>
      await secureApi.patch(`/payments/update-payment-status/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["all-transactions"]),
  });

  const handleUpdatePaymentStatus = async (id) => {
    try {
      await updatePaymentStatus(id);
      toast.success("Payment Accepted!!");
    } catch (error) {
      toast.success("Payment Accepted Failed!!");
    }
  };

  return (
    <>
      <MetaData title="Admin Dashboard | Payments" />
      <div>
        <div>
          <Button variant="outline">All Payments List</Button>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : data?.data?.data?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.data?.map(
                  (
                    {
                      createdAt,
                      user,
                      status,
                      orderId,
                      transactionId,
                      _id,
                      price,
                    },
                    idx
                  ) => (
                    <TableRow key={_id}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="font-medium">
                        {user?.name}
                      </TableCell>
                      <TableCell className="font-medium">{orderId}</TableCell>
                      <TableCell className="font-medium">
                        {transactionId}
                      </TableCell>
                      <TableCell>${price}</TableCell>
                      <TableCell>
                        {new Date(createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <p>{status}</p>
                      </TableCell>
                      {status === "PENDING" ? (
                        <TableCell>
                          <Button
                            onClick={() => handleUpdatePaymentStatus(_id)}
                            variant="outline"
                          >
                            Accept
                          </Button>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center pt-2">
              <div className="flex flex-col items-center">
                <HiOutlineCurrencyDollar className="w-12 h-12" />
                <h3 className="text-bold mt-2">NO TRANSTACIOTN YET</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
