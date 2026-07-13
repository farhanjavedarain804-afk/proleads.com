import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as createSsrRpc } from "./createSsrRpc-CndIQOhp.js";
import { useQuery } from "@tanstack/react-query";
//#region src/lib/db.functions.ts
var getSiteSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("fd6e64b5f10846c33ddc7bab3c2731274572cf516391d28fc92b58a737e8e0a3"));
var getServices = createServerFn({ method: "GET" }).handler(createSsrRpc("7cd38c34f3478e4d82410577a6c35b0a49c6d6ee4325dfdd8ef5f42775623a8b"));
var getReviews = createServerFn({ method: "GET" }).handler(createSsrRpc("5ec750b950ef62f1c7e06cce3d85a540317e86e4be6b993834affe4661423553"));
var getFaqs = createServerFn({ method: "GET" }).handler(createSsrRpc("3e0194913b502f59ee60cd56a39982162c2cce2032d97cf72c251035ec86ea35"));
var getStates = createServerFn({ method: "GET" }).handler(createSsrRpc("046a3f2d423af13512e00fb3137ecb434097c1a9849ad0520778c8f6d180c7d1"));
var getCities = createServerFn({ method: "GET" }).handler(createSsrRpc("71f1a94ed4125b9e79a6a530f27b5fc1651888ef77c2c4d44a73a819bba6bae2"));
var getSubmissions = createServerFn({ method: "GET" }).handler(createSsrRpc("9d1ce6359da5600e75c9fc5893e628ec925c1b4cd984ce46fca696f38e82b2e3"));
var submitContactForm = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d0a420131f247c66166edbdf465afe41839f90c990c231e6cdc82fbf2cb6fc44"));
var deleteSubmission = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3960979a9879b612f00e9f02fbfe05820d46a8a500329de1417dab5a073ef748"));
var markSubmissionRead = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("1697527c3f15b05b577d222cc6810a7433f5d5a3e28a7813a7b8dc7ad320747c"));
var updateSubmission = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c87bc057a35726fe66126d62c5cd2ae652d64d3d78e17bd0b41bf1d573530828"));
var updateSiteSettings = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("bf1338d1bb5f19c85e8494c815be33c7ef3a0987c79ae7143cb4d9f9850f1e82"));
var upsertFaq = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("fa36e196cc7f2692c7df67c644678292d32d3f952b84dfec7c036c63f05d4483"));
var deleteFaq = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c3c9f099855be44605824e184d5af8882a804b8a93e9cf80025bf82ec81dd73c"));
var upsertReview = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("fa8f0cb98d3da175d5e0149abe439280f047216a7a579bf35572a467c27efef5"));
var deleteReview = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3a7fd41000a308dd3e61c3fafc6ad59776026810422e89cd1f4ff2720dfa10a0"));
var upsertService = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("51f2f2ca5e6afd05e31768d4ff6c43ab57820e6356c68debc313e7316f0bbe92"));
var deleteService = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a1100b06089ab9138ca628f3b6df61df1b74b5af7e950a112c8ff97651377767"));
var addState = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c36eafb1fc35a4b09780bdf3d595d57a7de8d58c50e9fe1c9bf752d64af3f936"));
var deleteState = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a58af64f544968d56d3b07dc67fa3dab1a83b2daf586ee2698587d9a3d3c8243"));
var addCity = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("00a5dfc06f347e4e690fb0b2cdc3cc6edfc1251bd39880847df0b95d05e00994"));
var deleteCity = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("097f0f15ce8b384362723306b5e38a288245ee812ad4af0598cd8900b1d17d40"));
//#endregion
//#region src/hooks/use-admin-data.ts
var DEFAULTS = {
	id: "",
	phone: "(888) 555-0199",
	phoneTel: "+18885550199",
	email: "support@proleadsgeneration.com",
	address: "1200 Nationwide Blvd, Suite 500, Austin, TX 78701",
	adminDisplayName: "Admin"
};
function useSiteSettings() {
	const { data } = useQuery({
		queryKey: ["site_settings"],
		queryFn: async () => {
			const data = await getSiteSettings();
			if (!data) return DEFAULTS;
			return data;
		},
		staleTime: 6e4
	});
	return data ?? DEFAULTS;
}
function useServices() {
	return useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			return await getServices() ?? [];
		}
	});
}
function useReviews() {
	return useQuery({
		queryKey: ["reviews"],
		queryFn: async () => {
			return await getReviews() ?? [];
		}
	});
}
function useFaqs() {
	return useQuery({
		queryKey: ["faqs"],
		queryFn: async () => {
			return await getFaqs() ?? [];
		}
	});
}
function useStates() {
	return useQuery({
		queryKey: ["coverage_states"],
		queryFn: async () => {
			return await getStates() ?? [];
		}
	});
}
function useCities() {
	return useQuery({
		queryKey: ["coverage_cities"],
		queryFn: async () => {
			return await getCities() ?? [];
		}
	});
}
function useSubmissions() {
	return useQuery({
		queryKey: ["contact_submissions"],
		queryFn: async () => {
			return await getSubmissions() ?? [];
		}
	});
}
function useIsAdmin() {
	return useQuery({
		queryKey: ["is_admin"],
		queryFn: async () => {
			return {
				isAdmin: true,
				isSuperAdmin: true,
				userId: "admin",
				email: "admin@proleadsgeneration.com"
			};
		},
		staleTime: 3e4
	});
}
//#endregion
export { upsertService as C, upsertReview as S, markSubmissionRead as _, useServices as a, updateSubmission as b, useSubmissions as c, deleteCity as d, deleteFaq as f, deleteSubmission as g, deleteState as h, useReviews as i, addCity as l, deleteService as m, useFaqs as n, useSiteSettings as o, deleteReview as p, useIsAdmin as r, useStates as s, useCities as t, addState as u, submitContactForm as v, upsertFaq as x, updateSiteSettings as y };
