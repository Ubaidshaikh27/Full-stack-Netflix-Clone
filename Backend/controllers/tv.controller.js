import {fetchFromTMDB} from "../services/tmdb.service.js"

export async function getTrendingTv (req, res) {
    try {

//(There are 2 parameters 1)url , 2)options)
//It is saying that fetch the tv series form this url , and retur the json containing success:true
//and content: (which is the api response) randomMovie will give the random tv series from the api movie list
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)]  //This will give random movies from the Api movie list,, the ? questio mark is chaning, if there is null, so that our code doesnt break
    
    res.json({success:true, content:randomTv});

    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})
    }

    //This will fetch a tv series from API on route ""trending"
}


export async function getTvTrailers (req, res) {
    const { id } = req.params;

    try {
    
        const data = await fetchFromTMDB (`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)

        res.json({success:true, trailers:data.results});

    } catch (error) {
    if (error.message.includes("404")){
        return  res.status(404).send(null)
    }

    res.status(500).json({success:false, message:"Internal server error"})


}

}
//This will fetch a tv series trailer from API on route ""trailers"


export async function getTvDetails (req, res) {
    const { id } = req.params;

   try {
    const data = await fetchFromTMDB (`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
    res.status(200).json({success:true, content:data});

   } catch (error) {
    
    if (error.message.includes("404")){
        return  res.status(404).send(null)
    }

    res.status(500).json({success:false, message:"Internal server error"})

   } 
}
//This will fetch a tv series details from API on route ""details"


export async function getSimilarTvs (req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB (`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success:true, similar:data.results});
        
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})

    }
}

// This will fetch similar tv series from API route "similar"

export async function getTvsByCategory (req, res) {
    const { category } = req.params;
    try {
        
        const data = await fetchFromTMDB (`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(200).json({success:true, content :data.results});


    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})

    }
}

//This will fetch tv series categories from API route "category"