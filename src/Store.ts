import {create} from "zustand"
import {devtools, persist} from "zustand/middleware";

interface TokenStore {
    token:string;
    setToken:(data:string) => void
}

// Note: IF we want to use the previous state then we can just use "state" object for that.

// Custom Hook                                      // This method return the function and the stuff inside the () will be passed as argument to that returned function
const useTokenStore = create<TokenStore>()
(
    devtools
    (
        // Note: Persist will store the state into the "LocalStorage"
        // Make is accessible event after the page reload/refresh
        persist((set) =>
        (
            {
                token: "",
                setToken: (newToken:string) => set(() => ({ token : newToken })),
            }
        )
        ,{
        name:"token-storage" // This will be the name under which it will be stored
        }
        )
    )
)



export default useTokenStore;