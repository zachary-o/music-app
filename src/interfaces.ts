export interface IUser {
  id?: string;
  userName: string;
  password: string;
  favorites?: string[];
}

export interface ISong {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}

export interface ILoggedUser {
  userName: string;
  password: string;
}

export interface ILoginProps {
  allUsers: IUser[] | null;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
}

export interface ILayoutProps {
  loggedUser: ILoggedUser;
  allUsers: IUser[] | null;
  allSongs: ISong[];
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISideBadProps {
  loggedUser: ILoggedUser;
  allUsers: IUser[] | null;
  allSongs: ISong[];
}

export interface IHomePageProps {
  allSongs: ISong[];
  loggedUser: ILoggedUser;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  allUsers: IUser[] | null;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
}

export interface ISongCardProps {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
  allSongs: ISong[];
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentlyPlaying: string | null;
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<string | null>>;
  allUsers: IUser[] | null;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
  loggedUser: ILoggedUser;
}

export interface IPlayerModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILikedSongProps {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}
