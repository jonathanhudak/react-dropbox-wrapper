import React, { Component } from 'react';
import './App.css';
import DropboxWrapper from './Dropbox';
import Account from './Account.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      account: null
    };
  }
  componentDidMount() {
    this.props.login().then(account => {
      this.setState({ account });
    })
  }
  render() {
    const { account } = this.state;
    
    return (
      <div className="App">
        <Account {...{...this.props, account}} />
      </div>
    );
  }
}

export default DropboxWrapper(App);
