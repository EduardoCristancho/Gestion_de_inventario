/*import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async  function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  try{
    const response = await fetch('http://192.168.50.56:3001/auth/authToken',
      {
        body: JSON.stringify({
          token: token.value
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const user = await response.json();
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const res = NextResponse.next();
    res.headers.set('user', JSON.stringify(user));
    return res;
  }catch(err){
    console.log(err);
    return NextResponse.redirect(new URL('/login', request.url));        
  }
}
 
export const config = {
  matcher: [
      "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
}*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Es vital que la función se llame 'middleware' o sea el 'default export'
export function middleware(request: NextRequest) {
  // 1. Obtenemos la URL actual
  const url = request.nextUrl.clone();
  
  // 2. Simplemente retornamos 'next()' para que la solicitud continúe 
  // sin bloquear ni redirigir a nadie.
  return NextResponse.next();
}

// Opcional: Configura en qué rutas debe ejecutarse
export const config = {
  matcher: '/:path*',
};