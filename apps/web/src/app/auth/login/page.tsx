"use client";

import { authClient } from "@repo/auth/client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">Please sign in to continue</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="mb-6 w-full bg-white border border-gray-300 rounded-lg p-4 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          type="button"
        >
          {isLoading ? (
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" aria-label="Loading">
                <title>Loading...</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" role="img" aria-label="Google logo">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p className="text-sm text-gray-600 border-t border-gray-200 pt-4">
          By proceeding, you accept our{" "}
          <Link href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline">
            Privacy Policy
          </Link>
        </p>

        <div className="mt-8 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm text-gray-600">
            No account?{" "}
            <button
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              onClick={handleGoogleSignIn}
              type="button"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
