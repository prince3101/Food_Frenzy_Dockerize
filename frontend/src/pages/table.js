import React from "react";
import { NavLink } from "react-router-dom";

const Table = () => {
  return (
    <>
      <div className="mainTable">
        <div className="table-txt">
          <h2>Table View </h2>
          <hr></hr>
        </div>
        <div className="ground-floor">
          <p>Ground Floor</p>
        </div>
        <div className="main-box">
          <div className="box">
            {new Array(...Array(15)).map((item, index) => {
              return (
                <NavLink to={`/inventory/${index + 1}`} key={index} className="link">
                  <button className="boxes">{index + 1}</button>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
