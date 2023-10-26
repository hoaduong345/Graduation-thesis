import { useEffect, useState } from "react";
import LogoWeb from "../../../../Assets/TSX/LogoWeb";
import Container from "../../../../components/container/Container";
import { formatDateYYYY, numberFormat } from "../../../../Helper/Format";
import { useParams } from "react-router-dom";
import { orderControllers } from "../../../../Controllers/OrderControllers";
import { OrderModel } from "../../../../Model/OrderModel";

export default function InvoicesPage() {
   const { id } = useParams();
   const idOrder = Number(id);

   const [invoice, setInvoice] = useState<OrderModel>({} as OrderModel);

   useEffect(() => {
      getInvoice();
   }, []);

   const getInvoice = async () => {
      await orderControllers.getDetails(idOrder).then((res) => {
         setInvoice(res);
      });
   };

   return (
      <>
         <Container>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded border-[1px] shadow-sm my-6">
               <div className="grid grid-cols-2 items-center">
                  <div>
                     <LogoWeb />
                  </div>
                  <div className="text-right">
                     <p>Buyzzle Inc.</p>
                     <p className="text-gray-500 text-sm">sales@buyzzle.com</p>
                     <p className="text-gray-500 text-sm mt-1">+84-123456789</p>
                     {/* <p className="text-gray-500 text-sm mt-1">
                        VAT: 8657671212
                     </p> */}
                  </div>
               </div>
               <div className="grid grid-cols-2 items-center mt-8">
                  <div>
                     <p className="font-bold text-gray-800">Gửi đến:</p>
                     <p className="text-gray-500">{invoice?.User?.address}</p>
                     <p className="text-gray-500">{invoice.User?.email}</p>
                  </div>
                  <div className="text-right">
                     <p className="">
                        Khách hàng:{" "}
                        <span className="text-gray-500">
                           {invoice.User?.name}
                        </span>
                     </p>
                     <p>
                        SĐT:{" "}
                        <span className="text-gray-500">
                           {invoice.User?.phonenumber}
                        </span>
                        <br />
                        Ngày đặt:{" "}
                        <span className="text-gray-500">
                           {formatDateYYYY(invoice.createdAt)}
                        </span>
                     </p>
                  </div>
               </div>
               <div className="-mx-4 mt-8 flow-root sm:mx-0">
                  <table className="min-w-full">
                     <colgroup>
                        <col className="w-full sm:w-1/2" />
                        <col className="sm:w-1/6" />
                        <col className="sm:w-1/6" />
                        <col className="sm:w-1/6" />
                     </colgroup>
                     <thead className="border-b border-gray-300 text-gray-900">
                        <tr>
                           <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                           >
                              Mặt hàng
                           </th>
                           <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                           >
                              Số lượng
                           </th>
                           <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                           >
                              Giá
                           </th>
                           <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                           >
                              Tổng
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {invoice?.OrderDetail?.map((e) => {
                           return (
                              <>
                                 <tr className="border-b border-gray-200">
                                    <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                       <div className="font-medium text-gray-900">
                                          {e.name}
                                       </div>
                                       <div className="mt-1 truncate text-gray-500">
                                          {}
                                       </div>
                                    </td>
                                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                       {e.quantity}
                                    </td>
                                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                       {numberFormat(e.price)}
                                    </td>
                                    <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                       {numberFormat(e.total)}
                                    </td>
                                 </tr>
                              </>
                           );
                        })}
                        {/* <tr className="border-b border-gray-200">
                           <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="font-medium text-gray-900">
                                 Frontend Design
                              </div>
                              <div className="mt-1 truncate text-gray-500">
                                 Frontend design using Vue.js and Tailwind CSS.
                              </div>
                           </td>
                           <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                              500.0
                           </td>
                           <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                              $100.00
                           </td>
                           <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                              $5,000.00
                           </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                           <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="font-medium text-gray-900">
                                 Shop SEO
                              </div>
                              <div className="mt-1 truncate text-gray-500">
                                 Website SEO and Social Media marketing.
                              </div>
                           </td>
                           <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                              50.0
                           </td>
                           <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                              $100.00
                           </td>
                           <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                              $500.00
                           </td>
                        </tr> */}
                     </tbody>
                     <tfoot>
                        <tr>
                           <th
                              scope="row"
                              colSpan={3}
                              className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                           >
                              Tổng tiền hàng
                           </th>
                           <th
                              scope="row"
                              className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                           >
                              Tổng tiền hàng
                           </th>
                           <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                              {numberFormat(invoice.subtotal)}
                           </td>
                        </tr>
                        <tr>
                           <th
                              scope="row"
                              colSpan={3}
                              className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                           >
                              Giảm giá
                           </th>
                           <th
                              scope="row"
                              className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                           >
                              Giảm giá
                           </th>
                           <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0 line-through">
                              {numberFormat(invoice.discount)}
                           </td>
                        </tr>
                        <tr>
                           <th
                              scope="row"
                              colSpan={3}
                              className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                           >
                              Phí giao hàng
                           </th>
                           <th
                              scope="row"
                              className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                           >
                              Phí giao hàng
                           </th>
                           <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                              {numberFormat(invoice.shipping)}
                           </td>
                        </tr>
                        <tr>
                           <th
                              scope="row"
                              colSpan={3}
                              className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                           >
                              Tổng thanh toán
                           </th>
                           <th
                              scope="row"
                              className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                           >
                              Tổng thanh toán
                           </th>
                           <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                              {numberFormat(invoice.amountTotal)}
                           </td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
               {/*  Footer  */}
               <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                  Cảm ơn bạn đã mua hàng
               </div>
            </div>
         </Container>
      </>
   );
}
