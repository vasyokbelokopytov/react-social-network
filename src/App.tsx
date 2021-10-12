import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { GlobalStateType } from './redux/redux-store';

import './App.css';

import { initialize, actions as appActions } from './redux/app-reducer';

import {
  selectGlobalError,
  selectIsInitialized,
} from './redux/selectors/app-selectors';

import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { ProfilePage } from './components/Profile/Profile';
import { UsersPage } from './components/Users/UsersPage';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
// import MessagesContainer from './components/Messages/MessagesContainer';
import { ChatPage } from './components/Chat/ChatPage';
import { LoginPage } from './components/Login/LoginPage';
import Loader from './components/common/Loader/Loader';
import NotFound from './components/NotFound/NotFound';
import ErrorBox from './components/ErrorBox/ErrorBox';

import { Layout } from 'antd';

const { Content } = Layout;

class App extends React.Component<PropsType> {
  handlePromiseErrors = (e: PromiseRejectionEvent) => {
    this.props.globalErrorChanged(e.reason);
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
      <Layout className="app">
        <Header />

        <Layout>
          <Navbar />

          <Content className="content">
            <Switch>
              <Route exact path="/" render={() => <Main />} />
              {/* <Route path="/messages" render={() => <MessagesContainer />} /> */}
              <Route path="/chat" render={() => <ChatPage />} />
              <Route path="/profile/:userId?" render={() => <ProfilePage />} />
              <Route path="/users" render={() => <UsersPage />} />
              <Route path="/news" render={() => <News />} />
              <Route path="/music" render={() => <Music />} />
              <Route path="/settings" render={() => <Settings />} />
              <Route path="/login" render={() => <LoginPage />} />
              <Route path="*" render={() => <NotFound />} />
            </Switch>
          </Content>
        </Layout>
        {this.props.globalError && <ErrorBox error={this.props.globalError} />}
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalStateType) => ({
  initialized: selectIsInitialized(state),
  globalError: selectGlobalError(state),
});

const connector = connect(mapStateToProps, {
  initialize,
  globalErrorChanged: appActions.globalErrorChanged,
});

type MappedPropsType = ConnectedProps<typeof connector>;
type OwnPropsType = {};
export type PropsType = MappedPropsType & OwnPropsType;

export default connector(App);
