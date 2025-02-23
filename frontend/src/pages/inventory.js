import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Inventory = () => {
  const [category, setCategory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [modelDetail, setModelDetail] = useState({});
  const { table_id } = useParams();

  const plus = (index) => {
    food[index]["qty"] += 1;
    setFood([...food]);
  };

  const min = (index) => {
    if (food[index]["qty"] != 1) {
      food[index]["qty"] -= 1;
      setFood([...food]);
    }
  };

  const toggleModel = () => {
    setOpenDetail(!openDetail);
  };

  const getData = async () => {
    try {
      const response = await axios.get("/admin/category");
      setCategory(response?.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = inventory.filter((curFood) =>
    curFood.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInventory = async () => {
    try {
      const response = await axios.get("adminIn/inventory");
      setInventory(response?.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInventory();
  }, []);

  const handleFood = async (id) => {
    try {
      const response = await axios.get(`adminIn/inventory-by-cat/${id}`);
      setInventory(response?.data?.payload);
    } catch (error) {
      console.log(error);
    }
    console.log(id, "id");
  };

  const handleInventory = (name, item, price) => {
    try {
      setFood([...food, { name, item, price, qty: 1, kot_status: "pending" }]);
    } catch (error) {
      console.log(error);
    }
    console.log(name, "food");
    console.log(item, "item");
    console.log(price, "Price");
  };

  const moveToKOT = () => {

    alert("Your food forward in KOT  !")

    const getKOTItem = localStorage.getItem("table_kot");
    if (getKOTItem) {
      const oldData = JSON.parse(getKOTItem);
      let filterData = oldData;
      const isItemExist = oldData.find((m) => m?.table_id === table_id);
      if (isItemExist) {
        filterData = oldData.filter((m) => m?.table_id !== table_id);
      }
      const mergeKot = [{ table_id: table_id, food: food }, ...filterData];
      localStorage.setItem(`table_kot`, JSON.stringify(mergeKot));
    } else {
      localStorage.setItem(`table_kot`, JSON.stringify([{ table_id: table_id, food: food }]));
    }
    localStorage.setItem(
      `table_${table_id}_order`,
      JSON.stringify({ table_id: table_id, food: food })
    );
  };

  const subTotal = food.reduce((acc, cur) => cur?.qty * cur?.price + acc, 0);

  const setTableData = () => {
    const tableData = localStorage.getItem(`table_${table_id}_order`);
    if (tableData) {
      const parseData = JSON.parse(tableData);
      setFood([...parseData?.food]);
    }
  };

  const generateBill = async () => {
    try {
      const requestData = {
        client_name: modelDetail?.client_name,
        biller_name: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))?.first_name : "",
        table_no: table_id,
        bill_amount: subTotal,
        payment_type: modelDetail?.payment_type,
        food_items: food,
        payment_status: "pending",
      };
      const res = await axios.post("/user/generate-bill", requestData);
      toast.success(res.data?.message);
      localStorage.removeItem(`table_${table_id}_order`)
      const kotData = localStorage.getItem('table_kot')
      if (kotData) {
        let DataKot = JSON.parse(kotData)
        localStorage.setItem('table_kot', JSON.stringify(DataKot.filter((f) => f?.table_id !== table_id)))
      }
      setFood([])
      setOpenDetail(false)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getData();
    setTableData();
  }, []);
  // const subGst = food.reduce((subTotal) => {
  //     subTotal % 5 ;
  //   })

  return (
    <>
      <div className="main-in">
        <div className="in-head">
          <div className="FastFood">
            <h5 className="text-in">Fast Food</h5>
          </div>
          <div className="input-in">
            <input
              type="search"
              placeholder="Search Items"
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            {/* <input
              type="search"
              placeholder="Search Code"
              className="search"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></input> */}
          </div>
          <div className="dine-in">
            <button type="button" className="din-in">
              {" "}
              Dine-in{" "}
            </button>
            {/* <button type="button" className="parcel">
              {" "}
              Parcel{" "}
            </button> */}
          </div>
        </div>
      </div>

      <div className="category-main">
        <div className="cate">
          <div className="category">
            <ul>
              {Array.isArray(category) &&
                category?.map((curEl) => {
                  // return <li className="li-in" key={curEl.description}>{curEl.name}</li>;
                  return (
                    <li className="li-in" onClick={() => handleFood(curEl?._id)}>
                      {curEl.name}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="food-main" style={{width: 'max-content'}}>
            <ul className="food-in">
              {Array.isArray(searchData) &&
                searchData?.map((cur) => {
                  return (
                    <div className="food-card">
                      <center>
                        <p
                          className="foods"
                          onClick={() => handleInventory(cur?.name, cur?.item, cur?.price)}
                        >
                          {cur.name}
                        </p>
                      </center>
                    </div>
                  );
                })}
            </ul>
          </div>

          <div className="payment">
            <div className="item-header">
              <h6>items</h6>
              <h6>CheckItems</h6>
              <h6 className="qty">QTY.</h6>
              <h6>Price</h6>
            </div>

            <div className="items">
              <ul>
                {Array.isArray(food) &&
                  food?.map((cur, index) => {
                    return (
                      <li key={cur.id} className="count-food">
                        <table className="table-inv">
                          <tr className="foodname">
                            <td>{cur.name}</td>
                          </tr>
                          <tr className="fooditem">
                            <td>{cur.item}</td>
                          </tr>
                          <tr className="qty">
                            <td>
                              <button className="min" onClick={() => min(index)}>
                                -
                              </button>
                            </td>
                            <td>
                              <p>{cur?.qty}</p>
                            </td>
                            <td>
                              <button className="plus" onClick={() => plus(index)}>
                                +
                              </button>
                            </td>
                          </tr>
                          <tr className="foodprice">
                            <td>{cur?.qty * cur.price}</td>
                          </tr>
                        </table>
                      </li>
                    );
                  })}
              </ul>
              <p className="total">Total : {subTotal} </p>
            </div>
            <button className="btn-order" onClick={() => moveToKOT()}>
              Kitchen To Order (KOT) <i class="fa-solid fa-kitchen-set"></i>
            </button>
            <button className="btn-order ms-4" onClick={() => toggleModel()}>
              Generate Bill <i class="fa-solid fa-receipt"></i>
            </button>
          </div>
        </div>
      </div>
      {openDetail && (
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Enter Billing Details
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => toggleModel()}
                ></button>
              </div>
              <div class="modal-body">
                <div className="modal_form">
                  <input
                    type="text"
                    placeholder="Enter Customer Name"
                    className="input-customer"
                    name="client_name"
                    value={modelDetail?.client_name}
                    onChange={(e) =>
                      setModelDetail({ ...modelDetail, client_name: e.target.value })
                    }
                  />
                  <p>Payment Method</p>
                  <div className="d-flex justify-content-between mt-1">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="cash"
                        name="cash"
                        id="flexCheckDefault"
                        onChange={(e) =>
                          setModelDetail({ ...modelDetail, payment_type: e.target.value })
                        }
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Cash
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="online"
                        value="online"
                        id="flexCheckChecked2"
                        onChange={(e) =>
                          setModelDetail({ ...modelDetail, payment_type: e.target.value })
                        }
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Online
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="card"
                        value="card"
                        id="flexCheckChecked3"
                        onChange={(e) =>
                          setModelDetail({ ...modelDetail, payment_type: e.target.value })
                        }
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Card
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={() => toggleModel()} data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-confirm" onClick={() => generateBill()}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
