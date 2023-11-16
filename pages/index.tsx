import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserTable from "@/components/UserTable";
import { GetServerSidePropsContext } from "next";
import axios from "axios";

export default function Home({ users }: { users: IUser[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) window.location.href = "/login"; // Redirect to sign in if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {session?.user && <UserTable users={users} />}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  let allUsers: IUser[] = [];
  let page = 1;
  let totalPages: number;

  // Fetch all pages of user data until all pages have been fetched.
  do {
    const response = await axios.get<IApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      { params: { page } }
    );
    allUsers = [...allUsers, ...response.data.data];
    totalPages = response.data.total_pages;
    page++;
  } while (page <= totalPages);

  const filteredUsers = allUsers.filter((user) => {
    return (
      user?.first_name?.startsWith("G") || user?.last_name?.startsWith("W")
    );
  });

  return {
    props: {
      users: filteredUsers,
    },
  };
}
