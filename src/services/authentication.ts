import { signOut } from "next-auth/react";

export const handleSignOut = () => {
    signOut({ redirect: true }).then(() => {
        window.location.href = "/login";
    });
};