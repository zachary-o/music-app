import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  user: IUser;
  error: string;
};

const initialState: InitialState = {
  isLoading: false,
  user: {
    id: "",
    userName: "",
    password: "",
    favorites: [],
  },
  error: "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({
    formData,
    rememberAcc,
  }: {
    formData: { userName: string; password: string };
    rememberAcc: boolean;
  }) => {
    if (formData.userName.length < 6) {
      throw new Error("Login must be at least 6 characters");
    }
    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (formData.userName.trim() === "" || formData.password.trim() === "") {
      throw new Error("Enter credentials");
    }

    const response = await axios.get(
      "https://64d8e1085f9bf5b879cea5c2.mockapi.io/users"
    );

    if (formData.userName && formData.password) {
      const user = response.data.find(
        (user: IUser) =>
          user.userName === formData.userName &&
          user.password === formData.password
      );

      if (user) {
        if (rememberAcc) {
          localStorage.setItem(
            "localStorageUser",
            JSON.stringify({ ...user, favorites: user.favorites || [] })
          );
        } else {
          sessionStorage.setItem(
            "sessionStorageUser",
            JSON.stringify({ ...user, favorites: user.favorites || [] })
          );
        }
        return user;
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("User not found");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({
    formData,
    rememberAcc,
  }: {
    formData: { userName: string; password: string };
    rememberAcc: boolean;
  }) => {
    if (formData.userName.length < 6) {
      throw new Error("Login must be at least 6 characters");
    }
    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (formData.userName.trim() === "" || formData.password.trim() === "") {
      throw new Error("Enter credentials");
    }

    const fetchUsers = await axios.get(
      "https://64d8e1085f9bf5b879cea5c2.mockapi.io/users"
    );
    const users = fetchUsers.data;

    if (users.some((user: IUser) => user.userName === formData.userName)) {
      throw new Error("Username is already taken.");
    }

    const response = await axios.post<IUser>(
      "https://64d8e1085f9bf5b879cea5c2.mockapi.io/users",
      formData
    );
    const data = response.data;

    if (rememberAcc) {
      localStorage.setItem("localStorageUser", JSON.stringify(formData));
    } else {
      sessionStorage.setItem("sessionStorageUser", JSON.stringify(formData));
    }
    return data;
  }
);

export const addToFavorites = createAsyncThunk(
  "user/addToFavorites",
  async (songId: string, thunkAPI) => {
    const state = thunkAPI.getState() as { user: InitialState };
    const response = await axios.put(
      `https://64d8e1085f9bf5b879cea5c2.mockapi.io/users/${state.user.user.id}`,
      {
        favorites: [...state.user.user.favorites, songId],
      }
    );
    return response.data;
  }
);

export const removeFromFavorites = createAsyncThunk(
  "user/removeFromFavorites",
  async (songId: string, thunkAPI) => {
    const state = thunkAPI.getState() as { user: InitialState };
    const response = await axios.put(
      `https://64d8e1085f9bf5b879cea5c2.mockapi.io/users/${state.user.user.id}`,
      {
        favorites: state.user.user.favorites.filter((song) => song !== songId),
      }
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNewUserData: (state, action) => {
      state.user = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    resetUserError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = "";
      }
    );

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login failed";
    });

    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = "";
      }
    );

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Signup failed";
    });

    // Add To Favorites
    builder.addCase(addToFavorites.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      addToFavorites.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = "";
      }
    );

    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Remove From Favorites
    builder.addCase(removeFromFavorites.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      removeFromFavorites.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(removeFromFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default userSlice.reducer;
export const { setNewUserData, resetUserError } = userSlice.actions;
