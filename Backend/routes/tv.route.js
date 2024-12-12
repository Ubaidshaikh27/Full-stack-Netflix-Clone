import express  from "express";
import { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory } from "../controllers/tv.controller.js";

const router = express.Router();



router.get("/trending", getTrendingTv)  //will fetch only trending movie

router.get("/:id/trailers", getTvTrailers)  //id over here are param which we gonna pass in movie.contollers
                                              // will fecth movie trailer with movie id

router.get("/:id/details", getTvDetails) //will  fetch movie deatils

router.get("/:id/similar", getSimilarTvs) // will fecth similar movies with movie id

router.get("/:category", getTvsByCategory) // will fetch  categories






export default router;