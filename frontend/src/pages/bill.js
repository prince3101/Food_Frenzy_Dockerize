import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import InvoicePDF from "../components/invoicePDF";
import { pdf } from "@react-pdf/renderer";

const Bill = () => {
  const [billData, setBillData] = useState([]);

  const bill = async () => {
    try {
      const response = await axios.get("/user/getBill");
      setBillData(response?.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = async (bill) => {
    const blobData = await pdf(<InvoicePDF billData={bill} title="Bill Invoice" />).toBlob();

    const fileURL = URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `${bill?.client_name}'s_bill`;
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    bill();
  }, []);

  return (
    <>
      <h2 className="bill-text">Billing View </h2>
      <hr></hr>

      <div className="bill-data container">
        {
          <table class="table bill-head">
            <thead className="bill-col">
              <tr className="tb-kot">
                <th scope="col">#</th>
                <th scope="col">Table no.</th>
                <th scope="col">Biller Name</th>
                <th scope="col">Client Name</th>
                <th scope="col">Payment Type</th>
                <th scope="col">Bill Date</th>
                <th scope="col">Total Bill</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody className="bills-data">
              {Array.isArray(billData) &&
                billData?.map((cur, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{cur.table_no}</td>
                      <td>{cur.biller_name}</td>
                      <td>{cur.client_name}</td>
                      <td>{cur.payment_type}</td>
                      <td>{moment(cur.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
                      <td> ₹ {cur.bill_amount}</td>
                      <td>
                        {cur.payment_status === "pending" ? (
                          <span class="badge rounded-pill bg-warning">{cur.payment_status}</span>
                        ) : (
                          <span class="badge rounded-pill bg-success">{cur.payment_status}</span>
                        )}
                      </td>
                      <td>
                        <i class="fa-solid fa-download" onClick={() => downloadPDF(cur)}></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        }
      </div>
    </>
  );
};

export default Bill;
