import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ cause }) => {
    // On initial load or navigation, verify the session cookie via server RPC
    try {
      const auth = await checkAuth();
      if (!auth || !auth.ok) {
        // Not authenticated — redirect to login
        throw redirect({ to: "/auth" });
      }
      // Pass user info down to child routes via context
      return { userId: (auth as any).user?.id ?? null, email: (auth as any).user?.email ?? null };
    } catch (e: any) {
      // Re-throw TanStack redirects as-is; only catch real errors
      if (e?.isRedirect || e?._isRedirect || (typeof e?.statusCode === "number")) {
        throw e;
      }
      // Any other error (network, serialization, etc.) → go to login
      throw redirect({ to: "/auth" });
    }
  },
  component: () => <Outlet />,
});
