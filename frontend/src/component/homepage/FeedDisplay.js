import React, { Component } from "react";

import axios from "axios";

class FeedDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie,
      user: this.props.user,
      rating: 1,
      ratedon: "",
      review: "",
      data: "",
      articles: []
    };
  }

  componentDidMount() {
    axios
      .get(
        " https://newsapi.org/v2/top-headlines?country=us&apiKey=65e249f7f1c64a4ab95d2f021ef2fe33"
      )
      .then(response => {
        console.log(response.data.articles);
        this.setState({ articles: response.data.articles });
      });
    // let response = axios.get(" https://newsapi.org/v2/top-headlines?country=us&apiKey=65e249f7f1c64a4ab95d2f021ef2fe33")
    //console.log(response.data)
  }

  render() {
    let l = 0;
    let news = this.state.articles.map(data => {
      return (
        <div>
          <h6>
            <b>{data.title}</b>
          </h6>
          <p>{data.publishedAt}</p>
        </div>
      );
    });
    let dis = this.state.articles.map(a => {
      l = l + 1;
      return (
        <div className={"Extra"}>
          <div className={"header"}>
            <img
              src={
                ` https://randomuser.me/api/portraits/thumb/men/` + l + `.jpg`
              }
              alt="..."
            />
            <div>
              <h4>{a.author}</h4>
              <br />
              <h6>Software Engineering</h6>
            </div>
          </div>
          <div className={"body"}>
            <img src={a.urlToImage} alt="..." />
            {a.description}
          </div>

          <div className={"footer"}>
            <hr />
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-hand-left" /> Like
            </button>
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-share-alt" /> Comment
            </button>
            <button type="button" className="btn btn-default btn-sm">
              <span className="glyphicon glyphicon-share-alt" /> Share
            </button>
          </div>
        </div>
      );
    });

    return (
      <div className={"Ex"}>
        <div className={"Profile"}>
          <div>
            <img
              src={
                ` https://randomuser.me/api/portraits/thumb/men/` + 1 + `.jpg`
              }
              alt="..."
            />
          </div>
          <div className={"title"}>
            <b>RaviTeja Kommalapati</b>
            <br />
            Actively Looking for summer internships 2019 Summer
          </div>
          <hr />
          <div className={"title"}>
            viewd your profile 444
            <br />
            views of your post 622
            <br />
          </div>
          <hr />
          <div className={"title"}>See all Premium features</div>
        </div>
        <div className={"feed"}> {dis}</div>
        <div className={"News"}>{news}</div>
      </div>
    );
  }
}

export default FeedDisplay;
