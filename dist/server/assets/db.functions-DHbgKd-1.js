import { a as faqs, c as siteSettings, d as createServerRpc, i as coverageStates, n as contactSubmissions, o as reviews, r as coverageCities, s as services, t as db } from "./db-C6ZEXB-E.js";
import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { asc, desc, eq } from "drizzle-orm";
//#region src/lib/db.functions.ts?tss-serverfn-split
var getSiteSettings_createServerFn_handler = createServerRpc({
	id: "fd6e64b5f10846c33ddc7bab3c2731274572cf516391d28fc92b58a737e8e0a3",
	name: "getSiteSettings",
	filename: "src/lib/db.functions.ts"
}, (opts) => getSiteSettings.__executeServer(opts));
var getSiteSettings = createServerFn({ method: "GET" }).handler(getSiteSettings_createServerFn_handler, async () => {
	return (await db.select().from(siteSettings).limit(1))[0] || null;
});
var getServices_createServerFn_handler = createServerRpc({
	id: "7cd38c34f3478e4d82410577a6c35b0a49c6d6ee4325dfdd8ef5f42775623a8b",
	name: "getServices",
	filename: "src/lib/db.functions.ts"
}, (opts) => getServices.__executeServer(opts));
var getServices = createServerFn({ method: "GET" }).handler(getServices_createServerFn_handler, async () => {
	return await db.select().from(services).orderBy(asc(services.sortOrder));
});
var getReviews_createServerFn_handler = createServerRpc({
	id: "5ec750b950ef62f1c7e06cce3d85a540317e86e4be6b993834affe4661423553",
	name: "getReviews",
	filename: "src/lib/db.functions.ts"
}, (opts) => getReviews.__executeServer(opts));
var getReviews = createServerFn({ method: "GET" }).handler(getReviews_createServerFn_handler, async () => {
	return await db.select().from(reviews).orderBy(asc(reviews.sortOrder));
});
var getFaqs_createServerFn_handler = createServerRpc({
	id: "3e0194913b502f59ee60cd56a39982162c2cce2032d97cf72c251035ec86ea35",
	name: "getFaqs",
	filename: "src/lib/db.functions.ts"
}, (opts) => getFaqs.__executeServer(opts));
var getFaqs = createServerFn({ method: "GET" }).handler(getFaqs_createServerFn_handler, async () => {
	return await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
});
var getStates_createServerFn_handler = createServerRpc({
	id: "046a3f2d423af13512e00fb3137ecb434097c1a9849ad0520778c8f6d180c7d1",
	name: "getStates",
	filename: "src/lib/db.functions.ts"
}, (opts) => getStates.__executeServer(opts));
var getStates = createServerFn({ method: "GET" }).handler(getStates_createServerFn_handler, async () => {
	return await db.select().from(coverageStates).orderBy(asc(coverageStates.sortOrder));
});
var getCities_createServerFn_handler = createServerRpc({
	id: "71f1a94ed4125b9e79a6a530f27b5fc1651888ef77c2c4d44a73a819bba6bae2",
	name: "getCities",
	filename: "src/lib/db.functions.ts"
}, (opts) => getCities.__executeServer(opts));
var getCities = createServerFn({ method: "GET" }).handler(getCities_createServerFn_handler, async () => {
	return await db.select().from(coverageCities).orderBy(asc(coverageCities.sortOrder));
});
var getSubmissions_createServerFn_handler = createServerRpc({
	id: "9d1ce6359da5600e75c9fc5893e628ec925c1b4cd984ce46fca696f38e82b2e3",
	name: "getSubmissions",
	filename: "src/lib/db.functions.ts"
}, (opts) => getSubmissions.__executeServer(opts));
var getSubmissions = createServerFn({ method: "GET" }).handler(getSubmissions_createServerFn_handler, async () => {
	return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
});
var submitContactForm_createServerFn_handler = createServerRpc({
	id: "d0a420131f247c66166edbdf465afe41839f90c990c231e6cdc82fbf2cb6fc44",
	name: "submitContactForm",
	filename: "src/lib/db.functions.ts"
}, (opts) => submitContactForm.__executeServer(opts));
var submitContactForm = createServerFn({ method: "POST" }).validator((data) => data).handler(submitContactForm_createServerFn_handler, async ({ data }) => {
	await db.insert(contactSubmissions).values({
		name: data.name,
		email: data.email,
		phone: data.phone,
		city: data.city,
		service: data.service,
		message: data.message
	});
	return { success: true };
});
var deleteSubmission_createServerFn_handler = createServerRpc({
	id: "3960979a9879b612f00e9f02fbfe05820d46a8a500329de1417dab5a073ef748",
	name: "deleteSubmission",
	filename: "src/lib/db.functions.ts"
}, (opts) => deleteSubmission.__executeServer(opts));
var deleteSubmission = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteSubmission_createServerFn_handler, async ({ data }) => {
	await db.delete(contactSubmissions).where(eq(contactSubmissions.id, data.id));
	return { success: true };
});
var markSubmissionRead_createServerFn_handler = createServerRpc({
	id: "1697527c3f15b05b577d222cc6810a7433f5d5a3e28a7813a7b8dc7ad320747c",
	name: "markSubmissionRead",
	filename: "src/lib/db.functions.ts"
}, (opts) => markSubmissionRead.__executeServer(opts));
var markSubmissionRead = createServerFn({ method: "POST" }).validator((data) => data).handler(markSubmissionRead_createServerFn_handler, async ({ data }) => {
	await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, data.id));
	return { success: true };
});
var updateSubmission_createServerFn_handler = createServerRpc({
	id: "c87bc057a35726fe66126d62c5cd2ae652d64d3d78e17bd0b41bf1d573530828",
	name: "updateSubmission",
	filename: "src/lib/db.functions.ts"
}, (opts) => updateSubmission.__executeServer(opts));
var updateSubmission = createServerFn({ method: "POST" }).validator((data) => data).handler(updateSubmission_createServerFn_handler, async ({ data }) => {
	await db.update(contactSubmissions).set({
		name: data.name,
		email: data.email,
		phone: data.phone,
		city: data.city,
		service: data.service,
		message: data.message
	}).where(eq(contactSubmissions.id, data.id));
	return { success: true };
});
var updateSiteSettings_createServerFn_handler = createServerRpc({
	id: "bf1338d1bb5f19c85e8494c815be33c7ef3a0987c79ae7143cb4d9f9850f1e82",
	name: "updateSiteSettings",
	filename: "src/lib/db.functions.ts"
}, (opts) => updateSiteSettings.__executeServer(opts));
var updateSiteSettings = createServerFn({ method: "POST" }).validator((data) => data).handler(updateSiteSettings_createServerFn_handler, async ({ data }) => {
	await db.update(siteSettings).set({
		phone: data.phone,
		phoneTel: data.phoneTel,
		email: data.email,
		address: data.address,
		adminDisplayName: data.adminDisplayName
	}).where(eq(siteSettings.id, data.id));
	return { success: true };
});
var upsertFaq_createServerFn_handler = createServerRpc({
	id: "fa36e196cc7f2692c7df67c644678292d32d3f952b84dfec7c036c63f05d4483",
	name: "upsertFaq",
	filename: "src/lib/db.functions.ts"
}, (opts) => upsertFaq.__executeServer(opts));
var upsertFaq = createServerFn({ method: "POST" }).validator((data) => data).handler(upsertFaq_createServerFn_handler, async ({ data }) => {
	if (data.id) await db.update(faqs).set({
		question: data.question,
		answer: data.answer,
		sortOrder: data.sortOrder
	}).where(eq(faqs.id, data.id));
	else await db.insert(faqs).values({
		question: data.question,
		answer: data.answer,
		sortOrder: data.sortOrder
	});
	return { success: true };
});
var deleteFaq_createServerFn_handler = createServerRpc({
	id: "c3c9f099855be44605824e184d5af8882a804b8a93e9cf80025bf82ec81dd73c",
	name: "deleteFaq",
	filename: "src/lib/db.functions.ts"
}, (opts) => deleteFaq.__executeServer(opts));
var deleteFaq = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteFaq_createServerFn_handler, async ({ data }) => {
	await db.delete(faqs).where(eq(faqs.id, data.id));
	return { success: true };
});
var upsertReview_createServerFn_handler = createServerRpc({
	id: "fa8f0cb98d3da175d5e0149abe439280f047216a7a579bf35572a467c27efef5",
	name: "upsertReview",
	filename: "src/lib/db.functions.ts"
}, (opts) => upsertReview.__executeServer(opts));
var upsertReview = createServerFn({ method: "POST" }).validator((data) => data).handler(upsertReview_createServerFn_handler, async ({ data }) => {
	if (data.id) await db.update(reviews).set({
		name: data.name,
		city: data.city,
		service: data.service,
		rating: data.rating,
		reviewDate: data.reviewDate,
		body: data.body,
		sortOrder: data.sortOrder
	}).where(eq(reviews.id, data.id));
	else await db.insert(reviews).values({
		name: data.name,
		city: data.city,
		service: data.service,
		rating: data.rating,
		reviewDate: data.reviewDate,
		body: data.body,
		sortOrder: data.sortOrder
	});
	return { success: true };
});
var deleteReview_createServerFn_handler = createServerRpc({
	id: "3a7fd41000a308dd3e61c3fafc6ad59776026810422e89cd1f4ff2720dfa10a0",
	name: "deleteReview",
	filename: "src/lib/db.functions.ts"
}, (opts) => deleteReview.__executeServer(opts));
var deleteReview = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteReview_createServerFn_handler, async ({ data }) => {
	await db.delete(reviews).where(eq(reviews.id, data.id));
	return { success: true };
});
var upsertService_createServerFn_handler = createServerRpc({
	id: "51f2f2ca5e6afd05e31768d4ff6c43ab57820e6356c68debc313e7316f0bbe92",
	name: "upsertService",
	filename: "src/lib/db.functions.ts"
}, (opts) => upsertService.__executeServer(opts));
var upsertService = createServerFn({ method: "POST" }).validator((data) => data).handler(upsertService_createServerFn_handler, async ({ data }) => {
	if (data.id) await db.update(services).set({
		slug: data.slug,
		iconName: data.iconName,
		title: data.title,
		description: data.description,
		tag: data.tag,
		features: data.features,
		priceFrom: data.priceFrom,
		responseTime: data.responseTime,
		sortOrder: data.sortOrder
	}).where(eq(services.id, data.id));
	else await db.insert(services).values({
		slug: data.slug,
		iconName: data.iconName,
		title: data.title,
		description: data.description,
		tag: data.tag,
		features: data.features,
		priceFrom: data.priceFrom,
		responseTime: data.responseTime,
		sortOrder: data.sortOrder
	});
	return { success: true };
});
var deleteService_createServerFn_handler = createServerRpc({
	id: "a1100b06089ab9138ca628f3b6df61df1b74b5af7e950a112c8ff97651377767",
	name: "deleteService",
	filename: "src/lib/db.functions.ts"
}, (opts) => deleteService.__executeServer(opts));
var deleteService = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteService_createServerFn_handler, async ({ data }) => {
	await db.delete(services).where(eq(services.id, data.id));
	return { success: true };
});
var addState_createServerFn_handler = createServerRpc({
	id: "c36eafb1fc35a4b09780bdf3d595d57a7de8d58c50e9fe1c9bf752d64af3f936",
	name: "addState",
	filename: "src/lib/db.functions.ts"
}, (opts) => addState.__executeServer(opts));
var addState = createServerFn({ method: "POST" }).validator((data) => data).handler(addState_createServerFn_handler, async ({ data }) => {
	await db.insert(coverageStates).values({
		name: data.name,
		sortOrder: data.sortOrder
	});
	return { success: true };
});
var deleteState_createServerFn_handler = createServerRpc({
	id: "a58af64f544968d56d3b07dc67fa3dab1a83b2daf586ee2698587d9a3d3c8243",
	name: "deleteState",
	filename: "src/lib/db.functions.ts"
}, (opts) => deleteState.__executeServer(opts));
var deleteState = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteState_createServerFn_handler, async ({ data }) => {
	await db.delete(coverageCities).where(eq(coverageCities.stateId, data.id));
	await db.delete(coverageStates).where(eq(coverageStates.id, data.id));
	return { success: true };
});
var addCity_createServerFn_handler = createServerRpc({
	id: "00a5dfc06f347e4e690fb0b2cdc3cc6edfc1251bd39880847df0b95d05e00994",
	name: "addCity",
	filename: "src/lib/db.functions.ts"
}, (opts) => addCity.__executeServer(opts));
var addCity = createServerFn({ method: "POST" }).validator((data) => data).handler(addCity_createServerFn_handler, async ({ data }) => {
	await db.insert(coverageCities).values({
		stateId: data.stateId,
		name: data.name,
		sortOrder: data.sortOrder
	});
	return { success: true };
});
var deleteCity_createServerFn_handler = createServerRpc({
	id: "097f0f15ce8b384362723306b5e38a288245ee812ad4af0598cd8900b1d17d40",
	name: "deleteCity",
	filename: "src/lib/db.functions.ts"
}, (opts) => deleteCity.__executeServer(opts));
var deleteCity = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteCity_createServerFn_handler, async ({ data }) => {
	await db.delete(coverageCities).where(eq(coverageCities.id, data.id));
	return { success: true };
});
//#endregion
export { addCity_createServerFn_handler, addState_createServerFn_handler, deleteCity_createServerFn_handler, deleteFaq_createServerFn_handler, deleteReview_createServerFn_handler, deleteService_createServerFn_handler, deleteState_createServerFn_handler, deleteSubmission_createServerFn_handler, getCities_createServerFn_handler, getFaqs_createServerFn_handler, getReviews_createServerFn_handler, getServices_createServerFn_handler, getSiteSettings_createServerFn_handler, getStates_createServerFn_handler, getSubmissions_createServerFn_handler, markSubmissionRead_createServerFn_handler, submitContactForm_createServerFn_handler, updateSiteSettings_createServerFn_handler, updateSubmission_createServerFn_handler, upsertFaq_createServerFn_handler, upsertReview_createServerFn_handler, upsertService_createServerFn_handler };
