import { createComponent, RECEIVE_PROPS } from "melody-component";
import { lifecycle, bindEvents, compose } from "melody-hoc";
import template from "./index.twig";
const initalState = {
	counter: 0
};

const INC = "INC";
const DEC = "DEC";
const incrementCounter = () => ({ type: INC });
const decrementCounter = () => ({ type: DEC });
const stateReducer = (state = initalState, action) => {
	switch (action.type) {
		case RECEIVE_PROPS:
			return {
				...state,
				...action.payload
			};
		case INC:
			return {
				...state,
				counter: state.counter + 1
			};
		case DEC:
			return {
				...state,
				counter: state.counter - 1
			};
		default:
			return {
				...state
			};
	}
};

// Lifecycle methods
const withIncreasingCounter = lifecycle({
	componentDidMount() {
		console.log("Inside component did mount");
		// this.intervalId = setInterval(
		// 	() => this.dispatch(incrementCounter()),
		// 	1000
		// );
	},

	componentWillUnmount() {
		console.log("Inside component will unmount");
		clearInterval(this.intervalId);
	}
});

// Add Events
const withClickHandlers = bindEvents({
	incrementButton: {
		click(event, { dispatch }) {
			console.log("Increment");
			dispatch(incrementCounter());
		}
	},
	decrementButton: {
		click(event, { dispatch }) {
			console.log("Decrement");
			dispatch(decrementCounter());
		}
	}
});

const component = createComponent(template, stateReducer);

// Compose Enhancer Functions
const enhancers = compose(withIncreasingCounter, withClickHandlers);

const enhanceComponent = enhancers(component);
// render(document.querySelector("#app"), enhanceComponent);
export default enhanceComponent;
