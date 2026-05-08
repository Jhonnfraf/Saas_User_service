import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
    matcher : ["/dashboard","/dashboard/:path*"]
}

export default async function middleware(request: NextRequest){ 
    console.log("MIDDLEWARE CORRIENDO:", request.nextUrl.pathname)

    const response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies:{
                getAll() {return request.cookies.getAll()},
                setAll(cookiesToSet){
                    cookiesToSet.forEach(({name,value,options}) => 
                    response.cookies.set(name,value,options))
                } 
            }
        }

    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return response
}