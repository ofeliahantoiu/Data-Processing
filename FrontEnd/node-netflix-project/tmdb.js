const axios = require("axios");

const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const baseUrl = "https://api.themoviedb.org/3/";

// Function to get popular movies
const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseUrl}movie/popular`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results; // Returns the list of popular movies
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

module.exports = { getPopularMovies };
