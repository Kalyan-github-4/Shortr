"use client"

import { useState } from "react"
import { ArrowRight, Check, Copy, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type ShortenedUrl = {
  shortUrl: string
  originalUrl: string
  shortCode: string
}

export function UrlShortener() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<ShortenedUrl | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)
    setCopied(false)

    try {
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL")
      }

      setResult(data.data)
      setUrl("")
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      )
    } finally {
      setLoading(false)
    }
  }

  async function copyUrl() {
    if (!result) return

    await navigator.clipboard.writeText(result.shortUrl)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="w-full max-w-2xl">
      <Card className="border-2 shadow-lg">
        <CardContent className="p-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <Input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="Paste your long URL here..."
              className="h-12 flex-1 border-0 pl-4 shadow-none focus-visible:ring-0"
              disabled={loading}
            />

            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 sm:px-8"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                <>
                  Shorten URL
                  <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex min-h-9 justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <span>🔒 Secure & private</span>
          <span>⚡ Instant results</span>
        </CardFooter>
      </Card>

      {error && (
        <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Your shortened URL
              </p>

              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate font-medium text-primary hover:underline"
              >
                {result.shortUrl}
              </a>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={copyUrl}
              className="shrink-0"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}