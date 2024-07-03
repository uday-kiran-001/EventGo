'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/app/auth/auth';
import { useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
  const [state, setState] = useState({ errors: {}, message: '' });
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    
    const formData = new FormData(event.target);
    const result = await login(formData);

    if (result?.errors) {
      setState({ errors: result.errors, message: '' });
    } else if (result?.message) {
      setState({ errors: {}, message: result.message });
    } else {
      // Redirect to a welcome page upon successful login
      window.location.href = '/';
    }

    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="m@example.com" type="email" />
        </div>
        {state.errors.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" />
        </div>
        {state.errors.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
        {state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
          {pending ? 'Submitting...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm