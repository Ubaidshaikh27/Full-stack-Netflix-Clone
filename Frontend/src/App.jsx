import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import WatchPage from "./pages/WatchPage"
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";
import{ Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";



function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();
  

  useEffect(() => {  ///run in useEffect so that the authCheck only run once
    authCheck();
  }, [authCheck]);

//we are checking if the user is already logged in thenn dont show login page, show loading instead
  if(isCheckingAuth){
    return (
        <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader  className='animate-spin text-red-600 size-10' />
        </div>

        </div>
    );
  }


  return  (
    <>
      <Routes>
              <Route path='/' element={<HomePage />}/>

              <Route path='/login' element={!user ? <LoginPage />: <Navigate to={"/"} /> } />

        {/* It says if the user visiting the signup page and if we dont have the user show them the signup page and if the user is Authenticated navigate them to the {"/"} home page */}
              <Route path='/signup' element={!user ? <SignUpPage />: <Navigate to={"/"} /> } /> 

             <Route path='/watch/:id' element={user ? <WatchPage />: <Navigate to={"/login"} /> } />      
            {/* If we have user than they will be able to go to the watch page if not they will go to login page */}
      
            <Route path='/search' element={user ? <SearchPage />: <Navigate to={"/login"} /> } />      

            <Route path='/history' element={user ? <SearchHistoryPage />: <Navigate to={"/login"} /> } />      

            <Route path='/*' element={<NotFoundPage />} />      
            {/* if any of these routes didnt match, lets return a 404 page */}
      </Routes>
      <Footer />
      <Toaster/>
      </>
  )
  
}

export default App;
