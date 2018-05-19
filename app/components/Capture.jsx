import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import IoAndroidCamera from 'react-icons/lib/io/android-camera';
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
    this.saveAs = this.saveAs.bind(this);
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

  saveAs() {
    const file = new Blob(this.state.img, { type: 'image/png' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  render() {
    return (
      <div>
        <button onClick={this.takeScreenshot} className="circle-btn capture-btn">
          <IoAndroidCamera />
        </button>
        <ShareScreen show={this.state.isOpen} onClose={this.toggleModal} data={this.state.img} download={this.saveAs} />
      </div>
    );
  }
}

export default Capture;
