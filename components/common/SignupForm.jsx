'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/app/auth/auth';
import { useState } from 'react';

const SignupForm = () => {
  const [state, setState] = useState({ errors: {}, message: '' });
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    
    const formData = new FormData(event.target);
    const result = await signup(formData);

    if (result?.errors) {
      setState({ errors: result.errors, message: '' });
    } else if (result?.message) {
      setState({ errors: {}, message: result.message });
    } else {
      // Redirect to a welcome page or login page upon successful signup
      window.location.href = '/';
    }

    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" type="name" />
        </div>
        {state.errors.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="john@example.com" type="email" />
        </div>
        {state.errors.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {state.errors.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        {state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
          {pending ? 'Submitting...' : 'Signup'}
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;