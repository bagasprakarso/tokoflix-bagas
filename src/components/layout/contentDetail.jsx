import React, { Component } from "react";
import { Panel, Button, Glyphicon } from "react-bootstrap/lib";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default class ContentDetail extends Component {
  state = {
    apiKey: "?api_key=952881c1a8d0f4b3e98d6063f868ed4d",
    movieUrl: "https://api.themoviedb.org/3/movie",
    moviesData: [],
    nowPlaying: [],
    imgPathW185: "https://image.tmdb.org/t/p/w185/",
    imgPathW200: "https://image.tmdb.org/t/p/w200/",
    imgPathW300: "https://image.tmdb.org/t/p/w300/",
    price: 0,
    collection: [],
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
    this.handleOnDragStart = e => e.preventDefault();
    this.similarData = [];
    this.similarMovies = [];
    this.recomendationsMovies = [];
    this.responsive = { 0: { items: 2 } };
  }

  getDataDetail(id) {
    console.log("berapa kali");

    if (this.isLoaded === false) {
      const urlDetail =
        this.state.movieUrl +
        "/" +
        id +
        this.state.apiKey +
        "&language=en_US&region=ID&page=1&append_to_response=credits,similar,recommendations";

      axios.get(urlDetail).then(response => {
        this.reponseData = response.data;
        this.createContentDetail();
        this.isLoaded = true;
      });
    }
  }

  getCast(casts) {
    let _casts = "";

    for (let i = 0; i < 40; i++) {
      _casts = _casts + ", " + casts[i].name;
    }
    return _casts.replace(",", "");
  }

  getSimilar(detail) {
    const similarData = detail.similar.results;
    this.similarMovies = [];
    for (let i = 0; i < detail.similar.results.length; i++) {
      let shortDesc = similarData[i].title.substring(0, 14);
      shortDesc.substring(
        0,
        Math.min(shortDesc.length, shortDesc.lastIndexOf(" "))
      );
      shortDesc = shortDesc + '..';
      this.similarMovies.push(
        <div key={similarData[i].id}>
          <img
            key={similarData[i]}
            src={this.state.imgPathW185 + similarData[i].backdrop_path}
            alt=""
            onDragStart={this.handleOnDragStart}
          />
          <div className="row">
            <div className="col-xs-7">{shortDesc}</div>
            <div
              className="col-xs-5"
              style={{
                paddingLeft: "1px"
              }}
            >
              <Glyphicon glyph="star" /> {similarData[i].vote_average}
            </div>
          </div>
        </div>
      );
    }
  }

  getRecomendations(detail) {
    const recomendationsData = detail.recommendations.results;

    this.recomendationsMovies = [];
    for (let i = 0; i < detail.recommendations.results.length; i++) {
      let shortDesc = recomendationsData[i].title.substring(0, 14);
      shortDesc.substring(
        0,
        Math.min(shortDesc.length, shortDesc.lastIndexOf(" "))
      );
      shortDesc = shortDesc + '..';
      this.recomendationsMovies.push(
        <div key={recomendationsData[i].id}>
          <img
            key={recomendationsData[i]}
            src={this.state.imgPathW185 + recomendationsData[i].backdrop_path}
            alt=""
            onDragStart={this.handleOnDragStart}
          />
          <div className="row">
            <div className="col-xs-7">{shortDesc}</div>
            <div
              className="col-xs-5"
              style={{
                paddingLeft: "1px"
              }}
            >
              <Glyphicon glyph="star" /> {recomendationsData[i].vote_average}
            </div>
          </div>
        </div>
      );
    }
  }

  createContentDetail() {
    const detail = this.reponseData;
    this.getSimilar(detail);
    this.getRecomendations(detail);
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
            <div className="col-md-5">
              <div className="row">
                <div className="col-xs-12">
                  <h3
                    className="text-warning"
                    style={{
                      margin: 0
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
                  <h3
                    className="text-info"
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
                <div className="col-xs-4">
                  <h4 className="text-warning">
                    {detail.vote_average > 0
                      ? detail.vote_average + "/10"
                      : "No Rating"}
                  </h4>
                </div>
                <div className="col-xs-4">
                  <h4 className="text-info">{detail.release_date}</h4>
                </div>
                <div className="col-xs-4">
                  {this.props.getPaid(detail.id, detail.vote_average)}
                  {this.props.paidElement}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
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
                <div className="col-md-12">
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
                      this.props.buyMovie(detail.id, detail.vote_average)
                    }
                    style={{
                      width: "100px"
                    }}
                  >
                    Beli
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <h4 className="text-warning">Similar Movies</h4>
                <AliceCarousel mouseDragEnabled responsive={this.responsive}>
                  {this.similarMovies}
                </AliceCarousel>
              </div>
              <div className="row">
                <h4 className="text-warning">Recommended Movies</h4>
                <AliceCarousel mouseDragEnabled responsive={this.responsive}>
                  {this.recomendationsMovies}
                </AliceCarousel>
              </div>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
    this.setState({ row: content });
  }

  render() {
    let idMovie = this.props.match.url.split("/");
    idMovie = idMovie[2].replace("/", "");
    idMovie = idMovie.split("-");
    if (this.isLoaded === false) {
      this.getDataDetail(idMovie[0]);
      return (
        <Panel key="main">
          <Panel.Body>
            <div>Loading ...</div>
          </Panel.Body>
        </Panel>
      );
    } else {
      return (
        <Panel key="main">
          <Panel.Body>
            <div>{this.state.row}</div>
          </Panel.Body>
        </Panel>
      );
    }
  }
}
