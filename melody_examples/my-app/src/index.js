import { render, createComponent } from "melody-component";
// import home from "./home";

// const documentRoot = document.getElementById("root");
// render(documentRoot, home, {
// 	message: "Welcome to Melody!"
// });

// import buttons from "./button.twig";
// const documentRoot = document.getElementById("root");
// const component = createComponent(buttons);
// render(documentRoot, component, {
// 	counterButtons: [
// 		{ color: "green", text: "Increment" },
// 		{ color: "red", text: "decrement" }
// 	]
// });

import Counter from "./counter";
const documentRoot = document.getElementById("root");
render(documentRoot, Counter, { counter: 1 });
