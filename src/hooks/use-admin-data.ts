import { useQuery } from "@tanstack/react-query";
import { 
  getSiteSettings, getServices, getReviews, getFaqs, 
  getStates, getCities, getSubmissions 
} from "../lib/db.functions";

export type SiteSettings = {
  id: string;
  phone: string;
  phoneTel: string;
  email: string;
  address: string;
  adminDisplayName: string;
};

export type Service = {
  id: string;
  slug: string;
  iconName: string;
  title: string;
  description: string;
  tag: string;
  features: string[] | null;
  priceFrom: string;
  responseTime: string;
  sortOrder: number;
};

export type Review = {
  id: string;
  name: string;
  city: string;
  service: string;
  rating: number;
  reviewDate: string;
  body: string;
  sortOrder: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

export type CoverageState = { id: string; name: string; sortOrder: number };
export type CoverageCity = { id: string; stateId: string; name: string; sortOrder: number };

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

const DEFAULTS: SiteSettings = {
  id: "",
  phone: "(888) 555-0199",
  phoneTel: "+18885550199",
  email: "support@proleadsgeneration.com",
  address: "1200 Nationwide Blvd, Suite 500, Austin, TX 78701",
  adminDisplayName: "Admin",
};

export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings> => {
      const data = await getSiteSettings();
      if (!data) return DEFAULTS;
      return data as SiteSettings;
    },
    staleTime: 60_000,
  });
  return data ?? DEFAULTS;
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      const data = await getServices();
      return (data ?? []) as any as Service[];
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async (): Promise<Review[]> => {
      const data = await getReviews();
      return (data ?? []) as any as Review[];
    },
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async (): Promise<Faq[]> => {
      const data = await getFaqs();
      return (data ?? []) as any as Faq[];
    },
  });
}

export function useStates() {
  return useQuery({
    queryKey: ["coverage_states"],
    queryFn: async (): Promise<CoverageState[]> => {
      const data = await getStates();
      return (data ?? []) as any as CoverageState[];
    },
  });
}

export function useCities() {
  return useQuery({
    queryKey: ["coverage_cities"],
    queryFn: async (): Promise<CoverageCity[]> => {
      const data = await getCities();
      return (data ?? []) as any as CoverageCity[];
    },
  });
}

export function useSubmissions() {
  return useQuery({
    queryKey: ["contact_submissions"],
    queryFn: async (): Promise<ContactSubmission[]> => {
      const data = await getSubmissions();
      return (data ?? []) as any as ContactSubmission[];
    },
  });
}

export function useIsAdmin() {
  return useQuery({
    queryKey: ["is_admin"],
    queryFn: async (): Promise<{ isAdmin: boolean; isSuperAdmin: boolean; userId: string | null; email: string | null }> => {
      // Mocked for now, need custom auth implementation
      return {
        isAdmin: true,
        isSuperAdmin: true,
        userId: "admin",
        email: "admin@proleadsgeneration.com",
      };
    },
    staleTime: 30_000,
  });
}
