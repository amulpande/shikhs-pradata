import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthCookies } from '@lib/utils/cookieStore'
// roles are as 
/*
  1 : admin,
  2 : tutor,
  3 : user
*/
export async function middleware(request: NextRequest) {

  const accessToken = request.cookies.get('token')?.value

  const tokenData = getAuthCookies('token') ? getAuthCookies('token') : null
  const { pathname } = request.nextUrl

  const adminPaths = pathname.startsWith('/admin')
  const tutorPaths = pathname.startsWith('/partner')

  // login paths that should be allowed to access
  const adminLoginPath = pathname === '/admin/login'
  const tutorLoginPath = pathname === '/partner/partner-login'

  // allow access of admin login page
  if (adminLoginPath) {
    return NextResponse.next()
  }

  // allow access of tutor login page
  if (tutorLoginPath) {
    return NextResponse.next()
  }


  console.log('token role ',tokenData?.role)
  if (pathname === '/admin/index') {
    if (tokenData?.role === 1) {
      return NextResponse.next()
    }
  }

  if (adminPaths) {
    if (tokenData?.role == 1) {
      return NextResponse.next()
    }else{
        return NextResponse.redirect(new URL('/login', request.url))
    }
  }


  if (tutorPaths) {
    if (tokenData?.role == 2) {
      return NextResponse.next()
    }
    else{
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }


  const LoggedInUserNotAccessPaths = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
  if (LoggedInUserNotAccessPaths) {
    if (accessToken) {
      if (tokenData.role == 3 || tokenData.role == 2) {
        return NextResponse.next()
      }
    }
  }
  else {
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
    // '/tutor-details/:path+',
    '/my-booking',
    // '/admin/login',// admin/login will excluded from middleware matcher so it won't re direct to login page
    '/admin/:path*',
    '/partner/:path*',
  ]
}