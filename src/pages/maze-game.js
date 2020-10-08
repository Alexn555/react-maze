import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bake_cookie, read_cookie } from 'sfcookies';

import MazeGameGrid from '../components/maze/game';
import MazeError from '../components/maze-error/maze-error';
import { fetchMap } from '../actions/maze-actions';
import '../styles/common.scss';
import './maze-game.scss';


class MazeGamePage extends Component {

    constructor(props){
        super(props);
        this.restart = this.restart.bind(this);
    }

   state = {
	   usePlainRefresh: true,
       gameWasRestarted: false,
       useTips: true,
   };

   componentDidMount() {
       this.props.fetchMap();
       this.setState({ gameWasRestarted: read_cookie('restart') === true });
   }

   startGame(map, gameWasRestarted) {
       return <MazeGameGrid map={map} restart={gameWasRestarted} />
   }

   restart() {
       if (this.state.usePlainRefresh) {
           bake_cookie('restart', true);
           window.location.reload();
	   } else {
           this.setState({ gameWasRestarted: true });
           setTimeout(() => { this.setState({ gameWasRestarted: false}); }, 1000);
           this.props.fetchMap();
       }
   }

   hideTips() {
       this.setState({ useTips: false });
   }

   showTips() {
       const { useTips, gameWasRestarted } = this.state;
       if (useTips && !gameWasRestarted) {
           setTimeout(() => this.hideTips(), 2000);
           return (
               <div className="tipsMessage" onClick={this.hideTips.bind(this)}>
                   Use Arrow keys to play, have fun!
               </div>
           );
       } else {
           return null;
       }
   }

   render() {
      const { map } = this.props;
      if (map && map.length > 0) {
          return (
           <div>
               <button onClick={this.restart} className="link" href="#">
                   Restart Game
               </button>
               {this.showTips()}
               {this.startGame(map, this.state.gameWasRestarted)}
           </div>
        );
      }
      else {
         return(<MazeError page='Maze' items={map}
                       loading={this.props.loading}
                       errors={this.props.errors}
          />);
      }
   }

}

// Make result available in props
function mapStateToProps(state) {
  return {
      map: state.mazeStore.map,
      loading: state.mazeStore.loading,
      errors: state.mazeStore.errors
  }
}

export default connect(mapStateToProps, {fetchMap})(MazeGamePage);
