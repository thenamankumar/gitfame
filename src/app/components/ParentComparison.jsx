import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import ChildComparison from './ChildComparison';

class ParentComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReq: 'fetching',
      loaded: 0,
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState() {
    let mLoaded = this.state.loaded;
    mLoaded += 1;
    this.setState({ loaded: mLoaded });
    if (mLoaded === 2) {
      this.setState({ dataReq: 'fetched' });
    }
  }
  render() {
    console.log('Render Main Comparison View');
    const uname1 = this.props.match.params.username1;
    const uname2 = this.props.match.params.username2;
    return (
      <div>
        <div className="analytics-wrapper" style={{ display: this.state.dataReq === 'fetching' ? 'block' : 'none' }}>
          <Col sm={12} md={6} className="offset-md-3 stats-box">
            <h2 id="load-msg" className="animated fadeInDown">Fetching Data</h2>
            <Loader />
          </Col>
        </div>
        <div style={{ display: this.state.dataReq === 'fetching' ? 'none' : 'block' }}>
          <Row>
            <Col className="col-sm-6">
              <ChildComparison userid={uname1} userData={null} updateState={this.updateState} />
            </Col>
            <Col className="col-sm-6">
              <ChildComparison userid={uname2} userData={null} updateState={this.updateState} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ParentComparison;
