import React, { Component } from "react";
class Dropbox extends Component {
  render() {
    return (
      <div className="container">
        <div className="container">
          <h1>Enter Market</h1>
          <select onChange={e => this.props.handleMarketName(e.target.value)}>
            {this.props.marketNameList.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="container">
          <h1>Select type of Meat</h1>
          <select onChange={e => this.props.handleMeat(e.target.value)}>
            {this.props.meatTypeList.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="container">
          <h1>Select supplier name</h1>
          <select onChange={e => this.props.handleSupplier(e.target.value)}>
            {this.props.supplierNameList.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="container">
          <input
            type="Text"
            className="form-control"
            placeholder="Enter weight"
            onChange={e => this.props.handleWeightValues(e.target.value)}
          ></input>
        </div>
        <div className="container">
          <input
            readOnly
            className="btn btn-primary"
            value="Calculate"
            onClick={this.props.calculateCosts}
          ></input>
        </div>
      </div>
    );
  }
}

export default Dropbox;
