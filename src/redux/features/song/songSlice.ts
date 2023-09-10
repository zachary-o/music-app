import { createSlice } from "@reduxjs/toolkit";
import { ISong } from "../../../interfaces";

type InitialState = {
  isShowModal: boolean;
  isCurrentlyPlaying: boolean;
  isPlaying: string | null;
  currentSong: ISong;
};

const initialState: InitialState = {
  isShowModal: false,
  isCurrentlyPlaying: false,
  isPlaying: null,
  currentSong: {
    id: "",
    title: "",
    albumName: "",
    songUrl: "",
    coverUrl: "",
    artist: "",
  },
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setIsShowModal: (state, action) => {
      state.isShowModal = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsCurrentlyPlaying: (state, action) => {
      state.isCurrentlyPlaying = state.isPlaying === action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export default songSlice.reducer;
export const {
  setIsShowModal,
  setIsPlaying,
  setIsCurrentlyPlaying,
  setCurrentSong,
} = songSlice.actions;
