import React, { Component } from "react";
import { Panel, Button, Glyphicon } from "react-bootstrap/lib";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

export default class ContentDetail extends Component {
  state = {
    apiKey: "?api_key=952881c1a8d0f4b3e98d6063f868ed4d",
    movieUrl: "https://api.themoviedb.org/3/movie",
    imgPathW185: "https://image.tmdb.org/t/p/w185/",
    imgPathW300: "https://image.tmdb.org/t/p/w300/",
    row: [],
    paidElement: []
  };

  constructor(props) {
    super(props);
    this.col = [];
    this.isLoaded = false;
    this.reponseData = [];
    this.handleOnDragStart = e => e.preventDefault();
    this.similarMovies = [];
    this.recomendationsMovies = [];
    this.responsive = { 0: { items: 2 } };
    this.url = "";
  }

  componentDidUpdate() {
    if (this.url !== this.props.match.url) {
      let idMovie = this.props.match.url.split("/");
      idMovie = idMovie[2].replace("/", "");
      idMovie = idMovie.split("-");
      this.isLoaded = false;
      this.getDataDetail(idMovie[0]);
    }
  }
  componentWillUpdate() {
    this.url = this.props.match.url;
  }

  getDataDetail(id) {
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

  getCastGenres(data, department) {
    if (department) {
      data = data.filter(data => data.department === department);
    }

    let length = 20;
    if (data.length < length) {
      length = data.length;
    }
    let _data = "";

    for (let i = 0; i < length; i++) {
      _data = _data + ", " + data[i].name;
    }
    return _data.replace(",", "");
  }

  getSimilarRecommendations(detail, type) {
    let movies = [];
    for (let i = 0; i < detail.length; i++) {
      let slug = detail[i].title.split(" ");
      slug = slug.join("-");
      let shortDesc = detail[i].title.substring(0, 14);
      shortDesc.substring(
        0,
        Math.min(shortDesc.length, shortDesc.lastIndexOf(" "))
      );
      shortDesc = shortDesc + "..";
      movies.push(
        <div key={detail[i].id}>
          <Link to={"/detail/" + detail[i].id + "-" + slug} key={detail[i].id}>
            <img
              key={detail[i]}
              src={this.state.imgPathW185 + detail[i].backdrop_path}
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
                <Glyphicon glyph="star" /> {detail[i].vote_average}
              </div>
            </div>
          </Link>
        </div>
      );
    }
    if (type === "similar") {
      this.similarMovies = [];
      this.similarMovies = movies;
    } else if (type === "recommendations") {
      this.recomendationsMovies = [];
      this.recomendationsMovies = movies;
    }
  }

  createContentDetail() {
    const detail = this.reponseData;
    this.getSimilarRecommendations(detail.similar.results, "similar");
    this.getSimilarRecommendations(
      detail.recommendations.results,
      "recommendations"
    );
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
                    <h4 align="justify">Produser:</h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "00px"
                      }}
                    >
                      {this.getCastGenres(detail.credits.crew, "Production")}
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
                    <h4 align="justify">Sutradara:</h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "00px"
                      }}
                    >
                      {this.getCastGenres(detail.credits.crew, "Directing")}
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
                    <h4 align="justify">Penulis:</h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "010px"
                      }}
                    >
                      {this.getCastGenres(detail.credits.crew, "Writing")}
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
                    <h4 align="justify">Produksi:</h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      {this.getCastGenres(detail.production_companies)}
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
                    <h4 align="justify">Genre:</h4>
                  </div>
                  <div className="col-md-10">
                    <p
                      align="justify"
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      {this.getCastGenres(detail.genres)}
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
                      {this.getCastGenres(detail.credits.cast)}
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
    this.setState({
      paidElement: this.props.paidElement
    });
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
