import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'
import createIntlMiddleware from 'next-intl/middleware'
import { localePrefix, locales } from '@/navigation'
import { generatePathnameRegex } from '@/lib/utils'

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale: locales[0],
})

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const authPathnameRegex = generatePathnameRegex(authRoutes)
  const publicPathnameRegex = generatePathnameRegex(publicRoutes)
  const isPublicRoute = publicPathnameRegex.test(req.nextUrl.pathname)
  const isAuthRoute = authPathnameRegex.test(req.nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    console.log('AUTH ROUTE')
    return intlMiddleware(req)
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }
  console.log('PRIVATE OR PUBLIC ROUTE')

  return intlMiddleware(req)
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
