import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"

import { db } from "@/db"
import { urls } from "@/db/schema"
import { generateShortCode } from "@/lib/short-code"
import { createUrlSchema } from "@/lib/validation"

const MAX_ATTEMPTS = 5

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = createUrlSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0]?.message ?? "Invalid URL",
        },
        { status: 400 },
      )
    }

    const { url } = result.data

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const shortCode = generateShortCode()

      const existing = await db
        .select({ id: urls.id })
        .from(urls)
        .where(eq(urls.shortCode, shortCode))
        .limit(1)

      if (existing.length > 0) {
        continue
      }

      const [createdUrl] = await db
        .insert(urls)
        .values({
          originalUrl: url,
          shortCode,
        })
        .returning({
          id: urls.id,
          originalUrl: urls.originalUrl,
          shortCode: urls.shortCode,
          createdAt: urls.createdAt,
        })

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin

      return NextResponse.json(
        {
          success: true,
          data: {
            id: createdUrl.id,
            originalUrl: createdUrl.originalUrl,
            shortCode: createdUrl.shortCode,
            shortUrl: `${baseUrl}/${createdUrl.shortCode}`,
            createdAt: createdUrl.createdAt,
          },
        },
        { status: 201 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unable to generate a unique short code. Please try again.",
      },
      { status: 503 },
    )
  } catch (error) {
    console.error("Create URL error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while creating the short URL.",
      },
      { status: 500 },
    )
  }
}