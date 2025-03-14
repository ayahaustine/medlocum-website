import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Medlocum | #1 Healthcare Staffing Platform for Hospitals & Medics",
  description:
    "Medlocum connects hospitals with qualified medical professionals for seamless locum staffing. Our innovative platform helps hospitals fill shifts and medics find flexible work opportunities.",
  keywords: [
    "medical locum app",
    "healthcare staffing",
    "locum tenens platform",
    "hospital staffing app",
    "medical staff scheduling",
    "locum doctor app",
    "healthcare recruitment",
    "medical shift management",
    "temporary medical staffing",
    "physician locum app",
  ],
  authors: [{ name: "Medlocum" }],
  creator: "Medlocum",
  publisher: "Medlocum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://medlocum.net"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-us",
      "en-GB": "/en-gb",
    },
  },
  openGraph: {
    title: "Medlocum | Healthcare Staffing Platform for Hospitals & Medics",
    description:
      "Connect hospitals with skilled medics for seamless locum staffing. Our innovative platform helps hospitals fill shifts and medics find flexible work opportunities.",
    url: "https://medlocum.net",
    siteName: "Medlocum",
    images: [
      {
        url: "https://medlocum.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Medlocum - Healthcare Staffing Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medlocum | Healthcare Staffing Platform for Hospitals & Medics",
    description:
      "Connect hospitals with skilled medics for seamless locum staffing. Our innovative platform helps hospitals fill shifts and medics find flexible work opportunities.",
    images: ["https://medlocum.net/twitter-image.jpg"],
    creator: "@medlocum",
    site: "@medlocum",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["support@medlocum.net"],
    },
  },
  category: "Healthcare Technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/hero-image.jpg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Medlocum",
              url: "https://medlocum.net",
              logo: "https://medlocum.net/logo.png",
              description: "Healthcare staffing solutions connecting hospitals and medics.",
              sameAs: [
                "https://linkedin.com/company/medlocum",
                "https://twitter.com/medlocum",
                "https://instagram.com/medlocum",
                "https://facebook.com/medlocum",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-800-MEDLOCUM",
                  contactType: "customer service",
                  areaServed: "Worldwide",
                  availableLanguage: ["English"],
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Medlocum Products",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "SoftwareApplication",
                      name: "Hospital App",
                      description: "Post locum shifts, manage staff, and streamline operations.",
                      url: "https://hospital.medlocum.net",
                      applicationCategory: "Healthcare",
                      operatingSystem: "iOS, Android, Web",
                      offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                      },
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "SoftwareApplication",
                      name: "Medic App",
                      description: "Find shifts, manage your schedule, and grow your career.",
                      url: "https://medic.medlocum.net",
                      applicationCategory: "Healthcare",
                      operatingSystem: "iOS, Android, Web",
                      offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                      },
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://medlocum.net",
              name: "Medlocum",
              description: "Healthcare staffing solutions connecting hospitals and medics.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://medlocum.net/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does Medlocum work for hospitals?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Medlocum allows hospitals to post shifts, manage staff, and find qualified medical professionals through our automated matching system. Our platform streamlines the entire staffing process, saving time and resources.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does Medlocum work for medical professionals?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Medical professionals can use Medlocum to find shifts that match their skills, availability, and location preferences. Our platform offers one-click applications, enhanced profile visibility, and an integrated calendar for schedule management.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Medlocum free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, both the Hospital App and Medic App are free to download and use. Medlocum charges a small service fee only when a successful match is made between a hospital and a medical professional.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of medical professionals can use Medlocum?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Medlocum supports a wide range of medical professionals including doctors, nurses, physician assistants, nurse practitioners, and other specialized healthcare providers looking for locum tenens opportunities.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-[#F9FAFB]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'