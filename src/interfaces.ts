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

export interface ILayoutProps {
  allSongs: ISong[];
}

export interface ISideBadProps {
  allSongs: ISong[];
}

export interface IHomePageProps {
  allSongs: ISong[];
}

export interface ISongCardProps {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
  allSongs: ISong[];
}

export interface IPlayerModalProps {
  allSongs: ISong[];
}

export interface ILikedSongProps {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}
