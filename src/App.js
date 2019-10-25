import React, { Component } from "react";
import Dropbox from "./Components/Dropbox.jsx";
import Table from "./Components/Table";
import {
  pricePerPound,
  meatType,
  currentOrdersList,
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
    const returnedArray = this.calculateTotalCost(weightArray);
    // Bad Idea to compare with "I" need to change this
    if (returnedArray[0] === "I") {
      alert(returnedArray)
      return;
    }
    const processingFee = this.calculateProcessingFee(weightArray);
    const date = this.setDate();
    const reciept = this.createReciept(date, returnedArray, processingFee);
    console.log(reciept)
    this.createOrder(date, returnedArray, processingFee);
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
        item.Meat === this.state.meatType
      );
    });
    if (newlst.length === 0) {
      var message =
        "I havent added the price per pound of " +
        this.state.meatType +
        "\nYou can update it in the properties.js file in the pricePerPound array\n";
      return message;
    }
    const price = newlst[0].cost;
    this.setState({ price });
    var totalCost = price * weightSum;
    totalCost.toFixed(2);
    this.setState({ totalCost });
    return {totalCost,price,weightSum};
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

  createOrder = (currentDate, returnedArray, processingFee) =>{
    var tempList = {customerName: this.state.marketNameString,supplierName: this.state.supplierName,meatType: this.state.meatType,totalWeight:returnedArray.weightSum,pricePerPound: returnedArray.price,totalCost:returnedArray.totalCost,processingFee:processingFee,weightsCSV: this.state.weightValues}
    currentOrdersList.push(tempList);
  }
  createReciept = (currentDate, returnedArray, processingFee) => {
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
      returnedArray.totalCost.toFixed(2) +
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
          <Table key = {Math.random().toString(36)}
            ordersRecord = {currentOrdersList}
          ></Table>
        </div>
      </div>
    );
  }
}
export default App;
