import React, { Component } from "react";
import { Panel, Button } from "react-bootstrap/lib";
import axios from "axios";

export default class ContentDetail extends Component {
  state = {
    apiKey: "?api_key=952881c1a8d0f4b3e98d6063f868ed4d",
    movieUrl: "https://api.themoviedb.org/3/movie",
    moviesData: [],
    nowPlaying: [],
    imgPathW200: "https://image.tmdb.org/t/p/w200/",
    imgPathW300: "https://image.tmdb.org/t/p/w300/",
    price: 0,
    collection: [],
    isDetail: false,
    initialLoad: true,
    hasMore: true,
    row: []
  };

  constructor(props) {
    super(props);
    this.param = "";
    this.page = 0;
    this.col = [];
    this.isLoaded = false;
    this.reponseData = [];
    this.isDetail = false;
  }

  componentDidMount() {
    console.log("this.props contentDet: ", this.props);
  }

  getDataDetail(id) {
    if (this.isLoaded === false) {
      const urlDetail =
        this.state.movieUrl +
        "/" +
        id +
        this.state.apiKey +
        "&language=en_US&region=ID&page=1&append_to_response=credits";

      axios.get(urlDetail).then(response => {
        this.reponseData = response.data;
        this.isDetail = true;
        this.createContentDetail();
        this.isLoaded = true;
      });
    }
  }

  getCast(casts) {
    let _casts = "";

    for (let i = 0; i < casts.length; i++) {
      _casts = _casts + ", " + casts[i].name;
    }
    return _casts.replace(",", "");
  }

  createContentDetail() {
    const detail = this.reponseData;

    let content = [];
    content.push(
      <Panel key="detail">
        <Panel.Body>
          <div className="row">
            <div className="col-md-3">
              <img
                src={this.state.imgPathW300 + detail.poster_path}
                alt={detail.original_title}
              />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-xs-12">
                  <h3 className="text-warning"
                    style={{
                      marginBottom: 0
                    }}
                  >
                    {detail.title +
                      " (" +
                      detail.release_date.substring(0, 4) +
                      ")"}
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3 className="text-info"
                    style={{
                      marginTop: 0,
                      marginBottom: 0
                    }}
                  >
                    {detail.runtime + " mins"}
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-4 col-md-2">
                  <h4 className="text-warning">
                    {detail.vote_average > 0
                      ? detail.vote_average + "/10"
                      : "No Rating"}
                  </h4>
                </div>
                <div className="col-xs-4 col-md-2">
                  <h4 className="text-info">{detail.release_date}</h4>
                </div>
                <div className="col-xs-4 col-md-2">
                  {this.props.getPaid(detail.id, detail.vote_average)}
                  {this.props.paidElement}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="col-md-2"
                    style={{
                      padding: "0px"
                    }}
                  >
                    <h4 align="justify">Cast:</h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      {this.getCast(detail.credits.cast)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="col-md-2"
                    style={{
                      padding: "0px"
                    }}
                  >
                    <h4 align="justify">Sinopsis: </h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      {detail.overview === ""
                        ? "belum ada sinopsis cerita dalam Bahasa Indonesia"
                        : detail.overview}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-2">
                  <Button
                    bsStyle="success"
                    key={"buy"}
                    onClick={() =>
                      this.props.handleClick(detail.id, detail.vote_average)
                    }
                  >
                    Beli
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
    this.setState({ row: content });
  }

  buy(id, price) {
    console.log(id, price);
    console.log(this.props.balance);
    let balance = this.props.balance;
    this.setState({ balance: balance - price });
  }
  render() {
    let idMovie = this.props.match.url.replace("/", "");
    idMovie = idMovie.split("-");
    if (this.isLoaded === false) {
      this.getDataDetail(idMovie[0]);
    }

    return (
      <Panel key="main">
        <Panel.Body>
          <div>{this.state.row}</div>
        </Panel.Body>
      </Panel>
    );
  }
}
