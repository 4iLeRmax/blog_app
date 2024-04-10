import { NextResponse, type NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  // const currentPath = req.nextUrl.pathname;
  // const res = NextResponse.next();
  // if (currentPath.includes('/posts/')) {
  //   console.log(req.url);
  //   console.log(currentPath);
  //   const visitedPosts = req.cookies.get('visitedPosts');
  //   console.log(visitedPosts);
  //   if (visitedPosts) {
  //     if (!JSON.parse(visitedPosts.value).includes(currentPath)) {
  //       res.cookies.set(
  //         'visitedPosts',
  //         JSON.stringify([...JSON.parse(visitedPosts.value), currentPath]),
  //       );
  //     }
  //   } else {
  //     res.cookies.set('visitedPosts', JSON.stringify([currentPath]));
  //   }
  // }
  // return res;
};

// export const config = {
//   matcher: '/profile',
// };
