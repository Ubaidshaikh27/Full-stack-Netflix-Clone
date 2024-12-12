import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


//The benefit of using this zustand, we can now  go in any of the pages, componenets, call this Hook (useAuthStore)
//And get any of these value
// for ecample if we want the sigup function can go to the SignUp.jsx and write there const {signup} = useAuthStore() and now we can use it here
export const useAuthStore = create((set) => ({

    //In React, a setter function (set) updates the state of a component and triggers a re-render
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,

    signup: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials)
            set({ user: response.data.user, isSigningUp: false })
            toast.success("Account Created Successfully")

        } catch (error) {
            toast.error(error.response.data.message || "Signup occurred")
            set({ isSigningUp: false, user: null })
        }
    },


    // toasts are lightweight notifications designed to mimic the push 
    // notifications that have been popularized by mobile and desktop operating systems

    // ---------------------------------------------------------------------------------------------------------------------

    login: async (credentials) => {
        set({ isLoggingIn: true })
        try {
            const response = await axios.post("/api/v1/auth/login", credentials)
            set({ user: response.data.user, isLoggingIn: false })
            toast.success("Logged In Successfully")


        } catch (error) {
            set({ isLoggingIn: false, user: null });
            toast.error(error.response.data.message || "Login failed");

        }
    },

    // ---------------------------------------------------------------------------------------------------------------------

    logout: async () => {
        set({ isLoggingOut: true })


        try {

            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully")

        } catch (error) {
            set({ isLoggingOut: false })
            toast.error(error.response.data.message || "Logout failed")

        }
    },


    // ---------------------------------------------------------------------------------------------------------------------


    //we are  just checking if the user successfully signed up, so if user successfully signup set user to response.data.user, if failed return null
    //it is basically authentication check
    authCheck: async () => {

        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null })
        }

    },

}))

//you have to be login for this function to work