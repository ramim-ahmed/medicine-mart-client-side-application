import MetaData from "@/components/MetaData";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useSecureApi from "@/hooks/useSecureApi";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/Spinner";
export default function UserPaymentHistory() {
  const { authUser } = useAuth();
  const secureApi = useSecureApi();
  const { data, isLoading } = useQuery({
    queryKey: ["users-payments"],
    queryFn: async () =>
      await secureApi.get(`/payments/my-payments/${authUser?.email}`),
  });
  return (
    <>
      <MetaData title="User Dashboard | Payment History" />
      <div>
        <div>
          <Button variant="outline">My Payments list</Button>
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
                  <TableHead>Transaction Id</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.data?.map(
                  ({ createdAt, status, transactionId, _id, price }, idx) => (
                    <TableRow key={_id}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="font-medium">
                        {transactionId}
                      </TableCell>
                      <TableCell>${price}</TableCell>
                      <TableCell>
                        {new Date(createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{status}</TableCell>
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
