import React from 'react';
import uuid from 'uuid/v1';
import { Grid, Row, Col } from 'react-bootstrap';
import { Doughnut, Bar, Radar } from 'react-chartjs-2';
import { TiHeart } from 'react-icons/lib/ti';
import Animate from './Animate';

const legend = {
  display: false,
};

const ifValid = (condition, result, error) => (condition ? result : error);

const findColor = (languages, search = '') => (languages.find(({ name }) => name === search) || {}).color || '#ef4e7b';
const mostIndex = data =>
  data.reduce((most, now, index) => {
    if (now > data[most]) {
      return index;
    }
    return most;
  }, 0);
const popularLang = (data, labels, languages) => {
  const index = mostIndex(data);

  return (
    <span
      style={{
        color: findColor(languages, labels[index]),
      }}>
      {labels[index]}
    </span>
  );
};

const barGraphOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          color: 'white',
        },
        scaleLabel: {
          display: false,
          labelString: 'Repositories',
          fontSize: 14,
          fontColor: '#7887a7',
          fontFamily: "'Arimo', sans-serif",
        },
        ticks: {
          fontFamily: "'Arimo', sans-serif",
          fontColor: 'white',
          fontSize: 12,
          beginAtZero: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          color: 'white',
        },
        scaleLabel: {
          display: false,
          labelString: 'Count',
          fontSize: 14,
          fontColor: '#7887a7',
          fontFamily: "'Arimo', sans-serif",
        },
        ticks: {
          fontFamily: "'Arimo', sans-serif",
          fontColor: 'white',
          fontSize: 12,
          beginAtZero: false,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

const barGraphOptionsStacked = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          color: 'white',
        },
        scaleLabel: {
          display: false,
          labelString: 'Repositories',
          fontSize: 14,
          fontColor: '#7887a7',
          fontFamily: "'Arimo', sans-serif",
        },
        ticks: {
          fontFamily: "'Arimo', sans-serif",
          fontColor: 'white',
          fontSize: 12,
          beginAtZero: false,
        },
        stacked: true,
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          color: 'white',
        },
        scaleLabel: {
          display: false,
          labelString: 'Count',
          fontSize: 14,
          fontColor: '#7887a7',
          fontFamily: "'Arimo', sans-serif",
        },
        ticks: {
          fontFamily: "'Arimo', sans-serif",
          fontColor: 'white',
          fontSize: 12,
          beginAtZero: false,
        },
        stacked: true,
      },
    ],
  },
  maintainAspectRatio: false,
};

const renderPinnedRepos = repos => {
  const row1 = [];
  const row2 = [];
  (repos || []).forEach((repo, index) => {
    const card = (
      <Col xs={12} sm={12} md={4} className="card-wrap" key={uuid()}>
        <div className={`card tag ${repo.isFork ? 'forked' : 'owned'}`}>
          <Row className="center mt-10">
            <h4 className="under wrap-title">
              <a href={repo.url} target="_blank">
                {repo.owner}/{repo.name}{' '}
              </a>
            </h4>
          </Row>
          <Row className="center slim-mid">
            <Col xs={4} sm={4} className="value">
              <h2>{repo.userCommits}</h2>
              <p className="name">Commits</p>
            </Col>
            <Col xs={4} sm={4} className="value">
              <h2>{repo.stars}</h2>
              <p className="name">Stars</p>
            </Col>
            <Col xs={4} sm={4} className="value">
              <h2>{repo.forks}</h2>
              <p className="name">Forks</p>
            </Col>
          </Row>
          {repo.mainLanguage ? (
            <Row className="center slim">
              <p className="mid-text">
                The main language is{' '}
                <span style={{ color: repo.mainLanguage.color || 'white' }}>{repo.mainLanguage.name}</span>
              </p>
            </Row>
          ) : (
            ''
          )}
        </div>
      </Col>
    );
    if (index < 3) {
      row1.push(card);
    } else {
      row2.push(card);
    }
  });

  return (
    <React.Fragment>
      {row1.length && <Row className="content">{row1}</Row>}
      {row2.length && <Row className="content">{row2}</Row>}
    </React.Fragment>
  );
};

