"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

// force the data to a number (because data from Form are always a string)
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogIn(prevState: any, formData: FormData) {
  console.log(typeof formData.get("token"));
  console.log(typeof tokenSchema.parse(formData.get("token")));
}
