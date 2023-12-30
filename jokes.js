require('dotenv').config();
const url = 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.JOKES_API_KEY,
		'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
	}
};

const getJokes = async() =>{
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result[0].joke;
    } catch (error) {
        console.error(error);
    }
}
exports.joke=()=>{
    return getJokes();
}