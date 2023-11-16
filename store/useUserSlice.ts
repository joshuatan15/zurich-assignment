import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UsersState {
    users: IUser[];
    user: IUser | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    user: null,
    status: 'idle',
    error: null,
};

// // Asynchronous thunk action for fetching all users from the API.
// export const fetchAllUsers = createAsyncThunk<IUser[], void, {}>(
//     'users/fetchAllUsers',
//     async (_, { rejectWithValue }) => {
//         try {
//             let allUsers: IUser[] = [];
//             let page = 1;
//             let totalPages: number;

//             // Fetch all pages of user data until all pages have been fetched.
//             do {
//                 const response = await axios.get<IApiResponse>(`https://reqres.in/api/users`, { params: { page } });
//                 allUsers = [...allUsers, ...response.data.data];
//                 totalPages = response.data.total_pages;
//                 page++;
//             } while (page <= totalPages);

//             // Filters users based on specific criteria: first name starts with "G" or last name starts with "W".
//             const filteredUsers = allUsers.filter(user => {
//                 return user?.first_name?.startsWith('G') || user?.last_name?.startsWith('W');
//             });

//             return filteredUsers;
//         } catch (error) {
//             // Handles errors in the API request.
//             if (axios.isAxiosError(error) && error.response) {
//                 return rejectWithValue(error.response.data);
//             } else {
//                 return rejectWithValue((error as Error).message);
//             }
//         }
//     }
// );

// Slice for users containing the state, reducers, and extra reducers for handling asynchronous actions.
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Reducer to set the active user.
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     // Handles pending, fulfilled, and rejected states of the fetchAllUsers thunk.
    //     builder
    //         .addCase(fetchAllUsers.pending, (state) => {
    //             // Sets the loading state when the user fetch begins.
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchAllUsers.fulfilled, (state, action) => {
    //             // Sets the succeeded state and users list when the user fetch is successful.
    //             state.status = 'succeeded';
    //             state.users = action.payload;
    //         })
    //         .addCase(fetchAllUsers.rejected, (state, action) => {
    //             // Sets the failed state and error message when the user fetch fails.
    //             state.status = 'failed';
    //             state.error = action.payload as string;
    //         });
    // },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
