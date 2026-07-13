import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq, asc, desc } from "drizzle-orm";

// ─── READ FUNCTIONS ───────────────────────────────────────────────────────────

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const result = await db.select().from(schema.siteSettings).limit(1);
    return result[0] || null;
  } catch (err) {
    console.error("[DB] getSiteSettings failed:", err);
    return null;
  }
});

export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(schema.services).orderBy(asc(schema.services.sortOrder));
  } catch (err) {
    console.error("[DB] getServices failed:", err);
    return [];
  }
});

export const getReviews = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(schema.reviews).orderBy(asc(schema.reviews.sortOrder));
  } catch (err) {
    console.error("[DB] getReviews failed:", err);
    return [];
  }
});

export const getFaqs = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(schema.faqs).orderBy(asc(schema.faqs.sortOrder));
  } catch (err) {
    console.error("[DB] getFaqs failed:", err);
    return [];
  }
});

export const getStates = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(schema.coverageStates).orderBy(asc(schema.coverageStates.sortOrder));
  } catch (err) {
    console.error("[DB] getStates failed:", err);
    return [];
  }
});

export const getCities = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(schema.coverageCities).orderBy(asc(schema.coverageCities.sortOrder));
  } catch (err) {
    console.error("[DB] getCities failed:", err);
    return [];
  }
});

export const getSubmissions = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(schema.contactSubmissions).orderBy(desc(schema.contactSubmissions.createdAt));
  } catch (err) {
    console.error("[DB] getSubmissions failed:", err);
    return [];
  }
});

// ─── CONTACT SUBMISSIONS ──────────────────────────────────────────────────────

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    await db.insert(schema.contactSubmissions).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      service: data.service,
      message: data.message,
    });
    return { success: true };
  });

export const deleteSubmission = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(schema.contactSubmissions).where(eq(schema.contactSubmissions.id, data.id));
    return { success: true };
  });

export const markSubmissionRead = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.update(schema.contactSubmissions).set({ isRead: true }).where(eq(schema.contactSubmissions.id, data.id));
    return { success: true };
  });

export const updateSubmission = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    await db.update(schema.contactSubmissions)
      .set({ name: data.name, email: data.email, phone: data.phone, city: data.city, service: data.service, message: data.message })
      .where(eq(schema.contactSubmissions.id, data.id));
    return { success: true };
  });

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

export const updateSiteSettings = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    await db.update(schema.siteSettings)
      .set({
        phone: data.phone,
        phoneTel: data.phoneTel,
        email: data.email,
        address: data.address,
        adminDisplayName: data.adminDisplayName,
      })
      .where(eq(schema.siteSettings.id, data.id));
    return { success: true };
  });

// ─── FAQS ─────────────────────────────────────────────────────────────────────

export const upsertFaq = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    if (data.id) {
      await db.update(schema.faqs)
        .set({ question: data.question, answer: data.answer, sortOrder: data.sortOrder })
        .where(eq(schema.faqs.id, data.id));
    } else {
      await db.insert(schema.faqs).values({ question: data.question, answer: data.answer, sortOrder: data.sortOrder });
    }
    return { success: true };
  });

export const deleteFaq = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(schema.faqs).where(eq(schema.faqs.id, data.id));
    return { success: true };
  });

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export const upsertReview = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    if (data.id) {
      await db.update(schema.reviews)
        .set({ name: data.name, city: data.city, service: data.service, rating: data.rating, reviewDate: data.reviewDate, body: data.body, sortOrder: data.sortOrder })
        .where(eq(schema.reviews.id, data.id));
    } else {
      await db.insert(schema.reviews).values({ name: data.name, city: data.city, service: data.service, rating: data.rating, reviewDate: data.reviewDate, body: data.body, sortOrder: data.sortOrder });
    }
    return { success: true };
  });

export const deleteReview = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(schema.reviews).where(eq(schema.reviews.id, data.id));
    return { success: true };
  });

// ─── SERVICES ─────────────────────────────────────────────────────────────────

export const upsertService = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    if (data.id) {
      await db.update(schema.services)
        .set({ slug: data.slug, iconName: data.iconName, title: data.title, description: data.description, tag: data.tag, features: data.features, priceFrom: data.priceFrom, responseTime: data.responseTime, sortOrder: data.sortOrder })
        .where(eq(schema.services.id, data.id));
    } else {
      await db.insert(schema.services).values({ slug: data.slug, iconName: data.iconName, title: data.title, description: data.description, tag: data.tag, features: data.features, priceFrom: data.priceFrom, responseTime: data.responseTime, sortOrder: data.sortOrder });
    }
    return { success: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(schema.services).where(eq(schema.services.id, data.id));
    return { success: true };
  });

// ─── COVERAGE ─────────────────────────────────────────────────────────────────

export const addState = createServerFn({ method: "POST" })
  .validator((data: { name: string; sortOrder: number }) => data)
  .handler(async ({ data }) => {
    await db.insert(schema.coverageStates).values({ name: data.name, sortOrder: data.sortOrder });
    return { success: true };
  });

export const deleteState = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(schema.coverageCities).where(eq(schema.coverageCities.stateId, data.id));
    await db.delete(schema.coverageStates).where(eq(schema.coverageStates.id, data.id));
    return { success: true };
  });

export const addCity = createServerFn({ method: "POST" })
  .validator((data: { stateId: string; name: string; sortOrder: number }) => data)
  .handler(async ({ data }) => {
    await db.insert(schema.coverageCities).values({ stateId: data.stateId, name: data.name, sortOrder: data.sortOrder });
    return { success: true };
  });

export const deleteCity = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(schema.coverageCities).where(eq(schema.coverageCities.id, data.id));
    return { success: true };
  });
