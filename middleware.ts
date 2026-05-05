import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function normalizeRedirectLocation(request: NextRequest, location: string) {
  try {
    const redirectUrl = new URL(location);
    const requestHost = request.headers.get("x-forwarded-host") ??
      request.headers.get("host");

    if (!requestHost) {
      return location;
    }

    const requestUrl = new URL(`${request.nextUrl.protocol}//${requestHost}`);

    if (
      redirectUrl.hostname === requestUrl.hostname &&
      redirectUrl.port === "3218" &&
      !requestUrl.port
    ) {
      redirectUrl.port = "";
      return redirectUrl.toString();
    }

    return location;
  } catch {
    return location;
  }
}

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const location = response.headers.get("location");

  if (location) {
    response.headers.set(
      "location",
      normalizeRedirectLocation(request, location)
    );
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/", "/(id|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
