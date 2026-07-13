import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ cause }) => {
    // Check if we are running in the browser
    if (typeof window !== "undefined") {
      // Synchronously verify browser cookies
      const hasCookie = document.cookie.split(";").some((c) => c.trim().startsWith("admin_session="));
      if (hasCookie) {
        // If cookie is present, allow execution of page logic and skip RPC checks
        return { userId: "session_active", email: null };
      }
    }

    try {
      const auth = await checkAuth();
      if (!auth || !auth.ok) {
        throw redirect({ to: "/auth" });
      }
      return { userId: (auth as any).user?.id ?? null, email: (auth as any).user?.email ?? null };
    } catch (e: any) {
      if (e?.isRedirect || e?._isRedirect || (typeof e?.statusCode === "number")) {
        throw e;
      }
      throw redirect({ to: "/auth" });
    }
  },
  component: () => <Outlet />,
});
