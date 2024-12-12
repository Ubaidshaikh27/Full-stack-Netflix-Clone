import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../hooks/utils/constants';
import { formatReleaseDate } from "../hooks/utils/dateFunction"
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';






// FUNCTION STARTS HERE

const WatchPage = () => {



    //   const params = useParams()
    const { id } = useParams();
    const [trailers, settrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0)
    //we use index in use state, so that we can naviget between the trailers, ex > when clicked this it will be incremented, < when clicked this it will be decremented. 

    const [loading, setLoading] = useState(true);
    //so that we can have some kind of loading spinner on the screen, by default it is true
    const [content, setContent] = useState({})
    //this is either movie details, or Tv details
    const [similarContent, setSimilarContent] = useState([]);

    const { contentType } = useContentStore();
    // content type coming from our hook, usecontentstore

    const sliderRef = useRef(null)




    //this useeffect will fetch the triler whenver contentType changes and whenever the ID chnages as well.
    //Here getTriler is a function, in which we said try to get the trailers from Api and if got it, setTrailer state to the response data of api
    //if we doesnt get it and the response message is 404 set trailer state to nothing
    useEffect(() => {
        const getTrailers = async () => {
            try {
                //get the trailers from the api endpoint, here contentType= movie or tv, id will be their id, which will be passed through params
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                settrailers(res.data.trailers)

            } catch (error) {
                if (error.message.includes('404'))
                    settrailers([])

            }
        }

        getTrailers();
    }, [contentType, id]);






    //This is same as useeffect fro trailers
    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                //get the trailers from the api endpoint, here contentType= movie or tv, id will be their id, which will be passed through params
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar)

            } catch (error) {
                if (error.message.includes('404'))
                    setSimilarContent([])

            }
        }

        getSimilarContent()
    }, [contentType, id])


    //   this Useeffect is same but the api calls for content details, content = movie or Tv.
    //try geting the details from endpoint and set content state to the data which received.
    //and if all is done finally set the loading to false.
    useEffect(() => {
        const getContentDetails = async () => {
            try {
                //get the trailers from the api endpoint, here contentType= movie or tv, id will be their id, which will be passed through params
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content)

            } catch (error) {
                if (error.message.includes('404'))
                    setContent(null)

            } finally {
                setLoading(false)
            }
        }

        getContentDetails()
    }, [contentType, id])





    //if the cuurent trailer index is  greter than 0, minus one index whenever we click on the button and the handlePrev fubction is called
    const handlePrev = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1)
        }
    }

    //if the current tariler index is less than trailer on the last index, increment it by 1 whenever we click on the button
    const handleNext = () => {

        if (currentTrailerIdx < trailers.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx + 1)
        }
    }




    //scrollBy is method in react, useRef is react function
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' })
        }
    }


    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' })
        }
    }


	if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<WatchPageSkeleton />
			</div>
		);

	if (!content) {
		return (
			<div className='bg-black text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}





    return <div className='bg-black min-h-screen text-white'>

        <div className='mx-auto container px-4 py-8 h-full'>
            <Navbar />

            {trailers.length > 0 && (
                <div className='flex justify-between items-center mb-4'>



                    {/* if you are on indext zero it will be disabled and if you are not on the first one, this will work */}
                    <button
                        className={`
        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
                            }}
        `}
                        disabled={currentTrailerIdx === 0}
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* if you are on the last trailer (trailers.length -1 )it will be disabled and if you are not on the last one, this will work */}

                    <button
                        className={`
        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed " : ""
                            }}
        `}
                        disabled={currentTrailerIdx === trailers.length - 1}
                        onClick={handleNext}
                    >
                        <ChevronRight size={24} />
                    </button>


                </div>
            )}




            {/* We will be using the React-player package to screen the video
Each youtube video has an ID, and if we take this id and put it in the React-player
It will be able to display the video */}

            <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                {/* if trailers length is less than zero the show trailer, url will be youtube.com and trailer ID  */}
                {trailers.length > 0 && (
                    <ReactPlayer
                        controls={true}
                        width={"100%"}
                        height={"70vh"}
                        className="mx-auto overflow-hidden rounded-lg"
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                    />
                )}

                {/* if trailers length is equal to zero than  show "no trailers avaliable"  for movie ad tv shows*/}
                {trailers?.length === 0 && (
                    <h2 className='text-xl text-center mt-5'>
                        No trailers avaliable for{" "}
                        <span className='font-bold text-red-600'>{content?.title || content?.name}</span>
                        😢
                    </h2>
                )}
            </div>






            {/* MOVIE DETAILS */}

            <div
                className='flex flex-col md:flex-row items-center justify-between gap-20 
    max-w-6xl mx-auto'
            >
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>


                    {/* Paragraph elemnet contains- (formatReleaseDate) which is a function
    if we get movie then it will give content release_date
    if we get Tv show it will give content first_air_date
    Also if it is 18+ or PG-13 */}

                    <p className='mt-2 text-lg'>
                        {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
                        {content?.adult ? (
                            <span className=' text-red-600 '>18+</span>
                        ) : (
                            <span className='text-green-600'>PG-13</span>
                        )} {" "}

                    </p>

                    <p className='mt-4 text-lg'>{content?.overview}</p>


                </div>

                <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt='poster image'
                    className=' max-h-[600px] rounded-md'
                />

            </div>

            {similarContent.length > 0 && (
                <div className='mt-12 max-w-5xl mx-auto relative'>
                    <h3 className=' text-3xl font-bold mb-4'>
                        Similar Movies/Tv Shows
                    </h3>

                    <div className=' flex overflow-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef} >
                        {similarContent.map((content) => {

                            if(content.poster_path === null) return null;
                            return(
                                <Link key={content.id} to={`/watch/${content.id}`}
                                className='w-52 flex-none'
                            >
                                <img src={SMALL_IMG_BASE_URL + content.poster_path} alt='poster path'
                                    className='w-full h-auto rounded-md'
                                />
                                <h4 className='mt-2 text-lg font-semibold'>
                                    {content.title || content.name}
                                </h4>
                            </Link>
                            )

                        })}

                        <ChevronRight
                            className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full'
                            onClick={scrollRight}
                        />
                        <ChevronLeft
                            className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full'
                            onClick={scrollLeft}
                        />
                    </div>
                </div>
            )}

        </div>

    </div>
}

export default WatchPage;