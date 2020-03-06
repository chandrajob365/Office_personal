let person1 = {
	name: "manish",
	age: 12,
	address: { line1: "b1", line2: "b2" }
};

let person2 = { ...person1 };
function deepCopy(obj1) {
	function recurseDeeply(obj1, newObj) {
		for (let [key, value] of Object.entries(obj1)) {
			if (typeof value === "object") {
				newObj[key] = recurseDeeply(value, {});
			} else {
				newObj[key] = value;
			}
		}
		return newObj;
	}
	return recurseDeeply(obj1, {});
}

console.log(deepCopy(person1));
