const mongoose = require('mongoose');
const cities = require('./cities');
const indCities = require('./indCities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp-practice')
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.log('connection error')
    })
mongoose.connection.on('error', console.error.bind(console, "connection error:"));

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR AUTHOR ID
            author: '62ece2ef8d0b83e66df39151',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus dicta sequi est possimus tenetur, ut tempora nobis dignissimos eius fugiat, iste, omnis quasi? Deserunt debitis numquam ea vero dolor.',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqheyftze/image/upload/v1659778440/YelpCamp/s9qxii8rzgtlto6w6qqu.jpg',
                    filename: 'YelpCamp/s9qxii8rzgtlto6w6qqu',
                },
                {
                    url: 'https://res.cloudinary.com/dqheyftze/image/upload/v1659778449/YelpCamp/ckznzl3ja3q14vq0cf47.jpg',
                    filename: 'YelpCamp/ckznzl3ja3q14vq0cf47',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});