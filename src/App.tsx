import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { initializeApp, actions as appActions } from './redux/app-reducer';

import {
  selectInitializingError,
  selectIsAppInitialized,
  selectIsInitializing,
  selectUnhandledError,
} from './redux/selectors/app-selectors';

import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { ProfilePage } from './components/Profile/Profile';
import { UsersPage } from './components/Users/UsersPage';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { ChatPage } from './components/Chat/ChatPage';
import { LoginPage } from './components/Login/LoginPage';

import NotFound from './components/NotFound/NotFound';

import { Button, Layout, Result, Spin } from 'antd';
import { useErrorMessage } from './hooks/useErrorMessage';

const { Content } = Layout;

export const App: React.FC = () => {
  const isAppInitialized = useSelector(selectIsAppInitialized);
  const unhandlerError = useSelector(selectUnhandledError);
  const isInitializing = useSelector(selectIsInitializing);
  const initializingError = useSelector(selectInitializingError);

  const dispatch = useDispatch();

  useEffect(() => {
    const handlePromiseErrors = (e: PromiseRejectionEvent) => {
      dispatch(appActions.unhandledErrorChanged(e.reason));
    };

    dispatch(initializeApp());
    window.addEventListener('unhandledrejection', handlePromiseErrors);

    return () => {
      window.removeEventListener('unhandledrejection', handlePromiseErrors);
    };
  }, [dispatch]);

  useErrorMessage(unhandlerError);

  const init = () => {
    dispatch(initializeApp());
  };

  if (isInitializing) {
    return (
      <Spin className="appLoader" size="large" tip="Application is loading" />
    );
  }

  if (initializingError) {
    return (
      <Result
        className="appErrorResult"
        status="error"
        title="Unable to initialize application"
        subTitle={initializingError.message}
        extra={[
          <Button
            type="primary"
            key="initializeApp"
            onClick={init}
            loading={isInitializing}
          >
            Try again
          </Button>,
        ]}
      />
    );
  }

  if (isAppInitialized)
    return (
      <Layout className="app">
        <Header />
        <Layout>
          <Navbar />
          <Content className="content">
            <Switch>
              <Route exact path="/" render={() => <Main />} />
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
      </Layout>
    );

  return null;
};
