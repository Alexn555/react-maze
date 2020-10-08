/* Shortest path calculation */

function ShortestDistCalc(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.finishedRes = false;
    this.count = 0;

    this.startSearch = function() {
        this.finishedRes = false;
        this.count = 0;
    };

    // check if we not hit wall
    this.isSafe = function (map, x, y) {
        return map[x][y] !== '#';
    };

    // check if valid position, in map limits
    this.isValid = function (x, y) {
        return x < this.rows && y < this.columns && x >= 0 && y >= 0;
    };

    this.findShortestPath = function(map, i, j,  x, y, min_dist, dist) {
        // limit recursive if infinite loop occurs
        this.count += 1;

        // if destination is found, update min_dist
        if (i === x - 1 && j === y - 1) {
            this.finishedRes = true;
            return Math.min(dist, min_dist);
        }

        if (this.finishedRes || this.count > 100) {
            return min_dist;
        }

        // go to bottom cell
        if (this.isValid(i + 1, j) && this.isSafe(map, i + 1, j)) {
            min_dist = this.findShortestPath(map, i + 1, j, x, y,
                min_dist, dist + 1);
        }

        // go to right cell
        if (this.isValid(i, j + 1) && this.isSafe(map, i, j + 1)) {
            min_dist = this.findShortestPath(map, i, j + 1, x, y,
                min_dist, dist + 1);
        }

        // go to top cell
        if (this.isValid(i - 1, j) && this.isSafe(map, i - 1, j)) {
            min_dist = this.findShortestPath(map, i - 1, j, x, y,
                min_dist, dist + 1);
        }

        // go to left cell
        if (this.isValid(i, j - 1) && this.isSafe(map, i, j - 1)) {
            min_dist = this.findShortestPath(map, i, j - 1, x, y,
                min_dist, dist + 1);
        }

        return min_dist;
    };

}

module.exports = ShortestDistCalc;