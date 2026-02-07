import { getAuth } from "@/lib/auth/server";

export async function GET(
	request: Request,
	context: { params: { path?: string[] } }
) {
	try {
		const { GET } = getAuth().handler();
		return GET(request, context);
	} catch (error) {
		console.error("Neon Auth GET handler error:", error);
		return new Response(
			JSON.stringify({ error: "Auth service unavailable" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}

export async function POST(
	request: Request,
	context: { params: { path?: string[] } }
) {
	try {
		const { POST } = getAuth().handler();
		return POST(request, context);
	} catch (error) {
		console.error("Neon Auth POST handler error:", error);
		return new Response(
			JSON.stringify({ error: "Auth service unavailable" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
