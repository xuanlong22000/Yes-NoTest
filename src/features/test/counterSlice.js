import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listPlayer: [],
  indexPlayer: 0,
  listRound: [],
  idInitPlayer: 1,
  resultAPI: [],
  results: [],
  finalResult: {},
};

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {}
// );

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reloadLocal: (state, action) => {
      state.listPlayer = [];
      state.indexPlayer = 0;
      state.listRound = [];
      state.idInitPlayer = 1;
      state.resultAPI = [];
      state.results = [];
      state.finalResult = {};
    },
    savePlayer: (state, action) => {
      state.listPlayer.push(action.payload);
    },

    nextPlayer: (state, action) => {
      state.indexPlayer += 1;
    },

    increIdPlayer: (state, action) => {
      state.idInitPlayer += 1;
    },
    saveListRound: (state, action) => {
      const data = action.payload.map((item) => item + 1);
      state.listRound = data;
    },
    saveResult: (state, action) => {
      state.results = [...state.results, ...action.payload];
    },
    saveResultApi: (state, action) => {
      state.resultAPI.push(action.payload);
    },
    saveFinalResult: (state, action) => {
      // state.finalResult.push(action.payload);
      const data = action.payload;

      if (!state.finalResult[data.player]) {
        state.finalResult[data.player] = {
          id: "",
          namePlayer: "",
          answerPlayer: [],
          answerApi: [],
          score: 0,
          date: [],
        };
      }
      state.finalResult[data.player].id = data.id;
      state.finalResult[data.player].namePlayer = data.player;
      state.finalResult[data.player].answerPlayer.push(data.answer);
      state.finalResult[data.player].answerApi.push(data.result);
      if (data.answer === data.result) {
        state.finalResult[data.player].score =
          state.finalResult[data.player].score + 1;
      }
      state.finalResult[data.player].date.push(data.date);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});

export const {
  savePlayer,
  increIdPlayer,
  saveListRound,
  saveResult,
  nextPlayer,
  saveResultApi,
  reloadLocal,
  saveFinalResult,
} = counterSlice.actions;

// export const listPlayer = (state) => state.counter.listPlayer;
// export const idInitPlayer = (state) => state.counter.idInitPlayer;
// export const indexPlayer = (state) => state.counter.indexPlayer;
// export const listRound = (state) => state.counter.listRound;
// export const resultAPI = (state) => state.counter.resultAPI;
// export const results = (state) => state.counter.results;

export const listPlayer = (state) => state.counter.counter.listPlayer;
export const idInitPlayer = (state) => state.counter.counter.idInitPlayer;
export const indexPlayer = (state) => state.counter.counter.indexPlayer;
export const listRound = (state) => state.counter.counter.listRound;
export const resultAPI = (state) => state.counter.counter.resultAPI;
export const results = (state) => state.counter.counter.results;
export const finalResult = (state) => state.counter.counter.finalResult;

export default counterSlice.reducer;
