export { default } from 'next-auth/middleware';

// import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default withAuth(
//   function middleware(req: NextRequestWithAuth) {
//     if (req.nextUrl.pathname.startsWith('/dashboard')) {
//       if (req.nextauth.token?.role !== 'ADMIN') {
//         return NextResponse.redirect(new URL('/', req.url));
//       }
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   },
// );

export const config = { matcher: ['/favorites', '/dashboard'] };
