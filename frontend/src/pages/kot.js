import { useEffect, useState } from "react";

const KOT = (props) => {
  const [kotItem, setKotItem] = useState([]);

  const getKOTItem = () => {
    const kotTables = localStorage.getItem("table_kot");
    if (kotTables) {
      setKotItem(JSON.parse(kotTables));
    }
  };

  const updateStatus = (table_id, itemName) => {
    const tableOrder = localStorage.getItem(`table_${table_id}_order`);
    const tableKot = localStorage.getItem("table_kot");
    if (tableOrder) {
      let tableData = JSON.parse(tableOrder);
      tableData.food.map((tbl) => {
        if (tbl?.name === itemName) {
          tbl.kot_status = "completed";
        }
      });
      localStorage.setItem(`table_${table_id}_order`, JSON.stringify(tableData));
    }

    if (tableKot) {
      let tableKotData = JSON.parse(tableKot);
      tableKotData.map((kot) => {
        if (kot.table_id === table_id) {
          kot.food.map((tbl) => {
            if (tbl?.name === itemName) {
              tbl.kot_status = "completed";
            }
          });
        }
      });
      localStorage.setItem(`table_kot`, JSON.stringify(tableKotData));
    }
    getKOTItem();
  };

  useEffect(() => {
    getKOTItem();
  }, []);
  return (
    <>
      <h2 className="kk">KOT = Kitchen Order Ticket</h2>
      <hr></hr>
      <div className="container-fluid">
        <div className="row">
          {kotItem?.length > 0 &&
            kotItem.map((kot) => {
              return (
                <div className="col-md-6 col-lg-6 col-sm-12">
                  <table class="table">
                    <thead>
                      <tr className="id-kot">
                        <th scope="col" colspan="5" className="text-center">
                          Table {kot?.table_id}
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr className="tb-kot">
                        <th scope="col">#</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kot?.food?.length > 0 &&
                        kot?.food.map((food, index) => {
                          return (
                            <tr className="in-kot">
                              <th scope="row">{index + 1}</th>
                              <td>{food?.name}</td>
                              <td>{food?.qty}</td>
                              <td>
                                {food?.kot_status === "pending" ? (
                                  <span class="badge rounded-pill bg-warning">
                                    {food?.kot_status}
                                  </span>
                                ) : (
                                  <span class="badge rounded-pill bg-success">
                                    {food?.kot_status}
                                  </span>
                                )}
                              </td>
                              <td>
                                <i
                                  class="fa-solid fa-check"
                                  onClick={() => updateStatus(kot?.table_id, food?.name)}
                                  style={{ color: "green", fontSize: 20, cursor: "pointer" }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default KOT;
