import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

import { db } from "@/db"
import { urls } from "@/db/schema"

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ shortCode: string }>
  },
) {
  const { shortCode } = await params

  const result = await db
    .select({
      originalUrl: urls.originalUrl,
    })
    .from(urls)
    .where(eq(urls.shortCode, shortCode))
    .limit(1)

  if (result.length === 0) {
    return NextResponse.json(
      {
        success: false,
        error: "Short URL not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.redirect(result[0].originalUrl, 302)
}