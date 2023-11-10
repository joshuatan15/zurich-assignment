import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center px-6 py-2 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image
        src={"/images/google-icon.png"}
        alt="Google Logo"
        width={20}
        height={20}
      />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

export default GoogleSignInButton;
