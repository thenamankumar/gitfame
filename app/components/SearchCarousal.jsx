import React, { Component } from 'react';
import uuid from 'uuid/v1';

const Card = ({ user: { username, pic, followers, issues, pullRequests, repos, bio }, idx, goToReport }) => (
  <div
    className="latest-card"
    id={`card-${idx}`}
    onClick={() => goToReport(username)}
    onKeyPress={() => goToReport(username)}
    tabIndex={0}
    role="button">
    <img src={pic} width="80" className="card-avatar" alt="avatar-pic" />
    <div className="latest-card-heading">&nbsp;&nbsp;{username}</div>
    <div className="latest-card-text-imp">{bio || ' '}</div>
    <div className="latest-card-text">
      <b>{issues}</b> Issues opened
    </div>
    <div className="latest-card-text">
      <b>{pullRequests.length}</b> PRs Opened
    </div>
    <div className="latest-card-text">
      <b>{followers}</b> Followers
    </div>
    <div className="latest-card-text">
      <b>{repos.length}</b> Repositories
    </div>
  </div>
);

class SearchCarousal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselCards: props.latestUsers.map((el, i) => ({
        id: `card-${i}`,
      })),
      currentIndex: 2,
    };

    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.intervalId = setInterval(this.goToNext, 2000);
  }

  componentDidMount() {
    this.state.carouselCards = this.state.carouselCards.map(el => {
      const element = document.getElementById(el.id);
      element.id = el.id;
      return element;
    });

    this.reRenderStyles(0);
  }

  componentWillReceiveProps(props) {
    this.setState(
      {
        carouselCards: props.latestUsers.map((el, i) => ({
          id: `card-${i}`,
        })),
        currentIndex: 2,
      },
      () => {
        this.state.carouselCards = this.state.carouselCards.map(el => {
          const element = document.getElementById(el.id);
          element.id = el.id;
          return element;
        });
      },
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  setTranslateY(idx, val) {
    this.state.carouselCards[idx].translateY = val;
  }

  setHeight(idx, h) {
    this.state.carouselCards[idx].height = h;
  }

  addTranslateX(idx, val) {
    this.state.carouselCards[idx].translateX = (this.state.carouselCards[idx].translateX || 0) + val;
  }

  reRenderStyles(factor) {
    const { currentIndex, carouselCards } = this.state;
    if (this.state.currentIndex < 2) {
      this.state.currentIndex = 2;
      return;
    }

    if (this.state.currentIndex > carouselCards.length) {
      for (let i = 0; i < carouselCards.length - 1; i += 1) {
        setTimeout(() => {
          this.state.currentIndex -= 1;
          this.reRenderStyles(-1);
        }, 500);
      }
      return;
    }

    for (let i = 0; i < carouselCards.length; i += 1) {
      const normalize = factor === -1 ? 1 : 0;
      if (i < currentIndex) {
        this.setHeight(i, 325);
        this.setTranslateY(i, 0);
        this.addTranslateX(i, -110 * factor);
      } else if (i === currentIndex - normalize) {
        this.setHeight(i, 325);
        this.setTranslateY(i, 0);
        this.addTranslateX(i, -11 * factor);
      } else if (i <= currentIndex + 1 - normalize) {
        this.setHeight(i, 239);
        this.setTranslateY(i, 20);
        this.addTranslateX(i, -11 * factor);
      } else if (i <= currentIndex + 2 - normalize) {
        this.setHeight(i, 142);
        this.setTranslateY(i, 72);
        this.addTranslateX(i, -11 * factor);
      } else if (i <= currentIndex + 3 - normalize) {
        this.setHeight(i, 142);
        this.setTranslateY(i, 72);
        this.addTranslateX(i, -11 * factor);
      } else {
        this.setHeight(i, 142);
        this.setTranslateY(i, 72);
        this.addTranslateX(i, -11 * factor);
      }

      const card = carouselCards[i];
      card.style.height = `${card.height}px`;
      card.style.transform = `translate(${card.translateX}%, ${card.translateY}%)`;
    }
  }

  goToPrev() {
    console.log(-1);
    this.state.currentIndex -= 1;
    this.reRenderStyles(-1);
  }

  goToNext() {
    console.log(1);
    this.reRenderStyles(1);
    this.state.currentIndex += 1;
  }

  render() {
    const { latestUsers, goToReport } = this.props;

    return (
      <div className="latest-search-carousal">
        <h2>Latest User Searches: </h2>
        <div className="latest-card-stack">
          {latestUsers.map((user, idx) => <Card key={uuid()} goToReport={goToReport} user={user} idx={idx} />)}
        </div>
        <div className="latest-card-stack-btn">
          <span className="prev" onClick={this.goToPrev} onKeyPress={this.goToPrev} tabIndex={0} role="button">
            &lt;&nbsp;Prev
          </span>
          &nbsp;|&nbsp;
          <span className="next" onClick={this.goToNext} onKeyPress={this.goToNext} tabIndex={0} role="button">
            Next&nbsp;&gt;
          </span>
        </div>
      </div>
    );
  }
}

export default SearchCarousal;