class Analytics extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { user } = this.props;

    return (
      nextProps.user.status !== user.status ||
      nextProps.user.username !== user.username ||
      nextProps.user.time !== user.time
    );
  }

  render() {
    const { user } = this.props;

    const mostOwnedLang = mostIndex(user.reposPerLanguageByType.datasets[0].data);
    const mostForkedLang = mostIndex(user.reposPerLanguageByType.datasets[1].data);

    let ownedVsForkedResult;

    if (mostOwnedLang === mostForkedLang) {
      ownedVsForkedResult = (
        <React.Fragment>
          {popularLang(
            user.reposPerLanguageByType.datasets[0].data,
            user.reposPerLanguageByType.labels,
            user.languageStat,
          )}{' '}
          is most present among both owned and forked repos.
        </React.Fragment>
      );
    } else {
      ownedVsForkedResult = (
        <React.Fragment>
          {popularLang(
            user.reposPerLanguageByType.datasets[0].data,
            user.reposPerLanguageByType.labels,
            user.languageStat,
          )}{' '}
          is popular among owned and{' '}
          {popularLang(
            user.reposPerLanguageByType.datasets[1].data,
            user.reposPerLanguageByType.labels,
            user.languageStat,
          )}{' '}
          among forked repos.
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Animate name="fadeIn" timeout={1500}>
          <Grid className="animated slow">
            <section>
              <Row className="content">
                <Col xs={12} sm={12} md={6} className="user-bio">
                  <div className="user-pic-box">
                    <div className="user-pic-bg">
                      <img src={user.pic} alt={`Github user ${user.username} pic`} className="user-pic" />
                    </div>
                  </div>
                  <div className="user-details">
                    <a href={user.url} target="_blank">
                      <h2 className="user-name">{user.username}</h2>
                    </a>
                    <p className="bio">{user.bio}</p>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <Row className="right">
                    <Col xs={2} sm={2} className="text-center">
                      <h2>{user.followers}</h2>
                      <p className="name mid-text">Followers</p>
                    </Col>
                    <Col xs={2} sm={2} className="text-center">
                      <h2>{user.following}</h2>
                      <p className="name mid-text">Following</p>
                    </Col>
                    <Col xs={2} sm={2} className="text-center">
                      <h2>{user.publicRepos}</h2>
                      <p className="name mid-text">Repos</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
            <section>
              <h3 className="section-head under">
                I <TiHeart className="heart" /> open source
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
                <Col xs={12} sm={12} md={2} className="card-wrap">
                  <div className="card tag total">
                    <Row className="center slim">
                      <Col className="value">
                        <h2>{user.issues || 0}</h2>
                        <p className="name">Issues Opened</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={2} className="card-wrap">
                  <div className="card tag forked">
                    <Row className="center slim">
                      <Col className="value">
                        <h2>{user.prsForked}</h2>
                        <p className="name">PRs Opened</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={2} className="card-wrap">
                  <div className="card tag forked">
                    <Row className="center slim">
                      <Col className="value">
                        <h2>{user.prsForkedMerged}</h2>
                        <p className="name">PRs Merged</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={2} className="card-wrap">
                  <div className="card tag forked">
                    <Row className="center slim">
                      <Col className="value">
                        <h2>{user.prsForkedClosed}</h2>
                        <p className="name">PRs Closed</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={2} className="card-wrap">
                  <div className="card tag forked">
                    <Row className="center slim">
                      <Col className="value">
                        <h2>
                          {// eslint-disable-next-line
                          user.prsForkedAvgMergeTime < 60
                            ? `${Math.round(user.prsForkedAvgMergeTime)} M`
                            : user.prsForkedAvgMergeTime < 60 * 24
                              ? `${Math.round(user.prsForkedAvgMergeTime / 60)} H`
                              : `${Math.round(user.prsForkedAvgMergeTime / (60 * 24))} D`}
                        </h2>
                        <p className="name">Avg Merge Time</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={2} className="card-wrap">
                  <div className="card tag forked">
                    <Row className="center slim">
                      <Col className="value">
                        <h2>{(user.prsForkedCommits / user.prsForked).toFixed(0)}</h2>
                        <p className="name">Avg Commits / PR</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </section>
            <section>
              <h3 className="section-head under">
                I own <span className="own-repo-count">{user.ownRepos}</span> and forked{' '}
                <span className="forked-repo-count">{user.publicRepos - user.ownRepos} </span>
                repositories
              </h3>
              <Row className="content">
                <Col xs={12} sm={12} md={6} className="card-wrap">
                  <div className="card tag total">
                    <Row>
                      <h4 className="under">Commits by Repo</h4>
                    </Row>
                    {ifValid(
                      user.commitsPerRepo.labels.length,
                      [
                        <Row key={uuid()} className="center">
                          <p className="text-center mid-text">
                            Most commits are done in{' '}
                            <span
                              style={{
                                color: 'white',
                              }}>
                              {user.commitsPerRepo.labels[0]}
                            </span>
                          </p>
                        </Row>,
                        <Row key={uuid()} className="center">
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
                          <Col xs={5} sm={5} className="labels-list-wrap">
                            <ul className="labels-list">
                              {(user.commitsPerRepo.labels || []).map((label, index) => (
                                <li key={uuid()} className="labels-list-item">
                                  <div className={`bullet color-${index + 1}`} />
                                  {label.split('/')[1] || (index === 10 && 'Others')}
                                </li>
                              ))}
                            </ul>
                          </Col>
                        </Row>,
                      ],
                      [
                        <Row key={uuid()} className="center">
                          <h3 className="text-center">Not enough data to analyze</h3>
                        </Row>,
                        <Row key={uuid()} className="center" />,
                      ],
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6} className="card-wrap">
                  <div className="card tag owned">
                    <Row>
                      <h4 className="under">Popular Repos</h4>
                    </Row>
                    {ifValid(
                      user.popularReposOwned.labels.length,
                      [
                        <Row key={uuid()} className="center">
                          <Col xs={6} sm={6} className="text-center">
                            <div className="bullet color-1" />
                            Stars
                          </Col>
                          <Col xs={6} sm={6} className="text-center">
                            <div className="bullet color-2" />
                            Forks
                          </Col>
                        </Row>,
                        <Row key={uuid()} className="center">
                          <Col xs={12} sm={12}>
                            <Bar
                              width={250}
                              height={250}
                              data={user.popularReposOwned}
                              legend={legend}
                              options={barGraphOptions}
                            />
                          </Col>
                        </Row>,
                      ],
                      [
                        <Row key={uuid()} className="center">
                          <h3 className="text-center">Not enough data to analyze</h3>
                        </Row>,
                        <Row key={uuid()} className="center" />,
                      ],
                    )}
                  </div>
                </Col>
              </Row>
            </section>
            {user.pinnedReposData.length ? (
              <section>
                <h3 className="section-head under">My great works</h3>
                {renderPinnedRepos(user.pinnedReposData)}
              </section>
            ) : (
              ''
            )}
            <section>
              <h3 className="section-head under">
                I work on{' '}
                <span
                  style={{
                    color: user.topLanguage.color,
                  }}>
                  {user.topLanguage.name}
                </span>{' '}
                the most
              </h3>
              <Row className="content">
                <Col xs={12} sm={12} md={6} className="card-wrap">
                  <div className="card tag total">
                    <Row>
                      <h4 className="under">Owned vs Forked Repos By Language</h4>
                    </Row>
                    {ifValid(
                      user.reposPerLanguageByType.labels.length,
                      [
                        <Row key={uuid()} className="center">
                          <Col xs={7} sm={7}>
                            <Radar
                              width={250}
                              height={250}
                              data={user.reposPerLanguageByType}
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
                          <Col xs={5} sm={5} className="labels-list-wrap">
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
                        </Row>,
                        <Row key={uuid()} className="center slim">
                          <p className="text-center mid-text">{ownedVsForkedResult}</p>
                        </Row>,
                      ],
                      [
                        <Row key={uuid()} className="center">
                          <h3 className="text-center">Not enough data to analyze</h3>
                        </Row>,
                        <Row key={uuid()} className="center" />,
                      ],
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6} className="card-wrap">
                  <div className="card tag total">
                    <Row>
                      <h4 className="under">Repos Count by Language</h4>
                    </Row>
                    {ifValid(
                      user.reposPerLanguageTotal.labels.length,
                      [
                        <Row key={uuid()} className="center">
                          <Col xs={7} sm={7}>
                            <Doughnut
                              width={250}
                              height={250}
                              data={user.reposPerLanguageTotal}
                              legend={legend}
                              options={{
                                maintainAspectRatio: false,
                              }}
                            />
                          </Col>
                          <Col xs={5} sm={5} className="labels-list-wrap">
                            <ul className="labels-list">
                              {(user.reposPerLanguageTotal.labels || []).map((label, index) => (
                                <li key={uuid()} className="labels-list-item">
                                  <div className={`bullet color-${index + 1}`} />
                                  {label}
                                </li>
                              ))}
                            </ul>
                          </Col>
                        </Row>,
                        <Row key={uuid()} className="slim center">
                          <p className="text-center mid-text">
                            <span
                              style={{
                                color: findColor(user.languageStat, user.reposPerLanguageTotal.labels[0]),
                              }}>
                              {user.reposPerLanguageTotal.labels[0]}
                            </span>{' '}
                            is the most present language,{user.reposPerLanguageTotal.labels[1] && (
                              <React.Fragment>
                                followed by{' '}
                                <span
                                  style={{
                                    color: findColor(user.languageStat, user.reposPerLanguageTotal.labels[1]),
                                  }}>
                                  {user.reposPerLanguageTotal.labels[1]}
                                </span>
                                {user.reposPerLanguageTotal.labels[2] && (
                                  <React.Fragment>
                                    {' '}
                                    and{' '}
                                    <span
                                      style={{
                                        color: findColor(user.languageStat, user.reposPerLanguageTotal.labels[2]),
                                      }}>
                                      {user.reposPerLanguageTotal.labels[2]}
                                    </span>
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            )}.
                          </p>
                        </Row>,
                      ],
                      [
                        <Row key={uuid()} className="center">
                          <h3 className="text-center">Not enough data to analyze</h3>
                        </Row>,
                        <Row key={uuid()} className="center" />,
                      ],
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="content">
                <Col xs={12} sm={12} md={6} className="card-wrap">
                  <div className="card tag owned">
                    <Row>
                      <h4 className="under">Stars by Language</h4>
                    </Row>
                    {ifValid(
                      user.starsPerLanguageOwned.labels.length,
                      [
                        <Row key={uuid()} className="center">
                          <Col xs={7} sm={7}>
                            <Doughnut
                              width={250}
                              height={250}
                              data={user.starsPerLanguageOwned}
                              legend={legend}
                              options={{
                                maintainAspectRatio: false,
                              }}
                            />
                          </Col>
                          <Col xs={5} sm={5} className="labels-list-wrap">
                            <ul className="labels-list">
                              {(user.starsPerLanguageOwned.labels || []).map((label, index) => (
                                <li key={uuid()} className="labels-list-item">
                                  <div className={`bullet color-${index + 1}`} />
                                  {label}
                                </li>
                              ))}
                            </ul>
                          </Col>
                        </Row>,
                        <Row key={uuid()} className="slim center">
                          <p className="text-center mid-text">
                            Owned repos with language{' '}
                            <span
                              style={{
                                color: findColor(user.languageStat, user.starsPerLanguageOwned.labels[0]),
                              }}>
                              {user.starsPerLanguageOwned.labels[0]}
                            </span>{' '}
                            have most stars.
                          </p>
                        </Row>,
                      ],
                      [
                        <Row key={uuid()} className="center">
                          <h3 className="text-center">Not enough data to analyze</h3>
                        </Row>,
                        <Row key={uuid()} className="center" />,
                      ],
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6} className="card-wrap">
                  <div className="card tag owned">
                    <Row>
                      <h4 className="under">Repos Count By Sub vs Main Language</h4>
                    </Row>
                    {ifValid(
                      user.reposPerLanguageOwnedTotalMain.labels.length,
                      [
                        <Row key={uuid()}>
                          <Col xs={6} sm={6} className="text-center">
                            <div className="bullet color-1" />
                            Sub Language
                          </Col>
                          <Col xs={6} sm={6} className="text-center">
                            <div className="bullet color-2" />
                            Main Language
                          </Col>
                        </Row>,
                        <Row key={uuid()} className="center">
                          <Col xs={12} sm={12}>
                            <Bar
                              data={user.reposPerLanguageOwnedTotalMain}
                              legend={legend}
                              options={barGraphOptionsStacked}
                            />
                          </Col>
                        </Row>,
                        <Row key={uuid()} className="center slim">
                          <p className="text-center mid-text">
                            {popularLang(
                              user.reposPerLanguageOwnedTotalMain.datasets[1].data,
                              user.reposPerLanguageOwnedTotalMain.labels,
                              user.languageStat,
                            )}{' '}
                            is the main language for most owned repos.
                          </p>
                        </Row>,
                      ],
                      [
                        <Row key={uuid()} className="center">
                          <h3 className="text-center">Not enough data to analyze</h3>
                        </Row>,
                        <Row key={uuid()} className="center" />,
                      ],
                    )}
                  </div>
                </Col>
              </Row>
            </section>
          </Grid>
        </Animate>
      </React.Fragment>
    );
  }
}

export default Analytics;
