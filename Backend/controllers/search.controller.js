import { fetchFromTMDB } from "../services/tmdb.service.js"
import User from "../models/user.model.js"


export async function searchPerson (req, res) {

    // we will query  as a params 
    const {query} = req.params
    try {

//Here fecth result from this link and if the results lenght is equal to zero, then return 404 error
        const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (response.results.length ===0) {
            res.status(404).send(null)
        }

//NOw when the user search for something, for ecample a peron we need to save it to the search historu once the user search for a person
//Then we find the user by id which is searching it as it already login and push the date as searchHistory inside that user database
// it will contain the id of the person that we just search,  his image, title, our search type, and date 

// Id of the user will coming through request so req.user._id
//how could we get the id from the request, its because we have have Protected this route and in protectedRoute function we have added req.user = user
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date(),
                }
            }
        })

        res.status(200).json({success:true, content:response.results })


} catch (error) {
    console.log("Error in searchPerson controller: ", error.message);
    res.status(500).json({success:false, message:"Internal server error"})

}

}
//--------------------------------------------------------------------------------

export async function searchMovie (req, res) {
    const {query} = req.params
try {
    
    const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    if (response.results.length ===0) {
        res.status(404).send(null)
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push:{
            searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].title,
                searchType:"movie",
                createdAt:new Date(),
            }
        }
    })

    res.status(200).json({success:true, content:response.results })


} catch (error) {
    
    console.log("Error in searchMovie controller: ", error.message);
    res.status(500).json({success:false, message:"Internal server error"})

}

}

//--------------------------------------------------------------------------------


export async function searchTv (req, res) {

    const {query} = req.params

try {
    const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
    if (response.results.length ===0) {
        res.status(404).send(null)
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push:{
            searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].name,
                searchType:"tv",
                createdAt:new Date(),
            }
        }
    })

    res.status(200).json({success:true, content:response.results })

} catch (error) {
    console.log("Error in searchTv controller: ", error.message);
    res.status(500).json({success:false, message:"Internal server error"})
}

}

//--------------------------------------------------------------------------------


export async function getSearchHistory (req, res) {
    try {
        res.status(200).json({success:true, content:req.user.searchHistory})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})

    }
}

//--------------------------------------------------------------------------------

export async function removeItemFromSearchHistory (req, res) {
    let {id} = req.params
    id = parseInt(id); //change the requested id to number format, because by default the req.parmas returns strings


//here we once the delet method is called we find the user by id and delete the searcHistory by matching the id in the search object and id which we mentioned
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull:{
                searchHistory: {id:id},
            },
        });

        res.status(200).json({success:true, message:"Item removed from history"})


    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller: ", error.message);
        res.status(500).json({success:false, message:"Internal server error"})
}
    }


