import { NextResponse } from 'next/server';
import { decrypt } from '@/app/auth/stateless-session';
import { cookies } from 'next/headers';

// Specify protected and public routes
const protectedRoutes = ['/events', '/profile'];
const publicRoutes = ['/login', '/signup', '/'];

const containsProtectedRoute = (path) => {
  return protectedRoutes.some(route => path.startsWith(route));
};

export default async function middleware(req) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  // console.log("path: ", path);
  const isProtectedRoute = containsProtectedRoute(path);
  const isPublicRoute = publicRoutes.includes(path);
  
  // Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // if (
  //   isPublicRoute && // checks if the current route is listed in the publicRoutes
  //   session?.userId && // checks if the user is logged in.
  //   !req.nextUrl.pathname.startsWith('/events') // This is to avoid redirecting users who are already on the '/events' route.
  // ) {
  //   return NextResponse.redirect(new URL('/events', req.nextUrl));
  // }

  return NextResponse.next();
}
