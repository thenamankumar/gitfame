import React from 'react';
import IoAndroidClose from 'react-icons/lib/io/android-close';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaDownload from 'react-icons/lib/fa/download';

const ShareScreen = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="backdrop fade-background">
      <div className="modal screenshot-background">
        <button className="circle-btn close-btn" onClick={props.onClose}>
          <IoAndroidClose />
        </button>
        <div className="screenshot-img-container">
          <img src={props.data} alt="screenshot" className="screenshot-img" />
        </div>
        <h3>Screenshot captured.</h3>
        <p>Share it with your friends.</p>
        <br />
        <div>
          <button className="share-btn twitter">
            <FaTwitter /> Share on Twitter
          </button>
          <button className="share-btn fb">
            <FaFacebookOfficial /> Share on Facebook
          </button>
          <button className="share-btn download" onClick={props.download}>
            <FaDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareScreen;
