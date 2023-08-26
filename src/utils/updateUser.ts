import axios from "axios";
import { IUser } from "../interfaces";

const updateUser = async (
  userId: string,
  songId: string
): Promise<IUser | null> => {
  try {
    const response = await axios.get<IUser>(
      `https://64d8e1085f9bf5b879cea5c2.mockapi.io/users/${userId}`
    );
    const userData = response.data;

    if (!userData.favorites?.includes(songId)) {
      const favoritesArray = userData.favorites || [];
      const updatedFavorites = [...favoritesArray, songId];
      const updatedResponse = await axios.put<IUser>(
        `https://64d8e1085f9bf5b879cea5c2.mockapi.io/users/${userId}`,
        {
          favorites: updatedFavorites,
        }
      );
      const updatedUserData = updatedResponse.data;
      return updatedUserData;
    } else {
      return userData;
    }
  } catch (error) {
    return null;
  }
};

export default updateUser;
