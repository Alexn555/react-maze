const NumberHelper = require('../utils/number');
const Logger = require('../utils/logger');
const MapLoader = require('../maps'); // load maps

const ShortestDistCalc = require('./dist');

module.exports = function(app) {

    // Get map
    app.get('/maze-map', function (req, res){
        const Maps = MapLoader.maps;
        const randInt = NumberHelper.getRandomInt(0, Maps.length);

        const map = [ Maps[randInt] ];
        res.send(map);
    });

    // Send step and return game result
    app.post('/maze-game', function (req, res){
        const map = req.body.map;
        const wantedPosition = req.body.wantedPos;
        let gameFinished = false;
        let isValidMove = false;
        let playerNewPosition = [0, 0];
        const source =  map[0];

        const errorResponse = {
            map: map,
            playerPos: [0, 0],
            minSteps: 0,
            isValidMove: false,
            gameFinished: false
        };

        // check if input is valid
        if (typeof map === 'undefined' || map === null || map.length === 0) {
            return res.send(errorResponse);
        }
        if (typeof wantedPosition === 'undefined' || wantedPosition === null) {
            return res.send(errorResponse);
        }

        // get minimum steps
        const minSteps = getMinSteps(source);

        // check if is invalid move
        for (let row = 0; row < source.length; row++) {
            for (let cell = 0; cell < source[row].length; cell++) {
                if (row === wantedPosition[0] && cell === wantedPosition[1]) {
                    if (source[row][cell] === '.') { // only valid if this item space
                        isValidMove = true;
                    }
                }
            }
        }

        // set new position
        if (isValidMove) {
            playerNewPosition = wantedPosition;
        }

        // check if game complete
        if (playerNewPosition[0] === map[0].length - 1
            && playerNewPosition[1] === map[0][0].length - 1) {
            gameFinished = true;
        }

        const response = {
            map: map,
            playerPos: playerNewPosition,
            minSteps: minSteps,
            isValidMove: isValidMove,
            gameFinished: gameFinished
        };

        res.send(response);
    });

    function getMinSteps(source) {
        const rows = source.length;
        const columns = source[0].length;
        const shortestDist = new ShortestDistCalc(rows, columns);

        shortestDist.startSearch();
        return shortestDist.findShortestPath(source, 0, 0, rows, columns, 1000, 0);
    }

};

