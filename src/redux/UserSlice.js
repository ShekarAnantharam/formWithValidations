import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state[userIndex] = { ...state[userIndex], ...updatedUser };
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.splice(userIndex, 1);
      }
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
