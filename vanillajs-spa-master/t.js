const mainCardsData = [
	{
		//description: 'Click on below button for Missed Connection',
		pictureUrl: "IMAGE_FLIGHT_CONN",
		action: "MISSED_CONNECTING_FLIGHTS"
	},
	{
		//description: 'Click on below button for Baggage Status',
		pictureUrl: "IMAGE_LOST_BAGGAGE",
		action: "DELAYED_BAGGAGES"
	},
	{
		//description: 'Click on below button for Destination Explorer',
		pictureUrl: "IMAGE_DESTINATION_EXPLORER",
		action: "DESTINATION_EXPLORER"
	},
	{
		//description: 'Click on below button for Inflight eCommerce',
		pictureUrl: "IMAGE_E_COMMERCE",
		action: "E_COMMERCE"
	}
];
let newCards = [];
for (let i = 0; i < mainCardsData.length; i++) {
	let tempCard = { ...mainCardsData[i] };
	delete tempCard.action;
	newCards.push(tempCard);
}

console.log(newCards);
console.log(mainCardsData);
