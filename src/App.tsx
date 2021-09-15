import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalStateType } from './redux/redux-store';

import './App.css';

import { initialize, actions as appActions } from './redux/app-reducer';

import {
  selectGlobalError,
  selectInitialized,
} from './redux/selectors/app-selectors';

import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import MessagesContainer from './components/Messages/MessagesContainer';
import LoginContainer from './components/Login/LoginContainer';
import Loader from './components/common/Loader/Loader';
import NotFound from './components/NotFound/NotFound';
import ErrorBox from './components/ErrorBox/ErrorBox';

class App extends React.Component<PropsType> {
  handlePromiseErrors = (e: PromiseRejectionEvent) => {
    this.props.setGlobalError(e.reason);
  };

  componentDidMount() {
    this.props.initialize();
    window.addEventListener('unhandledrejection', this.handlePromiseErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handlePromiseErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Loader className="loader" />;
    }

    return (
      <div className="wrapper">
        <HeaderContainer />
        <Navbar />
        <main className="main">
          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route path="/messages" render={() => <MessagesContainer />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/login" render={() => <LoginContainer />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </main>

        {this.props.globalError && <ErrorBox error={this.props.globalError} />}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalStateType) => ({
  initialized: selectInitialized(state),
  globalError: selectGlobalError(state),
});

const connector = connect(mapStateToProps, {
  initialize,
  setGlobalError: appActions.setGlobalError,
});

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnPropsType = {};
export type PropsType = MappedPropsType & OwnPropsType;

export default connector(App);
