    import axios from "axios";
    import * as cheerio from "cheerio";


    const BASE_URL = `${import.meta.env.VITE_BASE_URL}`; // Adjust to your backend URL

    export const getList = () => {
        return axios.get(`${BASE_URL}/getStationList`);
      };

    // export const getList = async (searchData) => {
    //     debugger
    // try {
    //     const { data } = await axios.get('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/List_of_railway_stations_in_India');
    //     const $ = cheerio.load(data);

    //     const stations = [];
    //     $('table.wikitable tbody tr').each((index, element) => {
    //     const name = $(element).find('td:nth-child(2)').text().trim();
    //     const code = $(element).find('td:nth-child(3)').text().trim();

    //     if (name && code) {
    //         stations.push({ name, code });
    //     }
    //     });

    //     console.log(stations);
    //     return stations
    // } catch (error) {
    //     console.error('Error scraping station data:', error);
    // }
    // };


