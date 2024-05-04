import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthCookies } from '@lib/utils/cookieStore'

export function middleware(request: NextRequest) {

  const accessToken = request.cookies.get('token')?.value
  console.log('access token from middleware', accessToken)
  const tokenData = getAuthCookies('token') ? getAuthCookies('token') : null

  // All admin related routes are here based on role
  // const LoggedInAdminNotAccessPaths = request.nextUrl.pathname === '/admin/login'
  // if (LoggedInAdminNotAccessPaths) {
  //   if (accessToken) {
  //     if (tokenData.role == 1) {
  //       return NextResponse.redirect(new URL("/admin/index", request.url))
  //     } else {
  //       return NextResponse.redirect(new URL("/index", request.url))
  //     }
  //   }else{
  //     return NextResponse.redirect(new URL("/admin/login", request.url))
  //   }
  // }

  const LoggedInUserNotAccessPaths = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
  if (LoggedInUserNotAccessPaths) {
    if (accessToken) {
      if (tokenData.role == 3) {
        return NextResponse.redirect(new URL("/profile", request.url))
      }
      // else if(tokenData.role == 1){
      //   return NextResponse.redirect(new URL("/admin/index", request.url))
      // }
    }
  } else {
    // 
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
}

// Paths were middleware should be apply to check
export const config = {
  matcher: [
    '/profile',
    '/login',
    '/register',
    '/tutor-details',
    // '/admin/!login',// admin/login will excluded from middleware matcher so it won't re direct to login page
    // '/admin/:path*',
  ]
}