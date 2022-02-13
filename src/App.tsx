import React, { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import { init } from './features/app/appSlice';

import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Main } from './components/Main/Main';
import { Profile } from './components/Profile/Profile';
import { Users } from './components/Users/Users';
import { Chat } from './components/Chat/Chat';
import { SignIn } from './components/SignIn/SignIn';
import { NotFound } from './components/NotFound/NotFound';

import { Button, Layout, Result, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from './app/hooks/redux';
import { ProtectedRoute } from './features/auth/ProtectedRoute';

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
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedRoute path="/chat">
                <Chat />
              </ProtectedRoute>
              <ProtectedRoute path="/profile/:userId?" allowWithParam="userId">
                <Profile />
              </ProtectedRoute>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );

  return null;
};
