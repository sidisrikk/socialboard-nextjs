// ### redirect when access protected path
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       return !!token;
//     },
//   },
// });

// export const config = {
//   matcher: ["/home/post"],
// };

export default function middleware() {}
