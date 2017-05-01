# React Dropbox Javascript SDK Wrapper

Dropbox Javascript SDK: https://github.com/dropbox/dropbox-sdk-js

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
[See README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Setup

1. Create an app at https://www.dropbox.com/developers/apps
2. Create `.env.json` in project root. Add the following to it and save
  ```shell
  {
    "CLIENT_ID" : "<YOUR CLIENT ID>"
  }
  ```
3. Install yarn
4. Run `yarn`
5. Run `yarn start`


## Use Wrapper

1. Import wrapper component:
```shell
 import DropboxWrapper from 'react-dropbox-wrapper';`
 ```
2. Wrap a component by passing the component as an argument to `DropboxWrapper`. You can do this when you are exporting a react component class like so:
```javascript
class App extends React.Component {}
export default DropboxWrapper(App);
```


## Account Component

1. import `Account` from `react-dropbox-wrapper`;
2. Use in component render method like so:
```javascript
  <Account {...props} account={account} />
```
3. Account component will render a login link unless account is defined
4. Use the `login` function available in the props passed to the component provided to `DropboxWrapper` to fetch the account info and pass it as props to the Account component. example:
```javascript
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
        <Account {...this.props} account={account} />
      </div>
    );
  }
}

export default DropboxWrapper(App);
```