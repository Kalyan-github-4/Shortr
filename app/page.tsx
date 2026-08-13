import Image from "next/image"
import { ArrowRight, BarChart3, Copy, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UrlShortener } from "@/components/url-shortener"

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary/10">
              <Image
                src="/icon.png"
                alt="Shortr"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Shortr
            </span>
            <Badge variant="outline" className="ml-2 hidden sm:inline-flex">
              Beta
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Features
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Pricing
            </Button>
            <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm" className="ml-1">
              Get Started
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center px-6 py-16 text-center md:py-24">

        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Shorten your links.
          <br />
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Share them anywhere.
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Turn long, complicated URLs into short and memorable links in
          seconds. No account needed.
        </p>

        {/* URL Shortener */}
        <UrlShortener />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Try it with:</span>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            github.com
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            twitter.com
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
            youtube.com
          </Badge>
        </div>

        {/* Stats */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4">
          <StatCard value="2M+" label="Links shortened" />
          <StatCard value="99.9%" label="Uptime" />
          <StatCard value="4.8★" label="User rating" />
        </div>

        {/* Features */}
        <div className="mt-20 w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Why Shortr?</h2>
            <p className="text-muted-foreground">
              Everything you need in a link shortener
            </p>
          </div>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <Feature
              icon={Zap}
              title="Lightning Fast"
              description="Create short links instantly with our optimized infrastructure."
            />

            <Feature
              icon={Copy}
              title="Easy to Use"
              description="Copy your shortened link with one click. No complexity."
            />

            <Feature
              icon={BarChart3}
              title="Analytics"
              description="Track clicks, locations, and devices in real-time."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 w-full max-w-2xl rounded-xl bg-primary/5 p-8 text-center">
          <h3 className="text-xl font-semibold">Ready to get started?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Join thousands of users who trust Shortr for their link management.
          </p>
          <Button className="mt-4" size="lg">
            Create your first link
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Shortr</span>
              <span className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}) {
  return (
    <Card className="group text-left transition-all hover:border-primary/20 hover:shadow-md">
      <CardHeader>
        <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}