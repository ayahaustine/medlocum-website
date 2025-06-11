"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mountain } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const navBackground = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"])

  const navHeight = useTransform(scrollY, [0, 50], ["5rem", "4rem"])

  const navShadow = useTransform(scrollY, [0, 50], ["0 0 0 rgba(0,0,0,0)", "0 4px 6px -1px rgba(0,0,0,0.1)"])

  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      style={{
        backgroundColor: navBackground,
        height: navHeight,
        boxShadow: navShadow,
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-6">
        <motion.div style={{ scale: logoScale }}>
          <Link href="/" className="flex items-center gap-2">
            <Mountain className="h-8 w-8 text-blue-600" />
            <span className="font-heading font-bold text-xl text-foreground">Medlocum</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#products" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Products
          </Link>
          <Link href="#about" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            About Us
          </Link>
          <Link href="#testimonials" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Testimonials
          </Link>
          <Link href="#contact" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            asChild
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <Link href="https://hospital-preview.medlocum.net">For Hospitals</Link>
          </Button>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 transition-all">
            <Link href="https://medic-preview.medlocum.net">For Medics</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <Link href="/" className="flex items-center gap-2 mb-8">
                <Mountain className="h-8 w-8 text-blue-600" />
                <span className="font-heading font-bold text-xl">Medlocum</span>
              </Link>

              <nav className="flex flex-col space-y-6 mb-8">
                <Link
                  href="#products"
                  className="text-foreground hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  Products
                </Link>
                <Link
                  href="#about"
                  className="text-foreground hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  About Us
                </Link>
                <Link
                  href="#testimonials"
                  className="text-foreground hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  Testimonials
                </Link>
                <Link
                  href="#contact"
                  className="text-foreground hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  Contact
                </Link>
              </nav>

              <div className="mt-auto space-y-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Link href="https://hospital-preview.medlocum.net">For Hospitals</Link>
                </Button>
                <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  <Link href="https://medic-preview.medlocum.net">For Medics</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

