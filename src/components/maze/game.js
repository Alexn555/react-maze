import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendStep } from '../../actions/maze-actions';
import './game.scss';

const CellStates = Object.freeze({
    'Box': '.',
    'Wall': '#',
});

const CellClasses = Object.freeze({
    'Box': 'box',
    'Last': 'last-box',
    'Wall': 'wall',
    'Player': 'player'
});

class MazeGameGrid extends Component {

   state = {
      playerPos: [0, 0],
	  isInvalidMoveBanner: false,
   };

   componentDidMount() {
	   this.startGame();
   }

   startGame(initStep = true) {
       // set controls knowing map limits
       const gameMap = this.props.map;
       const columnCount = gameMap[0][0].length;
       this.setGameControls(gameMap[0].length, columnCount);

       const el = document.getElementsByClassName('wrapper')[0];
       // set number of columns
       el.style = 'grid-template-columns: repeat('+ columnCount + ', 0.5fr);';

       this.setState({ isInvalidMoveBanner: false });

       // initialize player positions, set initial step
       if (initStep) {
           const wantedPos = [0, 0];
           this.props.sendStep(this.props.map, [0, 0], wantedPos);
       }
   }

    componentDidUpdate(prevProps) {
        if(prevProps.restart !== this.props.restart){
			setTimeout(() => { this.startGame(false); }, 2000);
            this.props.sendStep(this.props.map, [0, 0], [0, 0]);
        }
        if(prevProps.result.playerPos !== this.props.result.playerPos){
            const { result } = this.props;
        	this.setState({ playerPos: result.playerPos });
        	if (typeof result.isValidMove !== 'undefined') {
                this.setState({ isInvalidMoveBanner: !result.isValidMove });
                setTimeout(() => { this.setState({ isInvalidMoveBanner: false }); }, 1000);
            }
        }
    }

    setGameControls(rowCount = 0, cellsInRow = 0) {
      const self = this;
	    document.addEventListener('keydown', (e) => {
	     if ((self.props.result && self.props.result.gameFinished) ||
			 (e.keyCode < 37 && e.Code > 40)) {
		    return false;
	     }

		 const prev = self.state.playerPos;
         if (typeof prev === 'undefined') { return false; }

         let wantedPos = self.state.playerPos;
		 let cell = 0;
		 switch (e.keyCode) {
			case 37: // left
				cell = prev[1] > 0 ? prev[1] - 1 : 0;
				wantedPos = [prev[0], cell];
				break;
			case 38:
                self.setState({ isInvalidMoveBanner: true});
			    setTimeout(() => { self.setState({ isInvalidMoveBanner: false}); }, 1000);
				break;
			case 39: // right
				cell = prev[1] < cellsInRow ? prev[1] + 1 : prev[1];
				wantedPos = [prev[0], cell];
				break;
			case 40: // down
				const row = prev[0] >= 0 && prev[0] < rowCount ? prev[0] + 1 : prev[0];
				wantedPos = [row, prev[1]];
				break;
			 default:
                 wantedPos = [prev[0], prev[1]];
         }

		 self.props.sendStep(self.props.map, wantedPos);
	  });
   }

   getBoxClass(cell) {
	   let cl = 'box';
	   if (typeof cell === 'undefined' || cell === '') {
		   return cl;
	   }
	   switch (cell) {
		  case CellStates.Box:
			 cl = CellClasses.Box;
			 break;
		  case CellStates.Wall:
			 cl = CellClasses.Wall;
		     break;
		   default:
		   	cl = CellClasses.Box;
	   }
	   return cl;
   }

   getPlayerBoxClass(boxClass, rowIndex, cellIndex, playerPos) {
	   if (typeof playerPos !== 'undefined'
	     && rowIndex === playerPos[0]
		 && cellIndex === playerPos[1]) {
		   return CellClasses.Player;
	   }
	   return boxClass;
   }

    getLastBoxClass(boxClass, rowCount, cellCount, rowIndex, cellIndex) {
		if (rowIndex === rowCount -1 && cellIndex === cellCount -1) {
			return CellClasses.Last;
		}
		return boxClass;
	}

    showInvalidMove() {
        const { isInvalidMoveBanner } = this.state;
        if (isInvalidMoveBanner) {
            return (<div className="invalidMove"> Invalid Move! </div>)
        }
        return null;
    }

    showGameGrid() {
	   const gameMap = this.props.map;
	   const { result } = this.props;

	   if (result && result.gameFinished) {
           return (<div className="gameFinish"> Game Completed! </div>);
	   }

	   const gameGrid = gameMap[0].map((row, rowIndex) => {
		  return row.map((cell, cellIndex) => {
			 let boxClass = this.getBoxClass(cell);
			 boxClass = this.getPlayerBoxClass(boxClass, rowIndex, cellIndex, result.playerPos);
			 boxClass = this.getLastBoxClass(boxClass, gameMap[0].length,  row.length, rowIndex, cellIndex);
			  return (
			   <div key={`${rowIndex}-${cellIndex}`} className={boxClass}>
				  {cell}
			   </div>
			 );
		  });
	   });

	   return (
		   <div className="wrapper">
			   <div className="score">
				   Min Steps: {result.minSteps}
			   </div>
		      {gameGrid}
		   </div>
	   )
   }

   render() {
	  return (
		  <div className='game'>
			{this.showInvalidMove()}
			{this.showGameGrid()}
		  </div>
	 );
   }

}

// Make result available in props
function mapStateToProps(state) {
  return {
      result: state.mazeStore.result,
      loading: state.mazeStore.loading,
      errors: state.mazeStore.errors
  }
}

export default connect(mapStateToProps, {sendStep})(MazeGameGrid);
