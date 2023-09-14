import { FC, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  setCurrentSong,
  setIsPlaying,
  setIsShowModal,
  setSongIndex,
} from "../../redux/features/song/songSlice";

import {
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

import "./styles.css";

const PlayerModal: FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);
  const volumeContainerRef = useRef<HTMLDivElement | null>(null);
  // const [songIndex, setSongIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [volumePercent, setVolumePercent] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { allSongs, isShowModal, isPlaying, songIndex } = useAppSelector(
    (state) => state.song
  );
  const { id, title, albumName, songUrl, coverUrl, artist } = useAppSelector(
    (state) => state.song.currentSong
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(songIndex);
  }, [songIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
    if (!isPlaying) {
      audioRef.current?.pause();
    }
  }, [isPlaying, id]);

  function playSong() {
    audioRef.current?.play();
    if (isPlaying == id) {
      dispatch(setIsPlaying(null));
    } else {
      dispatch(setIsPlaying(id));
    }
  }
  
  function pauseSong() {
    audioRef.current?.pause();
    if (isPlaying == id) {
      dispatch(setIsPlaying(null));
    } else {
      dispatch(setIsPlaying(id));
    }
  }

  const prevSong = () => {
    let newIndex;
    if (songIndex === 0) {
      newIndex = allSongs.length - 1;
    } else {
      newIndex = songIndex - 1;
    }

    dispatch(setSongIndex(newIndex));
    dispatch(setCurrentSong(allSongs[newIndex]));
    dispatch(setIsPlaying(newIndex + 1));
    audioRef.current?.play();

    console.log(isPlaying === id, "id: ", id, "isPlaying: ", isPlaying);
  };

  const nextSong = () => {
    let newIndex;
    if (songIndex < allSongs.length - 1) {
      newIndex = songIndex + 1;
    } else {
      newIndex = 0;
    }

    dispatch(setSongIndex(newIndex));
    dispatch(setCurrentSong(allSongs[newIndex]));
    dispatch(setIsPlaying(newIndex + 1));
    audioRef.current?.play();

    console.log(isPlaying === id, "id: ", id, "isPlaying: ", isPlaying);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const progressPercent = (currentTime / duration) * 100;

      setProgressPercent(progressPercent);
    }
  };

  const setProgress = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (progressContainerRef.current && audioRef.current) {
      let width = progressContainerRef.current.clientWidth;
      const offset = event.nativeEvent.offsetX;

      const songProgress = (offset / width) * 100;
      audioRef.current.currentTime =
        (songProgress / 100) * audioRef.current.duration;
    }
  };

  const updateVolume = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const volume = event.currentTarget.volume * 100;
    setVolumePercent(volume);
  };

  const setVolume = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (volumeContainerRef.current && audioRef.current) {
      const width = volumeContainerRef.current.clientWidth;
      const offset = event.nativeEvent.offsetX;

      const newVolume = (offset / width) * 100;
      setVolumePercent(newVolume);

      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatDuration = (durationSeconds: number) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div
      className={isShowModal ? "player-container-active" : "player-container"}
    >
      <div className="music-container">
        <div className="modal-cover">
          <img src={coverUrl} alt="" />
        </div>
        <p>{title}</p>
        <div className="navigation-progress-container">
          <div className="navigation">
            <BackwardIcon className="navigation-icon" onClick={prevSong} />
            {isPlaying == id ? (
              <PauseIcon className="navigation-icon big" onClick={pauseSong} />
            ) : (
              <PlayIcon className="navigation-icon big" onClick={playSong} />
            )}
            <ForwardIcon className="navigation-icon" onClick={nextSong} />
          </div>
          <div className="progress-control">
            <p>{formatDuration(currentTime)}</p>
            <div
              className="progress-container"
              ref={progressContainerRef}
              onClick={(event) => setProgress(event)}
            >
              <div
                className="progress"
                ref={progressRef}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p>{formatDuration(duration)}</p>
          </div>
        </div>

        <audio
          src={songUrl}
          ref={audioRef}
          onTimeUpdate={() => {
            updateProgress();
            handleTimeUpdate();
          }}
          onVolumeChange={updateVolume}
        />
        <div className="volume-control"></div>
        <SpeakerWaveIcon className="volume-icon" />
        <div
          className="volume-container"
          ref={volumeContainerRef}
          onClick={setVolume}
        >
          <div className="volume" style={{ width: `${volumePercent}%` }}></div>
        </div>

        <XMarkIcon
          onClick={() => {
            dispatch(setIsShowModal(false));
            dispatch(setIsPlaying(null));
          }}
          className="close-modal-icon"
        />
      </div>
    </div>
  );
};
export default PlayerModal;
