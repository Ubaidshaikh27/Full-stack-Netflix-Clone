import {fetchFromTMDB} from "../services/tmdb.service.js"

export async function getTrendingMovie (req, res) {
    try {

//(There are 2 parameters 1)url , 2)options)
//It is saying that fetch the movies form this url , and retur the json containing success:true
//and content: (which is the api response) randomMovie will give the random movie from the api movie list
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]  //This will give random movies from the Api movie list,, the ? questio mark is chaning, if there is null, so that our code doesnt break
    
    res.json({success:true, content:randomMovie});

    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})
    }

    //This will fetch a movie from API on route ""trending"
}


export async function getMovieTrailers (req, res) {
    const { id } = req.params;

    try {
    
        const data = await fetchFromTMDB (`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)

        res.json({success:true, trailers:data.results});

    } catch (error) {
    if (error.message.includes("404")){
        return  res.status(404).send(null)
    }

    res.status(500).json({success:false, message:"Internal server error"})


}

}
//This will fetch a movie from API on route ""trailers"


export async function getMovieDetails (req, res) {
    const { id } = req.params;

   try {
    const data = await fetchFromTMDB (`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.status(200).json({success:true, content:data});

   } catch (error) {
    
    if (error.message.includes("404")){
        return  res.status(404).send(null)
    }

    res.status(500).json({success:false, message:"Internal server error"})

   } 
}
//This will fetch a movie from API on route ""details"


export async function getSimilarMovie (req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB (`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success:true, similar:data.results});
        
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})

    }
}


export async function getMovieByCategory (req, res) {
    const { category } = req.params;
    try {
        
        const data = await fetchFromTMDB (`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(200).json({success:true, content :data.results});


    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})

    }
}

