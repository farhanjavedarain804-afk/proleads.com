import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const auth = await checkAuth();
      if (!auth || !auth.ok) {
        throw redirect({ to: "/auth" });
      }
      return { userId: auth.user.id, email: auth.user.email };
    } catch (e) {
      throw redirect({ to: "/auth" });
    }
  },
  component: () => <Outlet />,
});
