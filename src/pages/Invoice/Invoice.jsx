import Spinner from "@/components/Spinner";
import useSecureApi from "@/hooks/useSecureApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import logo from "../../assets/navLogo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
export default function Invoice() {
  const { orderId } = useParams();
  const secureApi = useSecureApi();

  const { data, isLoading } = useQuery({
    queryKey: ["invoice", orderId],
    queryFn: async () => await secureApi.get(`/orders/${orderId}`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const { createdAt, user, _id, products, shippingInfo, grandTotal } =
    data?.data?.data || {};

  const downloadPDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance with A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add image to PDF with width/height of A4 page size
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`invoice_${_id}.pdf`);
    });
  };

  return (
    <div className="my-10">
      <div
        id="invoice"
        style={{ width: "210mm", height: "297mm" }}
        className="max-w-6xl mx-auto bg-white p-20"
      >
        <p className="text-end ml-32">Invoice</p>
        <div>
          <div className="flex justify-center">
            <div>
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div>
              <h1 className="text-lg font-semibold">Order Info</h1>
              <div>
                <p>Order By: {user.name}</p>
                <p>Date: {new Date(createdAt).toLocaleDateString()}</p>
                <p>Total Amount: ${grandTotal}</p>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Shipping Info:</h1>
              <div>
                <p>Name: {shippingInfo?.name}</p>
                <p>Email: {shippingInfo?.email}</p>
                <p>Phone: {shippingInfo?.phoneNumber}</p>
                <p>Adress: {shippingInfo?.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h1>Items</h1>
            <div className="mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item, idx) => (
                    <TableRow key={item._id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>${item?.unitPrice}</TableCell>
                      <TableCell>${item?.unitPrice * item?.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => downloadPDF()} variant="outline">
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
