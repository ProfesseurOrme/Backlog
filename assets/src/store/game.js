import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGamesPerUser, setGameWithUser} from "../api/ApiGames";

// I used Redux for tests purposes. Here, the use of Redux is not required for an application of this scope

export const fetchGames = createAsyncThunk(
    "games/getAllGames",
    async (_, thunkAPI) => {
        const games = await getGamesPerUser("fr")
        return games.data;
    }
);

const initialState = {
    status : "idle",
    games : []
}

export const gamesSlice = createSlice({
    name : "games",
    initialState : initialState,
    reducers : {
        selectGames(state) {
            state.current
        },
        addGame(state, action) {
            state.push(action.payload)
        },
        deleteGame(state, action) {
            state.splice(action.payload.id)
        }
    },
    extraReducers : {
        [fetchGames.pending] : (state, action) => {
            state.status = "pending"
        },
        [fetchGames.fulfilled] : (state,action) => {
            state.status = "succeeded"
            state.games = state.games.concat(action.payload)
        }
    }
})

export const {selectGame, selectGames, addGame, deleteGame} = gamesSlice.actions;

export const selectMyGames = state => state.games;

export default gamesSlice.reducer;