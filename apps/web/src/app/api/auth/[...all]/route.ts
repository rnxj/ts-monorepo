import { auth } from "@repo/auth";

const handler = auth.handler;

export { handler as GET, handler as POST };
