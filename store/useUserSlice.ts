import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the slice state
interface UsersState {
    users: IUser[];
    user: IUser | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Define the initial state using that type
const initialState: UsersState = {
    users: [],
    user: null,
    status: 'idle',
    error: null,
};

export const fetchAllUsers = createAsyncThunk<IUser[], void, {}>(
    'users/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            let allUsers: IUser[] = [];
            let page = 1;
            let totalPages: number;

            // Fetch all pages of user data
            do {
                const response = await axios.get<IApiResponse>(`https://reqres.in/api/users`, { params: { page } });
                allUsers = [...allUsers, ...response.data.data];
                totalPages = response.data.total_pages;
                page++;
            } while (page <= totalPages);

            // Filter users whose first name starts with "G" or last name starts with "W"
            const filteredUsers = allUsers.filter(user => {
                return user?.first_name?.startsWith('G') || user?.last_name?.startsWith('W');
            });

            return filteredUsers;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            } else {
                // 'any' type should be avoided, the proper Error type should be used if known
                return rejectWithValue((error as Error).message);
            }
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
