import axios from "axios";
import { IUser } from "../interfaces";

const registerUser = async (user: IUser): Promise<IUser | null> => {
  const response = await axios.post(
    "https://64d8e1085f9bf5b879cea5c2.mockapi.io/users",
    user
  );
  const data = response.data;
  return data;
};

export default registerUser;
