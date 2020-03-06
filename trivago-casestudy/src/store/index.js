import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { head } from 'lodash/fp';
import {
	drawMatrix,
	getNextGeneration,
	getCurrentLiving,
	updateCells,
	BLUE,
	ORANGE,
	RED,
} from '../utils';
import { survivalRule, mostFrequentColor } from './rules';
import { runTimeEpic } from './epics';
import { trivago } from './patterns/trivago';
const colors = [BLUE, ORANGE, RED];

const calucluateNextColor = colorAmount => index =>
	(index + 1) % (colorAmount + 1) === 0 ? 1 : index + 1;

const getNextColor = calucluateNextColor(colors.length);

const initialState = {
	columns: 103,
	rows: 67,
	matrix: [],
	patterns: [trivago],
	rules: [survivalRule, mostFrequentColor],
	color: BLUE,
	running: false,
	frameRate: 2000,
};

initialState.matrix = drawMatrix(
	initialState.columns,
	initialState.rows,
	initialState.patterns[0],
);

// ################################################################
// ### TASK: WEB-103 Implement planned refactoring for Reducer  ###
// ################################################################
// TODO: Before our engineer left this code base he had an idea to refactor
// this reducer to something like
//
// const map = {
//     TICK: ({ matrix }) => getNextGeneration(matrix, state.rules),
//     RESET: () => {},
//     CELLS_SELECTED: ({ matrix }, { payload }) => updateCells(matrix, payload),
//     PATTERN_SELECTED: ({ patterns }, { payload }) => patterns[payload]
// };
//
// Can you make her idea real?

const reducer = (state, action) => {
	const { matrix, columns, rows, patterns } = state;
	const map = {
		TICK: () => getNextGeneration(matrix, state.rules),
		RESET: () => head(patterns),
		CELLS_SELECTED: payload => {
			const [x, y] = payload;
			return updateCells(matrix, { [x]: [y, state.color] });
		},
		PATTERN_SELECTED: payload => patterns[payload],
	};
	switch (action.type) {
		case 'START_STOP': {
			return {
				...state,
				running: !state.running,
			};
		}
		case 'FRAME_RATE_CHANGE': {
			return {
				...state,
				frameRate: action.payload.target.value,
			};
		}
		case 'TICK':
		case 'RESET':
		case 'CELLS_SELECTED':
		case 'PATTERN_SELECTED': {
			const { payload } = action;
			return {
				...state,
				matrix: drawMatrix(columns, rows, map[action.type](payload)),
			};
		}
		case 'STORE_PATTERN': {
			return {
				...state,
				patterns: [...patterns, getCurrentLiving(matrix)],
			};
		}
		case 'COLOR_CHANGED': {
			return {
				...state,
				color: getNextColor(state.color),
			};
		}
		default: {
			return state;
		}
	}
};

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
	const store = createStore(
		reducer,
		initialState,
		applyMiddleware(epicMiddleware),
	);
	epicMiddleware.run(runTimeEpic);
	return store;
}
