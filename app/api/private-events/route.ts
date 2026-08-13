import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { privateEventLeads } from "../../../db/schema";

type LeadPayload = {
  occasion?: string;
  date?: string;
  participants?: number;
  experience?: string;
  treatments?: unknown;
  options?: unknown;
  firstName?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
  landingUrl?: string;
};

const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    if (body.website) return NextResponse.json({ ok: true });

    const participants = Number(body.participants);
    const treatments = Array.isArray(body.treatments) ? body.treatments.map((item) => clean(item, 80)).slice(0, 12) : [];
    const options = Array.isArray(body.options) ? body.options.map((item) => clean(item, 100)).slice(0, 20) : [];
    const email = clean(body.email, 160).toLowerCase();
    const phone = clean(body.phone, 40);

    if (
      !clean(body.occasion, 80) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(clean(body.date, 10)) ||
      participants < 4 || participants > 15 ||
      !clean(body.experience, 100) ||
      treatments.length === 0 ||
      clean(body.firstName, 80).length < 2 ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      phone.replace(/\D/g, "").length < 10 ||
      body.consent !== true
    ) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    const db = await getDb();
    await db.insert(privateEventLeads).values({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      occasion: clean(body.occasion, 80),
      eventDate: clean(body.date, 10),
      participants,
      experience: clean(body.experience, 100),
      treatmentsJson: JSON.stringify(treatments),
      optionsJson: JSON.stringify(options),
      firstName: clean(body.firstName, 80),
      email,
      phone,
      message: clean(body.message, 1500),
      consent: true,
      utmSource: clean(body.utmSource, 120),
      utmMedium: clean(body.utmMedium, 120),
      utmCampaign: clean(body.utmCampaign, 160),
      utmContent: clean(body.utmContent, 160),
      referrer: clean(body.referrer, 500),
      landingUrl: clean(body.landingUrl, 500),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "unable_to_save" }, { status: 500 });
  }
}
