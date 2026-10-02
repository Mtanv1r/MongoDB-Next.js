import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // if session is not found go to dashboard and log in first 

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard","/profile"], // Specify the routes the middleware applies to
};