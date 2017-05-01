import React, { Component } from 'react';
import {
    login,
    logout,
    getAuthUrl,
} from './DropboxApiAdapters';

export default function DropboxWrapper(ChildComponent) {
  return class DropboxWrapper extends Component {
    render() {
        const props = {
            authUrl: getAuthUrl(),
            login,
            logout
        };
        return <ChildComponent {...this.props} {...props}/>
    }
  }
}