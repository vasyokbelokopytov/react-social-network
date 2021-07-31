import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

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

const App = (props) => {
  return (
    <div className="wrapper">
      <HeaderContainer />
      <Navbar />
      <main className="main">
        <Route exact path="/" render={() => <Main />} />
        <Route path="/messages" render={() => <MessagesContainer />} />
        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/login" render={() => <LoginContainer />} />
      </main>
    </div>
  );
};

export default App;
