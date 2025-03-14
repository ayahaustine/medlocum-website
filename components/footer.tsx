import Link from "next/link"
import { Mountain } from "lucide-react"
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Mountain className="h-6 w-6" />
              <span className="font-heading font-bold text-xl">Medlocum</span>
            </Link>
            <p className="text-blue-100 max-w-xs">
              Healthcare Staffing, Simplified. Connecting hospitals with skilled medics through innovative technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://linkedin.com/company/medlocum"
                className="text-blue-100 hover:text-white transition-colors hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com/medlocum"
                className="text-blue-100 hover:text-white transition-colors hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/medlocum"
                className="text-blue-100 hover:text-white transition-colors hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://facebook.com/medlocum"
                className="text-blue-100 hover:text-white transition-colors hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="https://hospital.medlocum.net" className="text-blue-100 hover:text-white transition-colors">
                Hospital App
              </Link>
              <Link href="https://medic.medlocum.net" className="text-blue-100 hover:text-white transition-colors">
                Medic App
              </Link>
              <Link href="#features" className="text-blue-100 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-blue-100 hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/blog" className="text-blue-100 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/case-studies" className="text-blue-100 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="/help-center" className="text-blue-100 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/webinars" className="text-blue-100 hover:text-white transition-colors">
                Webinars
              </Link>
            </nav>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/careers" className="text-blue-100 hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-100 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm">
          <p>© {new Date().getFullYear()} Medlocum. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <a href="mailto:support@medlocum.net" className="hover:text-white transition-colors">
              support@medlocum.net
            </a>
            <span className="mx-2">|</span>
            <a href="tel:+18006335626" className="hover:text-white transition-colors">
              1-800-MEDLOCUM
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

