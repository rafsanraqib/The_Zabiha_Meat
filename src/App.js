import React, { Component } from "react";
import Dropbox from "./Components/Dropbox.jsx";
import Table from "./Components/Table";

import {
  pricePerPound,
  meatType,
  supplierName,
  marketName,
  deliveryFee
} from "./Components/Properties";

class App extends Component {
  state = {
    marketNameString: "",
    supplierName: "",
    meatType: "",
    weightArray: [],
    weightValues: "",
    weightSum: 0,
    price: 0,
    totalCost: 0,
    processingFee: 0
  };

  // Function that does the heavy lifting by calling multiple sub functions
  handleCalculations = () => {
    const weightArray = this.setWeightArray();
    const totalCost = this.calculateTotalCost(weightArray);
    // Bad Idea to compare with "Y" need to change this
    if (totalCost[0] === "Y") {
      console.log(totalCost);
      return;
    }
    const processingFee = this.calculateProcessingFee(weightArray);
    const date = this.setDate();
    const reciept = this.createReciept(date, totalCost, processingFee);
    console.log(reciept);
  };

  setMarketName = marketName => {
    this.setState({ marketNameString: marketName });
  };
  setSupplierName = supplierName => {
    this.setState({ supplierName: supplierName });
  };
  setMeatType = meatType => {
    this.setState({ meatType: meatType });
  };
  setWeightValues = weightValues => {
    this.setState({ weightValues: weightValues });
  };

  setWeightArray = () => {
    const weightValuesArray = this.state.weightValues.split(",");
    this.setState({ weightArray: weightValuesArray });
    return weightValuesArray;
  };

  calculateTotalCost = weightArray => {
    let weightSum = 0;
    for (var i = 0; i < weightArray.length; i++) {
      weightSum += parseFloat(weightArray[i]);
    }
    this.setState({ weightSum });
    var newlst = pricePerPound.filter(item => {
      return (
        item.Meat === this.state.meatType &&
        item.Market === this.state.marketNameString
      );
    });
    if (newlst.length === 0) {
      var message =
        "You do not sell " +
        this.state.meatType +
        " to " +
        this.state.marketNameString +
        "\nYou can add new item in the properties.js file in the price per pound array\n";
      return message;
    }
    const price = newlst[0].cost;
    this.setState({ price });
    var totalCost = price * weightSum;
    totalCost.toFixed(2);
    this.setState({ totalCost });
    return totalCost;
  };

  calculateProcessingFee = weightArray => {
    var processingFee = 0;
    for (var i = 0; i < weightArray.length; i++) {
      if (parseFloat(weightArray[i]) <= 20) {
        processingFee += 20;
      } else if (
        parseFloat(weightArray[i]) > 20 &&
        parseFloat(weightArray[i]) < 50
      ) {
        processingFee += 27;
      } else if (parseFloat(weightArray[i]) > 50) {
        processingFee += 32;
      }
    }
    this.setState({ processingFee });
    return processingFee;
  };

  setDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  createReciept = (currentDate, totalCost, processingFee) => {
    var reciept =
      "Date: " +
      currentDate +
      "\n" +
      "Name of customer: " +
      this.state.marketNameString +
      "\n" +
      "Type of meat: " +
      this.state.meatType +
      "\n" +
      "Supplier name: " +
      this.state.supplierName +
      "\n" +
      "Total Cost: $" +
      totalCost.toFixed(2) +
      "\n" +
      "Processing fee: $" +
      processingFee.toFixed(2) +
      "\n" +
      "Delivery fee: $" +
      deliveryFee +
      "\n";
    return reciept;
  };
  render() {
    return (
      <div className="container">
        <div className="container">
          <Dropbox
            handleMarketName={this.setMarketName}
            handleSupplier={this.setSupplierName}
            handleMeat={this.setMeatType}
            handleWeightValues={this.setWeightValues}
            handleWeightArray={this.setWeightArray}
            calculateCosts={this.handleCalculations}
            marketNameList={marketName}
            meatTypeList={meatType}
            supplierNameList={supplierName}
          ></Dropbox>
        </div>
        <br></br>
        <div className="container">
          <Table
            customerName={this.state.marketNameString}
            supplierName={this.state.supplierName}
            meatType={this.state.meatType}
            totalWeight={this.state.weightSum}
            pricePerPound={this.state.price}
            totalCost={this.state.totalCost}
            processingFee={this.state.processingFee}
            weights={this.state.weightValues}
          ></Table>
        </div>
      </div>
    );
  }
}
export default App;
