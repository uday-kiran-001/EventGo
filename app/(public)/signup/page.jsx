import Link from 'next/link';
import SignupForm from '@/components/common/SignupForm';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your information to get started</p>
        </div>
        <div className="mt-6">
          <SignupForm />
        </div>
        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link className="underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}