import React from 'react';
import uuid from 'uuid/v1';
import { Grid, Row, Col } from 'react-bootstrap';
import { Doughnut, Radar } from 'react-chartjs-2';

const legend = {
  display: false,
};

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
        <Row className="content">
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag total">
              <Row className="center slim">
                <Col className="value">
                  <h2>{user.commits}</h2>
                  <p className="name">Commits</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag forked">
              <Row className="center slim">
                <Col className="value">
                  <h2>{user.commitsForked}</h2>
                  <p className="name">Commits</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row className="center slim">
                <Col className="value">
                  <h2>{user.commitsOwned}</h2>
                  <p className="name">Commits</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row className="center slim">
                <Col className="value">
                  <h2>{user.stars}</h2>
                  <p className="name">Stars</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row className="center slim">
                <Col className="value">
                  <h2>{user.forks}</h2>
                  <p className="name">Forks</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2} className="card-wrap">
            <div className="card tag owned">
              <Row className="center slim">
                <Col className="value">
                  <h2>{user.watchers}</h2>
                  <p className="name">Watchers</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="content">
          <Col xs={12} sm={12} md={6} className="card-wrap">
            <div className="card tag total">
              <Row>
                <h4 className="under">Commits by Repository</h4>
              </Row>
              <Row className="center">
                <Col xs={7} sm={7}>
                  <Doughnut
                    width={250}
                    height={250}
                    data={user.commitsPerRepo}
                    legend={legend}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </Col>
                <Col xs={5} sm={5}>
                  <ul className="labels-list">
                    {(user.commitsPerRepo.labels || []).map((label, index) => (
                      <li key={uuid()} className="labels-list-item">
                        <div className={`bullet color-${index + 1}`} />
                        {label.split('/')[1] || (index === 10 && 'Others')}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} className="card-wrap">
            <div className="card tag total">
              <Row>
                <h4 className="under">Stars by Repository</h4>
              </Row>
              <Row className="center">
                <Col xs={7} sm={7}>
                  <Doughnut
                    width={250}
                    height={250}
                    data={user.starsPerRepo}
                    legend={legend}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </Col>
                <Col xs={5} sm={5}>
                  <ul className="labels-list">
                    {(user.starsPerRepo.labels || []).map((label, index) => (
                      <li key={uuid()} className="labels-list-item">
                        <div className={`bullet color-${index + 1}`} />
                        {label.split('/')[1] || (index === 10 && 'Others')}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>
      <section>
        <h3 className="section-head under">
          I work on{' '}
          <spam
            style={{
              color: user.topLanguage.color,
            }}>
            {user.topLanguage.name}
          </spam>{' '}
          the most
        </h3>
        <Row className="content">
          <Col xs={12} sm={12} md={6} className="card-wrap">
            <div className="card tag total">
              <Row>
                <h4 className="under">Repositories by Language</h4>
              </Row>
              <Row className="center">
                <Col xs={7} sm={7}>
                  <Radar
                    width={250}
                    height={250}
                    data={user.reposPerLanguage}
                    legend={legend}
                    options={{
                      scale: {
                        gridLines: { color: 'white' },
                        angleLines: { color: 'white' },
                        pointLabels: {
                          fontSize: 12,
                          fontColor: 'white',
                          fontFamily: "'Arimo', sans-serif",
                        },
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                </Col>
                <Col xs={5} sm={5}>
                  <ul className="labels-list">
                    <li className="labels-list-item">
                      <div className="bullet color-owned" />
                      Owned
                    </li>
                    <li className="labels-list-item">
                      <div className="bullet color-forked" />
                      Forked
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>
    </Grid>
  </React.Fragment>
);

export default Analytics;
