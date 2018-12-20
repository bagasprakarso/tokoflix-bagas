import React, { Component } from "react";
import { Button, Panel } from "react-bootstrap/lib";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

export default class Navbar extends Component {

  render() {
    return (
      <Panel
        style={{
          margin: "1px"
        }}
      >
        <Panel.Body>
          <div className="row">
            <div className="col-md-10">
              <div className="col-md-2">
                <Button bsStyle="success">
                  <img src="/favicon.ico" alt="Home" />
                  Tokoflix
                </Button>
              </div>
              <div className="col-md-2">
                <Link
                  to="/"
                  key={"now_playing"}
                >
                  Now Playing
                </Link>
              </div>
              <div className="col-md-2">
                <Link to="/popular" key={"popular"}>
                  Popular
                </Link>
              </div>
              <div className="col-md-2">
                <Link to="/top_rated" key={"top_rated"}>
                  Top Rating
                </Link>
              </div>
              <div className="col-md-2">
                <Link to="/upcoming" key={"upcoming"}>
                  Coming Soon
                </Link>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="text-success pull-right"
                style={{
                  padding: "6px 10px"
                }}
              >
                Saldo:
                <CurrencyFormat
                  value={this.props.balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" Rp. "}
                />
              </div>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}