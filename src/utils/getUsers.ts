import axios from "axios";
import { IUser } from "../interfaces";

const getUsers = async (): Promise<IUser[] | null> => {
  try {
    const response = await axios.get<IUser[]>(
      "https://64d8e1085f9bf5b879cea5c2.mockapi.io/users"
    );
    const data = response.data;
    return data;
  } catch (error) {
    return null;
  }
};

export default getUsers;
