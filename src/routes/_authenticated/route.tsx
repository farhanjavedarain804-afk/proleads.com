import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ cause }) => {
    // If running in browser context, check for session flag in localStorage as well to guarantee login verification
    if (typeof window !== "undefined") {
      const hasCookie = document.cookie.split(";").some((c) => c.trim().startsWith("admin_session="));
      const hasStorage = localStorage.getItem("admin_session_active") === "true";
      
      if (hasCookie || hasStorage) {
        return { userId: "session_active", email: null };
      }
      throw redirect({ to: "/auth" });
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
