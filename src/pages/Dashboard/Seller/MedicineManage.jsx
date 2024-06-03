import AddMedicineForm from "@/components/Form/AddMedicineForm";
import MetaData from "@/components/MetaData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import useSecureApi from "@/hooks/useSecureApi";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import MedicineListsTable from "@/components/Table/MedicineListsTable";
export default function MedicineManage() {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuth();
  const secureApi = useSecureApi();
  const { data, isLoading } = useQuery({
    queryKey: ["my-medicines-list"],
    queryFn: async () =>
      await secureApi.get(`/medicines/my-medicine-lists/${authUser?.email}`),
  });
  return (
    <>
      <MetaData title="Seller Dashboard | Medicine Manage" />
      <div>
        <div className="flex justify-end">
          <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen(true)}>
              <Button variant="outline">Add New Medicine</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <AddMedicineForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <MedicineListsTable medicines={data?.data?.data} seller />
          )}
        </div>
      </div>
    </>
  );
}
