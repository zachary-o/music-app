import { FC, useRef, useState } from "react";
import { IPlayerModalProps } from "../../interfaces";

import {
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

import "./styles.css";

const PlayerModal: FC<IPlayerModalProps> = ({
  isShowModal,
  setIsShowModal,
  currentlyPlaying,
  setCurrentlyPlaying,
  allSongs,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);
  const volumeContainerRef = useRef<HTMLDivElement | null>(null);
  const [songIndex, setSongIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [volumePercent, setVolumePercent] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playingSong, setPlayingSong] = useState(false);

  // const isCurrentlyPlaying: boolean = currentlyPlaying === id;
  // const togglePlaying = () => {
  //   if (isCurrentlyPlaying) {
  //     setCurrentlyPlaying(null);
  //   } else {
  //     setCurrentlyPlaying(id);
  //     setIsShowModal(true);
  //   }
  // };

  const playSong = () => {
    audioRef.current?.play();
    setPlayingSong(false);
  };

  const pauseSong = () => {
    audioRef.current?.pause();
    setPlayingSong(true);
  };

  const prevSong = () => {
    if (songIndex === 0) {
      setSongIndex(allSongs.length - 1);
      setTimeout(() => {
        playSong();
      }, 100);
    }
    if (songIndex < allSongs.length && songIndex !== 0) {
      setSongIndex((prev) => prev - 1);
      setTimeout(() => {
        playSong();
      }, 100);
    }

    console.log(songIndex);
  };

  const nextSong = () => {
    if (songIndex < allSongs.length - 1) {
      setSongIndex((prev) => prev + 1);
      setTimeout(() => {
        playSong();
      }, 100);
    }

    if (songIndex === allSongs.length - 1) {
      setSongIndex(0);
    }
    console.log(songIndex);
  };

  if (audioRef.current) {
    if (audioRef.current.currentTime === audioRef.current.duration) {
      nextSong();
      audioRef.current.currentTime = 0;
    }
  }

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
          <img src={allSongs[songIndex].coverUrl} alt="" />
        </div>
        <p>{allSongs[songIndex].title}</p>
        <div className="navigation-progress-container">
          <div className="navigation">
            <BackwardIcon className="navigation-icon" onClick={prevSong} />
            {playingSong ? (
              <PlayIcon className="navigation-icon big" onClick={playSong} />
            ) : (
              <PauseIcon className="navigation-icon big" onClick={pauseSong} />
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
          src={allSongs[songIndex].songUrl}
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
            setIsShowModal(false);
            setCurrentlyPlaying(null);
          }}
          className="close-modal-icon"
        />
      </div>
    </div>
  );
};
export default PlayerModal;
