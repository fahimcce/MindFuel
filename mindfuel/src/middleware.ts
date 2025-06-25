import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrenUser } from "./lib/getCurrentUser";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoute;

const roleBasedRoute = {
  admin: [/^\/admin/],
  user: [/^\/user/],
};
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrenUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (user?.role && roleBasedRoute[user?.role as Role]) {
    const routes = roleBasedRoute[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:page*", "/user", "/user/:page*"],
};
