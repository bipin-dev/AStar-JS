const ROW = 9;
const COL = 10;
const FLT_MAX = 99999.99;

function isValid(row, col) {
	return row >= 0 && row < ROW && col >= 0 && col < COL;
}

function isUnBlocked(grid, row, col) {
	if (grid[row][col] == 1) return true;
	else return false;
}

function isDestination(row, col, dest) {
	if (row == dest[0] && col == dest[1]) return true;
	else return false;
}

function calculateHValue(row, col, dest) {
	return Math.sqrt(
		(row - dest[0]) * (row - dest[1]) + (col - dest[0]) * (col - dest[1])
	);
}

function tracePath(cellDetails, dest) {
	console.log("\nThe Path is ");
	let row = dest[0];
	let col = dest[1];
	let Path = [];

	while (
		!(
			cellDetails[row][col].parent_i == row &&
			cellDetails[row][col].parent_j == col
		)
	) {
		Path.push([row, col]);
		let temp_row = cellDetails[row][col].parent_i;
		let temp_col = cellDetails[row][col].parent_j;
		row = temp_row;
		col = temp_col;
	}

	Path.push([row, col]);
	while (Path.length > 0) {
		let p = Path.pop();
		console.log(p[0], p[1]);
	}
	return;
}

const aStarSearch = (grid, src, dest) => {
	console.log(" searching .... ");
	if (isValid(src[0], src[1]) == false) {
		console.log("Source is invalid\n");
		return;
	}
	if (isValid(dest[0], dest[1]) == false) {
		console.log("Destination is invalid\n");
		return;
	}
	if (
		isUnBlocked(grid, src[0], src[1]) == false ||
		isUnBlocked(grid, dest[0], dest[1]) == false
	) {
		console.log("Source or the destination is blocked\n");
		return;
	}
	if (isDestination(src[0], src[1], dest) == true) {
		console.log("We are already at the destination\n");
		return;
	}
	let closedList = [];
	for (let n = 0; n < ROW; n++) {
		for (let m = 0; m < COL; m++) {
			if (!closedList[n]) {
				closedList[n] = [];
			}
			closedList[n][m] = false;
		}
	}
	let cellDetails = [];

	let i, j;

	for (i = 0; i < ROW; i++) {
		for (j = 0; j < COL; j++) {
			if (!cellDetails[i]) {
				cellDetails[i] = [];
			}
			if (!cellDetails[i][j]) {
				cellDetails[i][j] = {};
			}
			cellDetails[i][j].f = FLT_MAX;
			cellDetails[i][j].g = FLT_MAX;
			cellDetails[i][j].h = FLT_MAX;
			cellDetails[i][j].parent_i = -1;
			cellDetails[i][j].parent_j = -1;
		}
	}
	(i = src[0]), (j = src[1]);
	cellDetails[i][j].f = 0.0;
	cellDetails[i][j].g = 0.0;
	cellDetails[i][j].h = 0.0;
	cellDetails[i][j].parent_i = i;
	cellDetails[i][j].parent_j = j;

	openList = [];

	openList.push({ f: 0, pair: [i, j] });

	let foundDest = false;

	while (openList.length > 0) {
		let p = openList.pop();

		i = p.pair[0];
		j = p.pair[1];
		if (!closedList[i]) {
			closedList[i] = [];
		}
		closedList[i][j] = true;

		let gNew, hNew, fNew;

		if (isValid(i - 1, j) == true) {
			if (isDestination(i - 1, j, dest) == true) {
				cellDetails[i - 1][j].parent_i = i;
				cellDetails[i - 1][j].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}
			if (!closedList[i - 1]) {
				closedList[i - 1] = [];
			} else if (
				closedList[i - 1][j] == false &&
				isUnBlocked(grid, i - 1, j) == true
			) {
				gNew = cellDetails[i][j].g + 1;
				hNew = calculateHValue(i - 1, j, dest);
				fNew = gNew + hNew;
				if (
					cellDetails[i - 1][j].f == FLT_MAX ||
					cellDetails[i - 1][j].f > fNew
				) {
					openList.push({ f: fNew, pair: [i - 1, j] });

					cellDetails[i - 1][j].f = fNew;
					cellDetails[i - 1][j].g = gNew;
					cellDetails[i - 1][j].h = hNew;
					cellDetails[i - 1][j].parent_i = i;
					cellDetails[i - 1][j].parent_j = j;
				}
			}
		}

		if (isValid(i + 1, j) == true) {
			if (isDestination(i + 1, j, dest) == true) {
				cellDetails[i + 1][j].parent_i = i;
				cellDetails[i + 1][j].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}
			if (!closedList[i + 1]) {
				closedList[i + 1] = [];
			} else if (
				closedList[i + 1][j] == false &&
				isUnBlocked(grid, i + 1, j) == true
			) {
				gNew = cellDetails[i][j].g + 1.0;
				hNew = calculateHValue(i + 1, j, dest);
				fNew = gNew + hNew;
				if (
					cellDetails[i + 1][j].f == FLT_MAX ||
					cellDetails[i + 1][j].f > fNew
				) {
					openList.push({ f: fNew, pair: [i + 1, j] });
					cellDetails[i + 1][j].f = fNew;
					cellDetails[i + 1][j].g = gNew;
					cellDetails[i + 1][j].h = hNew;
					cellDetails[i + 1][j].parent_i = i;
					cellDetails[i + 1][j].parent_j = j;
				}
			}
		}

		if (isValid(i, j + 1) == true) {
			if (isDestination(i, j + 1, dest) == true) {
				cellDetails[i][j + 1].parent_i = i;
				cellDetails[i][j + 1].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}

			if (!closedList[i]) {
				closedList[i] = [];
			} else if (
				closedList[i][j + 1] == false &&
				isUnBlocked(grid, i, j + 1) == true
			) {
				gNew = cellDetails[i][j].g + 1.0;
				hNew = calculateHValue(i, j + 1, dest);
				fNew = gNew + hNew;

				if (
					cellDetails[i][j + 1].f == FLT_MAX ||
					cellDetails[i][j + 1].f > fNew
				) {
					openList.push({ f: fNew, pair: [i, j + 1] });

					cellDetails[i][j + 1].f = fNew;
					cellDetails[i][j + 1].g = gNew;
					cellDetails[i][j + 1].h = hNew;
					cellDetails[i][j + 1].parent_i = i;
					cellDetails[i][j + 1].parent_j = j;
				}
			}
		}

		if (isValid(i, j - 1) == true) {
			if (isDestination(i, j - 1, dest) == true) {
				// Set the Parent of the destination cell
				cellDetails[i][j - 1].parent_i = i;
				cellDetails[i][j - 1].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}

			if (!closedList[i]) {
				closedList[i] = [];
			} else if (
				closedList[i][j - 1] == false &&
				isUnBlocked(grid, i, j - 1) == true
			) {
				gNew = cellDetails[i][j].g + 1.0;
				hNew = calculateHValue(i, j - 1, dest);
				fNew = gNew + hNew;

				if (
					cellDetails[i][j - 1].f == FLT_MAX ||
					cellDetails[i][j - 1].f > fNew
				) {
					openList.push({ f: fNew, pair: [i, j - 1] });
					cellDetails[i][j - 1].f = fNew;
					cellDetails[i][j - 1].g = gNew;
					cellDetails[i][j - 1].h = hNew;
					cellDetails[i][j - 1].parent_i = i;
					cellDetails[i][j - 1].parent_j = j;
				}
			}
		}

		if (isValid(i - 1, j + 1) == true) {
			if (isDestination(i - 1, j + 1, dest) == true) {
				cellDetails[i - 1][j + 1].parent_i = i;
				cellDetails[i - 1][j + 1].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}
			if (!closedList[i - 1]) {
				closedList[i - 1] = [];
			} else if (
				closedList[i - 1][j + 1] == false &&
				isUnBlocked(grid, i - 1, j + 1) == true
			) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i - 1, j + 1, dest);
				fNew = gNew + hNew;
				if (
					cellDetails[i - 1][j + 1].f == FLT_MAX ||
					cellDetails[i - 1][j + 1].f > fNew
				) {
					openList.push({ f: fNew, pair: [i - 1, j + 1] });

					// Update the details of this cell
					cellDetails[i - 1][j + 1].f = fNew;
					cellDetails[i - 1][j + 1].g = gNew;
					cellDetails[i - 1][j + 1].h = hNew;
					cellDetails[i - 1][j + 1].parent_i = i;
					cellDetails[i - 1][j + 1].parent_j = j;
				}
			}
		}
		if (isValid(i - 1, j - 1) == true) {
			if (isDestination(i - 1, j - 1, dest) == true) {
				cellDetails[i - 1][j - 1].parent_i = i;
				cellDetails[i - 1][j - 1].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}
			if (!closedList[i - 1]) {
				closedList[i - 1] = [];
			} else if (
				closedList[i - 1][j - 1] == false &&
				isUnBlocked(grid, i - 1, j - 1) == true
			) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i - 1, j - 1, dest);
				fNew = gNew + hNew;
				if (
					cellDetails[i - 1][j - 1].f == FLT_MAX ||
					cellDetails[i - 1][j - 1].f > fNew
				) {
					openList.push({ f: fNew, pair: [i - 1, j - 1] });
					// Update the details of this cell
					cellDetails[i - 1][j - 1].f = fNew;
					cellDetails[i - 1][j - 1].g = gNew;
					cellDetails[i - 1][j - 1].h = hNew;
					cellDetails[i - 1][j - 1].parent_i = i;
					cellDetails[i - 1][j - 1].parent_j = j;
				}
			}
		}
		if (isValid(i + 1, j + 1) == true) {
			if (isDestination(i + 1, j + 1, dest) == true) {
				cellDetails[i + 1][j + 1].parent_i = i;
				cellDetails[i + 1][j + 1].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}
			if (!closedList[i + 1]) {
				closedList[i + 1] = [];
			} else if (
				closedList[i + 1][j + 1] == false &&
				isUnBlocked(grid, i + 1, j + 1) == true
			) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i + 1, j + 1, dest);
				fNew = gNew + hNew;
				if (
					cellDetails[i + 1][j + 1].f == FLT_MAX ||
					cellDetails[i + 1][j + 1].f > fNew
				) {
					openList.push({ f: fNew, pair: [i + 1, j + 1] });

					// Update the details of this cell
					cellDetails[i + 1][j + 1].f = fNew;
					cellDetails[i + 1][j + 1].g = gNew;
					cellDetails[i + 1][j + 1].h = hNew;
					cellDetails[i + 1][j + 1].parent_i = i;
					cellDetails[i + 1][j + 1].parent_j = j;
				}
			}
		}
		if (isValid(i + 1, j - 1) == true) {
			if (isDestination(i + 1, j - 1, dest) == true) {
				cellDetails[i + 1][j - 1].parent_i = i;
				cellDetails[i + 1][j - 1].parent_j = j;
				console.log("The destination cell is found\n");
				tracePath(cellDetails, dest);
				foundDest = true;
				return;
			}
			if (!closedList[i + 1]) {
				closedList[i + 1] = [];
			} else if (
				closedList[i + 1][j - 1] == false &&
				isUnBlocked(grid, i + 1, j - 1) == true
			) {
				gNew = cellDetails[i][j].g + 1.414;
				hNew = calculateHValue(i + 1, j - 1, dest);
				fNew = gNew + hNew;

				if (
					cellDetails[i + 1][j - 1].f == FLT_MAX ||
					cellDetails[i + 1][j - 1].f > fNew
				) {
					openList.push({ f: fNew, pair: [i + 1, j - 1] });
					cellDetails[i + 1][j - 1].f = fNew;
					cellDetails[i + 1][j - 1].g = gNew;
					cellDetails[i + 1][j - 1].h = hNew;
					cellDetails[i + 1][j - 1].parent_i = i;
					cellDetails[i + 1][j - 1].parent_j = j;
				}
			}
		}
	}
	if (foundDest == false)
		console.log("Failed to find the Destination Cell\n");

	return;
};

module.exports = aStarSearch;
