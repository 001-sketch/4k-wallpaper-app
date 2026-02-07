import { getAuth } from "@/lib/auth/server";

export async function GET(request: Request) {
	const { GET } = getAuth().handler();
	return GET(request);
}

export async function POST(request: Request) {
	const { POST } = getAuth().handler();
	return POST(request);
}
