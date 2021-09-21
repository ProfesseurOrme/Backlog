import { configureStore} from "@reduxjs/toolkit";
import gamesSlice from "./game";

export default configureStore({
    reducer : {
        games : gamesSlice
    }
})