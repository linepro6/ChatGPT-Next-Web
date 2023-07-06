import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/:path*'],
}

const users = (process.env.BASIC_AUTH ?? btoa("admin:admin")).split(";");

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    // const [user, pwd] = atob(authValue).split(':')

    if (users.includes(authValue)) {
      return NextResponse.next();
    }
  }

  return new Response(
    "",
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
        "Content-Type": 'text/html; charset=utf-8'
      },
    }
  );
}
