import React, { Component } from "react";
import ReactToExcel from "react-html-table-to-excel";
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
          <tbody>
            <tr>
              <td>{this.props.customerName}</td>
              <td>{this.props.supplierName}</td>
              <td>{this.props.meatType}</td>
              <td>{this.props.totalWeight}</td>
              <td>{this.props.pricePerPound}</td>
              <td>{this.props.totalCost}</td>
              <td>{this.props.processingFee}</td>
              <td>{this.props.weights}</td>
            </tr>
          </tbody>
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
