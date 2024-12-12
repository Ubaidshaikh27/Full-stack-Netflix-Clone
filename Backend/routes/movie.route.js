import express  from "express";
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovie, getMovieByCategory } from "../controllers/movie.controller.js"

const router = express.Router();

router.get("/trending", getTrendingMovie)  //will fetch only trending movie

router.get("/:id/trailers", getMovieTrailers)  //id over here are param which we gonna pass in movie.contollers
                                              // will fecth movie trailer with movie id

router.get("/:id/details", getMovieDetails) //will  fetch movie deatils

router.get("/:id/similar", getSimilarMovie) // will fecth similar movies with movie id

router.get("/:category", getMovieByCategory) // will fetch  categories





export default router;