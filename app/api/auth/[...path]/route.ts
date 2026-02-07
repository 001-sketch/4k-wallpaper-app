import { getAuth } from "@/lib/auth/server";

export async function GET(request: Request) {
	try {
		const { GET } = getAuth().handler();
		return GET(request);
	} catch (error) {
		console.error("Neon Auth GET handler error:", error);
		return new Response(
			JSON.stringify({ error: "Auth service unavailable" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}

export async function POST(request: Request) {
	try {
		const { POST } = getAuth().handler();
		return POST(request);
	} catch (error) {
		console.error("Neon Auth POST handler error:", error);
		return new Response(
			JSON.stringify({ error: "Auth service unavailable" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
