// import { NextResponse } from 'next/server'
// import acceptLanguage from 'accept-language'
// import { fallbackLng, languages, cookieName } from './app/i18n/settings'
// // import NextAuth from 'next-auth';
// // import { auth } from "./auth"
// //  import { authConfig } from './auth.config';
// // export default NextAuth(authConfig).auth;

// import authConfig from './auth.config'
// import NextAuth from "next-auth"

// const {auth}= NextAuth(authConfig)
// // export { default } from "next-auth/middleware"
// acceptLanguage.languages(languages)

// export default auth((req) =>{
// const isLoggedIn = !!req.auth
// console.log("is logged iasdasdasn", isLoggedIn)
// if(!isLoggedIn){
//   return Response.redirect(new URL("Login", nextUrl))
// }
// return Response.redirect(new URL("Login", nextUrl))
// })


// export const config = {
//   // matcher: '/:lng*'
//   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
// }

// export function middleware(req) {
//   // if (req.nextUrl.pathname.startsWith('/images')) {
//   //   return NextResponse.next();
//   // }
//   if (req.nextUrl.pathname.match(/\.(png|jpg)$/i)) {
//     return NextResponse.next();
//   }
//   let lng
//   if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
//   if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
//   if (!lng) lng = fallbackLng
//   // Redirect if lng in path is not supported
//   if (
//     !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//     !req.nextUrl.pathname.startsWith('/_next') 
//     // && !req.nextUrl.pathname.startsWith('/images')
//   ) {
//     return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
//   }

//   if (req.headers.has('referer')) {
//     const refererUrl = new URL(req.headers.get('referer'))
//     const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
//     const response = NextResponse.next()
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
//     return response
//   }

//   return NextResponse.next()
// }

import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'
import NextAuth from "next-auth"
import authConfig from './auth.config'

const { auth } = NextAuth(authConfig)
acceptLanguage.languages(languages)

export default auth((req) => {
  const isLoggedIn = req.auth

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("Login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req) {
  if (req.nextUrl.pathname.match(/\.(png|jpg)$/i)) {
    return NextResponse.next();
  }

  let lng

  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next') 
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
