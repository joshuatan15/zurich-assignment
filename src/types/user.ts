interface IUser {
    id?: number;
    email: string | null;
    first_name: string | null;
    last_name?: string;
    avatar: string | null;
}

interface IApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: IUser[];
}
