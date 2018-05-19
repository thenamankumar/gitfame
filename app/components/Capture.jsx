import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import ShareScreen from './ShareScreen';

class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      isOpen: false,
    };
    this.takeScreenshot = this.takeScreenshot.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  takeScreenshot() {
    const h = this;
    html2canvas(document.body).then(canvas => {
      const imgURI = canvas.toDataURL();
      h.setState({
        img: imgURI,
      });
      this.toggleModal();
    });
  }

  render() {
    const style = {
      position: 'fixed',
      right: '5%',
      bottom: '5%',
      zIndex: 100,
      background: '#000',
    };
    return (
      <div>
        <Button style={style} onClick={this.takeScreenshot}>
          Capture
        </Button>
        <ShareScreen show={this.state.isOpen} onClose={this.toggleModal} data={this.state.img} />
      </div>
    );
  }
}

export default Capture;
