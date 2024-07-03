import LoginForm from "@/components/common/LoginForm";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}