import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MazeGamePage from './pages/maze-game';
import './styles/base.scss';

class App extends Component {
    render() {
      return (
          <main>
			<Route exact path="/" component={MazeGamePage}/>
          </main>
      );
   }
}

export default App;
