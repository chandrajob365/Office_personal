import React, { Component, Suspense, lazy } from "react";
import "./style.css";
const Search = lazy(() => import("../components/search"));
const Cards = lazy(() => import("../components/cards"));
export default class AppContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gifs: [],
			offset: 0,
			limit: 25,
			isLoading: false,
			fetching: false
		};
		this.searchText = "happy";
	}
	componentDidMount() {
		console.log("called");
		this.fetchGIF();
	}

	fetchGIF = () => {
		if (this.searchText && !this.state.fetching) {
			let offset = this.state.offset || 0;
			this.setState({ isLoading: true, fetching: true });
			fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${
					process.env.REACT_APP_GIPHY_API_KEY
				}&q=${this.searchText}&limit=${this.state.limit}&offset=${offset +
					this.state.limit}`
			)
				.then(response => {
					console.log("fetchGIF", response);
					return response.json();
				})
				.then(searchedResponse => {
					console.log("searchedResponse :: ", searchedResponse);
					return this.setState({
						gifs: [...this.state.gifs, ...searchedResponse.data],
						offset: searchedResponse.pagination.offset + this.state.limit,
						isLoading: false,
						fetching: false
					});
				})
				.catch(err => {
					console.log("Error :: ", err);
					this.setState({
						isLoading: false,
						fetching: false
					});
				});
		}
	};

	debounceFetchGIF = (fn, limit) => {
		let timer;
		return () => {
			timer && clearTimeout(timer);
			timer = setTimeout(fn, limit);
		};
	};

	handleDebouncedSearchEvent = this.debounceFetchGIF(this.fetchGIF, 300);

	updateSearchText = searchText => {
		if (searchText !== this.searchText) {
			this.setState({ offset: 0 });
		}
		this.searchText =
			searchText && searchText.length > 0 ? searchText : "happy";
		this.handleDebouncedSearchEvent();
	};

	render() {
		const { gifs } = this.state;
		return (
			<div className="app_content" data-test="appContent">
				<Suspense fallback={<div>Loading...</div>}>
					<Search updateSearchText={this.updateSearchText} />
					<Cards
						data-test="cardInAppContent"
						gifs={gifs}
						fetchGIF={this.fetchGIF}
					/>
				</Suspense>
			</div>
		);
	}
}
