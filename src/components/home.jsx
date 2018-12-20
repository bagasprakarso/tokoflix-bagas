import React, { Component } from "react";
import Navbar from "./layout/navbar";
import Content from "./layout/content";
import Footer from "./layout/footer";
import ContentDetail from "./layout/contentDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Label } from "react-bootstrap/lib";
import CurrencyFormat from "react-currency-format";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 100000,
      userData: [],
      paidElement: []
    };
    this.buyMovie = this.buyMovie.bind(this);
    this.countPrice = this.countPrice.bind(this);
    this.getPaid = this.getPaid.bind(this);
  }

  buyMovie(id, vote_average) {
    let userData = this.state.userData;
    const found = userData.find(data => data.id === id);
    const price = this.countPrice(vote_average);
    if (!found) {
      userData.push({ id: id });
      this.setState({
        balance: this.state.balance - price,
        userData: userData
      });
      this.getPaid(id, vote_average);
    } else {
      alert("Film Ini Sudah Anda Miliki!");
    }
  }
  
  countPrice(rate) {
    let valPrice;
    if (rate < 3) {
      valPrice = 3500;
    } else if (rate >= 3 && rate < 6) {
      valPrice = 8250;
    } else if (rate >= 6 && rate < 8) {
      valPrice = 16350;
    } else if (rate >= 8 && rate < 10) {
      valPrice = 21250;
    }

    return valPrice;
  }

  getPaid(id, vote_average) {
    if (this.state !== undefined) {
      let found = this.state.userData.find(data => data.id === id);
      if (!found) {
        let paidElement = [];
        paidElement.push(
          <h4 key="nFound" className="text-success">
            <CurrencyFormat
              value={this.countPrice(vote_average)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp. "}
            />
          </h4>
        );
        this.setState({
          paidElement: paidElement
        });
      } else {
        let paidElement = [];
        paidElement.push(
          <h4 key="found" className="text-success">  
          <Label bsStyle="success">Paid</Label> 
          </h4>
        );
        this.setState({
          paidElement: paidElement
        });
      }
    } else {
      let paidElement = [];
      paidElement.push(
        <h4 key="undefined" className="text-success">
          <CurrencyFormat
            value={this.countPrice(vote_average)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Rp. "}
          />
        </h4>
      );
      this.setState({
        paidElement: paidElement
      });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar balance={this.state.balance} userData={this.state.userData} />
          <Route
            exact
            path="/"
            render={props => (
              <Content
                {...props}
                balance={this.state.balance}
                userData={this.state.userData}
                getPaid={this.getPaid}
                paidElement={this.state.paidElement}
              />
            )}
          />
          <Route
            path="/popular"
            render={props => (
              <Content
                {...props}
                balance={this.state.balance}
                userData={this.state.userData}
                getPaid={this.getPaid}
                paidElement={this.state.paidElement}
              />
            )}
          />
          <Route
            path="/top_rated"
            render={props => (
              <Content
                {...props}
                balance={this.state.balance}
                userData={this.state.userData}
                getPaid={this.getPaid}
                paidElement={this.state.paidElement}
              />
            )}
          />
          <Route
            path="/upcoming"
            render={props => (
              <Content
                {...props}
                balance={this.state.balance}
                userData={this.state.userData}
                getPaid={this.getPaid}
                paidElement={this.state.paidElement}
              />
            )}
          />
          <Route
            path="/detail/:id"
            render={props => (
              <ContentDetail
                {...props}
                buyMovie={this.buyMovie}
                balance={this.state.balance}
                userData={this.state.userData}
                getPaid={this.getPaid}
                paidElement={this.state.paidElement}
              />
            )}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}
