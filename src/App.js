import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
// import Messages from './components/Messages/Messages';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import MessagesContainer from './components/Messages/MessagesContainer';

const App = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Navbar />
      <main className="main">
        <Route exact path="/" render={() => <Main />} />
        <Route
          path="/messages"
          render={() => (
            <MessagesContainer
            //  store={props.store}
            />
          )}
        />
        <Route
          path="/profile"
          render={() => (
            <Profile
            // store={props.store}
            />
          )}
        />
        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
      </main>
    </div>
  );
};

export default App;
