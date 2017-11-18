import React from 'react';

class App extends React.Component {
  gets() {
    const a = this.file;
    return a + 1;
  }
  render() {
    return (
      <h1 className="title">Hello World</h1>
    );
  }
}

export default App;
