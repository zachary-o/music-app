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
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

import "./styles.css";

const PlayerModal: FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);
  const volumeContainerRef = useRef<HTMLDivElement | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [volumePercent, setVolumePercent] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(100);

  const { allSongs, isShowModal, isPlaying, songIndex } = useAppSelector(
    (state) => state.song
  );
  const { id, title, albumName, songUrl, coverUrl, artist } = useAppSelector(
    (state) => state.song.currentSong
  );
  const dispatch = useAppDispatch();

  // AUTOMATICALLY PLAYS NEXT / PREV SONG
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
    if (!isPlaying) {
      audioRef.current?.pause();
    }
  }, [isPlaying, id]);

  // PLAY ON CLICK
  function playSong() {
    audioRef.current?.play();
    if (isPlaying === id) {
      dispatch(setIsPlaying(null));
    } else {
      dispatch(setIsPlaying(id));
    }
  }

  // PAUSE ON CLICK
  function pauseSong() {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    dispatch(setIsPlaying(null));
  }

  // PREV SONG ON CLICK
  const prevSong = () => {
    let newIndex;
    if (songIndex === 0) {
      newIndex = allSongs.length - 1;
    } else {
      newIndex = songIndex - 1;
    }

    audioRef.current?.play();
    dispatch(setSongIndex(newIndex));
    dispatch(setCurrentSong(allSongs[newIndex]));
    dispatch(setIsPlaying(newIndex + 1));
  };

  // NEXT SONG ON CLICK
  const nextSong = () => {
    let newIndex: number;
    if (songIndex < allSongs.length - 1) {
      newIndex = songIndex + 1;
    } else {
      newIndex = 0;
    }

    audioRef.current?.play();
    dispatch(setSongIndex(newIndex));
    dispatch(setCurrentSong(allSongs[newIndex]));
    dispatch(setIsPlaying(newIndex + 1));
  };

  // SETS NEXT SONG AFTER PREVIOUS ONE ENDED
  const handleSongEnded = () => {
    let newIndex;
    if (songIndex < allSongs.length - 1) {
      newIndex = songIndex + 1;
    } else {
      newIndex = 0;
    }

    dispatch(setSongIndex(newIndex));
    dispatch(setCurrentSong(allSongs[newIndex]));
    dispatch(setIsPlaying(newIndex + 1));
  };

  // UPDATES SONG PROGRESS
  const updateProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const progressPercent = (currentTime / duration) * 100;

      setProgressPercent(progressPercent);
    }
  };

  // SETS SONG PROGRESS ON CLICK
  const setProgress = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (progressContainerRef.current && audioRef.current) {
      let width = progressContainerRef.current.clientWidth;
      const offset = event.nativeEvent.offsetX;

      const songProgress = (offset / width) * 100;
      audioRef.current.currentTime =
        (songProgress / 100) * audioRef.current.duration;
    }
  };

  // REFLECTS THE CURRENT PLAYBACK TIME AND THE TOTAL DURATION OF THE AUDIO
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // FORMATS A DURATION IN MINUTES AND SECONDS
  const formatDuration = (durationSeconds: number) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  };

  // ENSURES THAT THE TOTAL DURATION OF THE AUDIO IS CORRECTLY SET
  const handleAudioLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // UPDATES VOLUME
  const updateVolume = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const volume = event.currentTarget.volume * 100;
    setVolumePercent(volume);
  };

  // SETS VOLUME ON CLICK
  const setVolume = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (volumeContainerRef.current && audioRef.current) {
      const width = volumeContainerRef.current.clientWidth;
      const offset = event.nativeEvent.offsetX;

      const newVolume = (offset / width) * 100;
      setVolumePercent(newVolume);

      audioRef.current.volume = newVolume / 100;
      setIsMuted(false);
      setPreviousVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  // TOGGLE MUTE / UNMUTE ON CLICK
  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.volume === 0) {
        audioRef.current.volume = previousVolume / 100;
        setIsMuted(false);
      } else {
        setPreviousVolume(audioRef.current.volume * 100);
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
    console.log(previousVolume);
  };

  return (
    <div
      className={isShowModal ? "player-container-active" : "player-container"}
    >
      <div className="music-container">
        <div className="modal-cover-container">
          <img src={coverUrl} alt="album cover-image" />
        </div>
        <div className="navigation-buttons">
          <BackwardIcon className="navigation-icon" onClick={prevSong} />
          {isPlaying == id ? (
            <PauseIcon className="navigation-icon big" onClick={pauseSong} />
          ) : (
            <PlayIcon className="navigation-icon big" onClick={playSong} />
          )}
          <ForwardIcon className="navigation-icon" onClick={nextSong} />
        </div>
        <div className="navigation-progress-container">
          <p className="navigation-progress-title">
            {artist} - {title}
          </p>
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
          onEnded={handleSongEnded}
          onLoadedMetadata={handleAudioLoaded}
        />
        <div className="volume-control-container">
          <div className="volume-control"></div>
          {isMuted ? (
            <SpeakerXMarkIcon className="volume-icon" onClick={toggleMute} />
          ) : (
            <SpeakerWaveIcon className="volume-icon" onClick={toggleMute} />
          )}
          <div
            className="volume-container"
            ref={volumeContainerRef}
            onClick={setVolume}
          >
            <div
              className="volume"
              style={{ width: `${volumePercent}%` }}
            ></div>
          </div>
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
