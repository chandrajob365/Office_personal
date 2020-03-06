//window.onload = () => {
let searchBox = document.getElementById("search_country");
searchBox.addEventListener("keyup", e => handleDebouncedSearch(e));
//};

const handleDebouncedSearch = debounce(handleSearchQuery, 300);

function handleSearchQuery(e) {
	clearOlderSearchResult();
	const query = e.target.value;
	getData(query).then(res => {
		updateSearchResult(query, res);
	});
}

function clearOlderSearchResult() {
	let resultBox = document.getElementById("search_result");
	resultBox.innerHTML = "";
}

function updateSearchResult(query, res) {
	if (res && res.length === 0) {
		handleInvalidSearch();
	} else {
		handleValidSearch(res, query);
	}
}

function handleInvalidSearch() {
	let resultBox = document.getElementById("search_result");
	const resultChildDiv = document.createElement("div");
	resultChildDiv.innerHTML = "No result to show. Search again";
	resultBox.appendChild(resultChildDiv);
}

function handleValidSearch(res, query) {
	let resultBox = document.getElementById("search_result");
	res.forEach(state => {
		const resultChildDiv = createItem(state, query);
		resultBox.appendChild(resultChildDiv);
	});
}

function createItem(state, query) {
	// const itemDiv = document.createElement("div");
	// const highlightedSubStrSpan = document.createElement("span");
	// highlightedSubStr.
	//const highlightedSubStr = state.splice(0, query.length);

	const itemDiv = document.createElement("div");
	itemDiv.innerHTML = state;
	return itemDiv;
}

function debounce(fn, limit) {
	let timer;
	return args => {
		timer && clearTimeout(timer);
		timer = setTimeout(() => fn(args), limit);
	};
}

let states = [
	"Alaska",
	"Alabama",
	"Arkansas",
	"American Samoa",
	"Arizona",
	"California",
	"Colorado",
	"Connecticut",
	"District of Columbia",
	"Delaware",
	"Florida",
	"Georgia",
	"Guam",
	"Hawaii",
	"Iowa",
	"Idaho",
	"Illinois",
	"Indiana",
	"Kansas",
	"Kentucky",
	"Louisiana",
	"Massachusetts",
	"Maryland",
	"Maine",
	"Michigan",
	"Minnesota",
	"Missouri",
	"Mississippi",
	"Montana",
	"North Carolina",
	" North Dakota",
	"Nebraska",
	"New Hampshire",
	"New Jersey",
	"New Mexico",
	"Nevada",
	"New York",
	"Ohio",
	"Oklahoma",
	"Oregon",
	"Pennsylvania",
	"Puerto Rico",
	"Rhode Island",
	"South Carolina",
	"South Dakota",
	"Tennessee",
	"Texas",
	"Utah",
	"Virginia",
	"Virgin Islands",
	"Vermont",
	"Washington",
	"Wisconsin",
	"West Virginia",
	"Wyoming"
];

const getData = searchQuery => {
	return new Promise((resolve, reject) => {
		const result = states.filter(state => {
			const queryLength = searchQuery.length;
			const stateSubStr = state.slice(0, queryLength);
			if (stateSubStr.toLowerCase() === searchQuery.toLowerCase()) {
				return state;
			}
		});
		return resolve(result);
	});
};
