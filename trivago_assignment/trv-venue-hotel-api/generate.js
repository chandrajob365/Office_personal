const _ = require("lodash");
const faker = require("faker");

const hotels = [];
const roomsDetail = [];
function generateHotelsAndRooms() {
    for(let i = 0; i < 6; i++) {
        const hotel_Id = faker.random.uuid();
        createHotelRooms(hotel_Id);
        hotels.push(createHotel(hotel_Id));
    }
    return {hotels, rooms: roomsDetail}
}

function createHotel(hotel_Id) {
    const amenities = ['free_parking','free_wifi','pets','restaurant','gym','pool','spa'];
    const priceCategory = ['low', 'medium', 'high'];
    return {
        id: hotel_Id,
        name: faker.company.companyName(),
        description: faker.lorem.sentence(),
        distance_to_venue: getRandomDistance(2000),
        rating: _.round(_.random(5, true),1),
        price_category:getCategory(priceCategory),
        amenities: getRandomAmenities(amenities)
    }
}

function createHotelRooms(hotel_Id) {
    const maxRooms = _.random(1, 7);
    for(let j = 0; j < maxRooms; j++) {
        roomsDetail.push(createRoom(hotel_Id));
    }
}

function createRoom(hotel_Id) {
    const roomCategory = ["Normal", "Deluxe", "Deluxe Suite"]
    const room_Id = faker.random.uuid();
    return {
        id: room_Id,
        name: getCategory(roomCategory),
        description: faker.lorem.sentence(),
        max_occupancy: _.random(1, 5),
        price_in_usd: faker.finance.amount(),
        hotelId: hotel_Id
    }

}
function getRandomInt(max) {
   return _.round(_.random(0, max - 1))
}

function getCategory(category){
    return category[getRandomInt(category.length)]
}
function getRandomAmenities(amenities) {
    const randomInt = getRandomInt(amenities.length);
    return amenities.slice(0, randomInt === 0 ? 1 : randomInt)
}

function getRandomDistance(max) {
    return getRandomInt(max)
}

module.exports = generateHotelsAndRooms;