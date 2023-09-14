import { createSlice } from "@reduxjs/toolkit";
import { ISong } from "../../../interfaces";

type InitialState = {
  allSongs: ISong[];
  isShowModal: boolean;
  // isCurrentlyPlaying: boolean;
  isPlaying: string | null;
  currentSong: ISong;
  songIndex: number;
};

const initialState: InitialState = {
  allSongs: [],
  isShowModal: false,
  // isCurrentlyPlaying: false,
  isPlaying: null,
  currentSong: {
    id: "",
    title: "",
    albumName: "",
    songUrl: "",
    coverUrl: "",
    artist: "",
  },
  songIndex: 0,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    setIsShowModal: (state, action) => {
      state.isShowModal = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    // setIsCurrentlyPlaying: (state, action) => {
    //   state.isCurrentlyPlaying = state.isPlaying == action.payload;
    // },
    setSongIndex: (state, action) => {
      state.songIndex = action.payload;
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
  setCurrentSong,
  setAllSongs,
  setSongIndex,
} = songSlice.actions;
