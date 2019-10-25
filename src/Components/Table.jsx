import React, { Component } from "react";
import ReactToExcel from "react-html-table-to-excel";
// import { currentOrdersList } from "./Properties.js";
class Table extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <table className="table" id="Excel Table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Supplier Name</th>
              <th>Meat Type</th>
              <th>Total Weight</th>
              <th>Price per pound</th>
              <th>Total Cost</th>
              <th>Processing Fee</th>
              <th>Weights CSV</th>
            </tr>
          </thead>
          {this.props.ordersRecord.map(item => (
            <tbody key={Math.random().toString(36)}>
              <tr>
                <td>{item.customerName}</td>
                <td>{item.supplierName}</td>
                <td>{item.meatType}</td>
                <td>{item.totalWeight}</td>
                <td>{item.pricePerPound}</td>
                <td>{item.totalCost}</td>
                <td>{item.processingFee}</td>
                <td>{item.weightsCSV}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <ReactToExcel
          className="btn btn-primary"
          table="Excel Table"
          filename="ExcelFile"
          sheet="sheet1"
          buttonText="Download Excel"
        ></ReactToExcel>
      </div>
    );
  }
}

export default Table;
