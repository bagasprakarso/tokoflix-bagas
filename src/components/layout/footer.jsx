import React, { Component } from "react";
import { Panel, Grid, Row, Col } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <Panel
        style={{
          position: "fixed",
          left: "0",
          bottom: "-20px",
          width: "100%",
          color: "white"
        }}
      >
        <Panel.Body>
          <Grid style={{ marginLeft: 0, marginRight: 0, width: "100%" }}>
            <Row className="footer">
              <Col xs={6}>
                <code>{"Copyright @2018"}</code>
              </Col>
              <Col xs={6}>
                <code className="pull-right">
                  {"Powered by Bagas Prakarso"}
                </code>
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>
    );
  }
}

