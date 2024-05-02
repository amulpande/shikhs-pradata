import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthCookies } from '../lib/utils/cookieStore'

export function middleware(request: NextRequest) {

  const accessToken= request.cookies.get('token')?.value
  const tokenData = getAuthCookies('token') ? getAuthCookies('token') : null
  // console.log('middle ware token data', tokenData)
  // if (tokenData) {
  //   const { access_token, refresh_token, role } = tokenData
  //   console.log('access token middleware ', access_token)
  //   console.log('refresh token middleware ', refresh_token)
  //   console.log('role token middleware ', role)
  // }

  const LoggedInUserNotAccessPaths = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
  if (LoggedInUserNotAccessPaths) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/profile", request.url))
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