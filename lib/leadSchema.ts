import { z } from "zod";

export const ROOM_TYPES = [
  "Single Non-AC",
  "Single AC",
  "Double Non-AC",
  "Double AC",
  "Triple Non-AC",
  "Triple AC",
  "Not Sure",
] as const;

export const LEAD_STATUSES = ["New", "Contacted", "Booked", "Lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15)
    .regex(/^[0-9+\s-]+$/, "Phone can only contain digits, +, - and spaces"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  checkin: z.string().optional().or(z.literal("")),
  checkout: z.string().optional().or(z.literal("")),
  roomType: z.enum(ROOM_TYPES).default("Not Sure"),
  guests: z.coerce.number().int().min(1).max(10).default(1),
  message: z.string().max(2000).optional().or(z.literal("")),
  source: z.string().max(200).optional().or(z.literal("")),
  utm: z.string().max(500).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
