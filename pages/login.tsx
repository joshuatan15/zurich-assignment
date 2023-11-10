import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 animate-gradient-x">
      {!session && (
        <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 animate-fadeInUp">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-700 mb-6">Welcome Back!</h1>
            <GoogleSignInButton />
            <p className="text-center text-sm text-gray-500 mt-6">
              Sign in to access your dashboard. Enjoy the seamless experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
