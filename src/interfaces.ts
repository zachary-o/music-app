export interface IUser {
  id?: string;
  userName: string;
  password: string;
  favorites?: string[];
}

export interface ILoggedUser {
  userName: string;
  password: string;
}

export interface ISong {
  id: string;
  title: string;
  albumName: string;
  songUrl: string;
  coverUrl: string;
  artist: string;
}

export interface ILoginProps {
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export interface IHomePageProps {
  allSongs: ISong[];
  loggedUser: ILoggedUser;
}
