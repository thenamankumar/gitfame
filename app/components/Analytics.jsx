import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Analytics = ({ user }) => (
  <React.Fragment>
    <Grid>
      <section>
        <Row xs={12} sm={12} className="content">
          <Col xs={12} sm={12} md={6} className="user-bio">
            <div className="user-pic-box">
              <div className="user-pic-bg">
                <img src={user.avatar_url} alt={`Github user ${user.login} pic`} className="user-pic" />
              </div>
            </div>
            <div className="user-details">
              <a href={user.html_url} target="_blank">
                <h2 className="user-name">{user.login}</h2>
              </a>
              <p className="bio">{user.bio}</p>
            </div>
          </Col>
        </Row>
      </section>
      <section>
        <h3 className="section-head under">
          I own <span className="own-repo-count">{user.own_repos}</span> and forked{' '}
          <span className="forked-repo-count">{user.public_repos - user.own_repos} </span>
          repositories
        </h3>
        <Row xs={12} sm={12} className="content">
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag total">
              <Row>
                <Col className="value">
                  <h2>{user.commits}</h2>
                  <p className="name">Commits</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row>
                <Col className="value">
                  <h2>{user.stars}</h2>
                  <p className="name">Stars</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row>
                <Col className="value">
                  <h2>{user.forks}</h2>
                  <p className="name">Forks</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row>
                <Col className="value">
                  <h2>{user.watchers}</h2>
                  <p className="name">Watchers</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row xs={12} sm={12} className="content">
          <Col xs={12} sm={12} md={3} className="card-wrap">
            <div className="card">
              <Row />
            </div>
          </Col>
        </Row>
      </section>
    </Grid>
  </React.Fragment>
);

export default Analytics;
