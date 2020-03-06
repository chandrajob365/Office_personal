import React, { Component, Suspense, lazy } from "react";
import "./style.css";
import {
	debounce,
	fetchApi,
	getFromStorage,
	putInStorage,
	removeFromStorage
} from "../helper";
const Search = lazy(() => import("../components/search"));
const Cards = lazy(() => import("../components/cards"));

export default class AppContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gifs: [],
			limit: 28,
			offset: 0,
			isLoading: false,
			fetching: false
		};
		this.searchText = "happy";
	}
	componentDidMount() {
		this.fetchGIF();
	}

	fetchGIF = () => {
		if (this.searchText && !this.state.fetching) {
			let offset = this.state.offset;
			this.setState({ isLoading: true, fetching: true });
			if (offset === 0) {
				console.log("offset is zero. getting from ls");
				const gifs = getFromStorage(this.searchText);
				console.log("gifs from ls :: ", gifs);
				if (gifs) {
					console.log("setting gifs from ls to state");
					this.setState({
						gifs: [...this.state.gifs, ...gifs],
						offset: offset + this.state.limit,
						isLoading: false,
						fetching: false
					});
				} else {
					console.log("fetching from api");
					this.fetchData(this.searchText, this.state.limit, offset);
				}
			} else {
				console.log("fetching from api offset not zero");
				this.fetchData(this.searchText, this.state.limit, offset);
			}
			console.log("fetch GIF being called.... offset = ", offset);
		}
	};

	fetchData = (searchText, limit, offset) => {
		const URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchText}&limit=${limit}&offset=${offset}`;
		fetchApi(URL)
			.then(searchedResponse => {
				const itemsCountInlocalStorage = localStorage.length;
				if (offset === 0) {
					console.log("offset is 0");
					if (itemsCountInlocalStorage >= 5) {
						const lastElementInLS = localStorage.key(
							itemsCountInlocalStorage - 1
						);
						console.log(
							"itemsCountInlocalStorage is greater or eqaull to 5 lastElementInLS :: ",
							lastElementInLS
						);
						removeFromStorage(lastElementInLS);
					} else {
						console.log("items in ls is not yet 5");
						putInStorage(this.searchText, searchedResponse.data);
					}
				}
				this.setState({
					gifs: [...this.state.gifs, ...searchedResponse.data],
					offset: searchedResponse.pagination.offset + this.state.limit,
					isLoading: false,
					fetching: false
				});
			})
			.catch(err => console.log("Error :: ", err));
	};
	handleDebouncedSearchEvent = debounce(this.fetchGIF, 300);

	updateSearchText = searchText => {
		if (this.searchText !== searchText) {
			this.setState({ offset: 0, gifs: [] });
		}
		this.searchText =
			searchText && searchText.length > 0 ? searchText : "happy";
		this.handleDebouncedSearchEvent();
	};

	render() {
		const { gifs } = this.state;
		return (
			<div className="app_content" data-test="appContent">
				<Suspense fallback={<div>Loading Contents ...</div>}>
					<Search updateSearchText={this.updateSearchText} />
					<Cards
						data-test="cardInAppContent"
						gifs={gifs}
						isLoading={this.state.isLoading}
						fetchGIF={this.fetchGIF}
					/>
				</Suspense>
			</div>
		);
	}
}
