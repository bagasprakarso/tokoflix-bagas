import React, { Component } from "react";
import { Panel } from "react-bootstrap/lib";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";

export default class Content extends Component {
  state = {
    apiKey: "?api_key=952881c1a8d0f4b3e98d6063f868ed4d",
    movieUrl: "https://api.themoviedb.org/3/movie",
    moviesData: [],
    nowPlaying: [],
    detail: [],
    imgPathW200: "https://image.tmdb.org/t/p/w200/",
    imgPathW300: "https://image.tmdb.org/t/p/w300/",
    price: 0,
    row: [],
    title: "Now Playing",
    collection: [],
    isDetail: false,
    initialLoad: true,
    hasMore: true
    // param: ""
  };

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.param = "";
    this.page = 0;
    this.row = [];
    this.col = [];
  }

  componentDidMount() {
    console.log("this.props content: ", this.props);
  }

  getData(page, param, title) {
    console.log("getData");

    this.setState({ initialLoad: false });

    if (param === undefined && this.param === "") {
      this.param = "now_playing";
    } else if (page === -1) {
      this.setState({ hasMore: true });
      this.param = param;
      this.row = [];
      this.col = [];
    }
    if (page === -1) {
      this.page = 0;
      page = 1;
    }
    const urlNowPlaying =
      this.state.movieUrl +
      "/" +
      this.param +
      this.state.apiKey +
      "&language=en_US&region=ID&page=" +
      page;
    if (page <= this.page || this.page === 0) {
      axios.get(urlNowPlaying).then(response => {
        this.setState({
          nowPlaying: response.data,
          title: title,
          isDetail: false
        });
        this.page = this.state.nowPlaying.total_pages;

        this.createContent();
      });
    } else {
      this.setState({ hasMore: false });
    }
  }

  createContent() {
    const lData = this.state.nowPlaying.results.length;
    const data = this.state.nowPlaying.results;

    let index = 0;

    // Outer loop to create parent
    for (let i = 0; i < Math.ceil(lData / 4); i++) {
      this.col = [];
      // Inner loop to create children
      for (let j = 0; j < 4; j++) {
        if (index === lData) {
          break;
        }
        const detail = data[index];
        this.col.push(this.createContentMain(detail, j));
        index++;
      }

      // Create the parent and add the children

      this.row.push(
        <div className="row" key={this.row.length}>
          {this.col}
        </div>
      );
    }

    this.setState({ row: this.row });
  }

  createContentMain(detail, j) {
    let slug = detail.title.split(" ");
    slug = slug.join("-");
    let shortDesc = detail.overview.substring(0, 75);
    if (detail.overview === "") {
      shortDesc = "belum ada sinopsis cerita dalam Bahasa Indonesia"
    }
    
    return (
      <div className="col-sm-3" key={detail.id} align="center">
        <Panel>
          <Panel.Body>
            <div style={{ height: "450px" }}>
              <img
                className="card-img-top"
                src={
                  detail.poster_path
                    ? this.state.imgPathW200 + detail.poster_path
                    : "./no_image.jpg"
                }
                alt={detail.original_title}
                style={{ height: "278px" }}
              />
              <h4 style={{ height: "30px" }}>
                {detail.title +
                  " (" +
                  detail.release_date.substring(0, 4) +
                  ")"}
              </h4>
              <div style={{ borderBottom: "1px solid gray" }} />
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
              <div style={{ borderBottom: "1px solid gray" }} />
              <div
                style={{
                  textAlign: "left",
                  padding: 2,
                  height: "55px"
                }}
              >
                <span>
                  <small>
                    {shortDesc.substring(
                      0,
                      Math.min(shortDesc.length, shortDesc.lastIndexOf(" "))
                    )}{" "}
                     ...
                    <Link to={"/" + detail.id + "-" + slug}> selengkapnya</Link>
                  </small>
                </span>
              </div>
              <div style={{ borderBottom: "1px solid gray" }} />
            </div>
          </Panel.Body>
        </Panel>
      </div>
    );
  }

  render() {
    return (
      <Panel>
        <Panel.Body>
          <div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getData}
              hasMore={this.state.hasMore}
              initialLoad={this.state.initialLoad}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.state.row}
            </InfiniteScroll>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}
