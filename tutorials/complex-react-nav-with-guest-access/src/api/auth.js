import React from 'react';
import { AsyncStorage } from 'react-native';

const defaultState = {
  checkedAuth: false,
  isLoggedIn: false,
};

export const AUTH_KEY = 'auth-demo-key';

const AuthContext = React.createContext(defaultState);

export const Consumer = AuthContext.Consumer;

export class Provider extends React.Component {
  state = defaultState;

  componentDidMount() {
    AsyncStorage.getItem('authData')
      .then((state) => {
        this.setState({
          ...JSON.parse(state),
          checkedAuth: true,
        });
      });
  }

  componentDidUpdate() {
    AsyncStorage.setItem('authData', JSON.stringify({ ...this.state, checkedAuth: false }));
  }

  createAccount = () => new Promise((resolve) => {
    this.setState({ isLoggedIn: true, checkedAuth: true }, () => resolve());
  })

  logIn = () => new Promise((resolve) => {
    this.setState({ isLoggedIn: true, checkedAuth: true }, () => resolve());
  });

  logOut = () => new Promise((resolve) => {
    this.setState({ ...defaultState, checkedAuth: true }, () => resolve());
  })

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          createAccount: this.createAccount,
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
