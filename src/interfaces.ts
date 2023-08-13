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
  url: string;
}

export interface LoginProps {
  allUsers: IUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}
