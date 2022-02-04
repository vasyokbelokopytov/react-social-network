import React, { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import { init } from './redux/appSlice';

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
import { useAppDispatch, useAppSelector } from './hooks/redux';

const { Content } = Layout;

export const App: React.FC = () => {
  const isAppInitialized = useAppSelector((state) => state.app.isInited);
  const isInitializing = useAppSelector((state) => state.app.isIniting);
  const initializingError = useAppSelector((state) => state.app.error);

  const dispatch = useAppDispatch();

  const initializeApp = useCallback(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    initializeApp();
  }, [dispatch, initializeApp]);

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
        subTitle={initializingError}
        extra={[
          <Button
            type="primary"
            key="initializeApp"
            onClick={initializeApp}
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
