import React from 'react';

const ShareScreen = props => {
  if (!props.show) {
    return null;
  }

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 50,
    zIndex: 100,
  };

  const imageStyle = {
    width: '100%',
    zIndex: 300,
  };

  const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 2,
    zIndex: 200,
    height: '100%',
    position: 'relative',
    overflowY: 'hidden',
  };

  const a = {
    maxWidth: '95vw',
    margin: '2 auto',
    position: 'absolute',
    height: '100%',
    overflowY: 'scroll',
  };

  const closeButtonStyle = {
    color: '#fff',
    backgroundColor: '#000',
    position: 'fixed',
    top: '5%',
    left: '5%',
    zIndex: 300,
  };

  return (
    <div style={backdropStyle} className="backdrop">
      <div style={modalStyle} className="modal">
        <div style={a}>
          <img src={props.data} alt="sc" style={imageStyle} />
        </div>
      </div>
      <button style={closeButtonStyle} onClick={props.onClose}>
        Close
      </button>
    </div>
  );
};

export default ShareScreen;
