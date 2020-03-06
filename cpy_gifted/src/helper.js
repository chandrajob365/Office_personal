export const debounce = (fn, limit) => {
	let timer;
	return () => {
		timer && clearTimeout(timer);
		timer = setTimeout(fn, limit);
	};
};

export const throttle = (fn, limit) => {
	let flag = true;
	return () => {
		if (flag) {
			flag = false;
			fn();
			setTimeout(() => (flag = true), limit);
		}
	};
};

export const fetchApi = url => {
	return fetch(url).then(response => response.json());
};

export const putInStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = key => {
	const item = localStorage.getItem(key);
	if (item) {
		return JSON.parse(item);
	}
	return null;
};

export const removeFromStorage = key => {
	localStorage.removeItem(key);
};
