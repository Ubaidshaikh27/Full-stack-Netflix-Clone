import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";


//We are using "axios" library, instead of https or fetch

export const fetchFromTMDB = async (url) => {  // the url is mentioned or passed in movie.controller.js

    const options = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+ ENV_VARS.TMDB_API_KEY
    }
    };

    const response = await axios.get(url, options); //2 parameters 1)url , 2)options
   

    if(response.status !==200){
        throw new Error ("Failed to fetch data from TMDB" + response.statusText)
    }

    return response.data
}


