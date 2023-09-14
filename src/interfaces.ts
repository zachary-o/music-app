export interface IUser {
  id?: string;
  userName: string;
  password: string;
  favorites: string[];
}

export interface ISong {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}

export interface ISongCardProps {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}

export interface ILikedSongProps {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}
