import { create } from "zustand";

export  const useContentStore = create((set) => ({
    contentType: "movie",  //initial state
    setContentType:(type) => set({contentType:type})  //setContentType=just take the type and update the state with it, so (type) will be either movie or tv
})) //we will be able to call this function and update the state