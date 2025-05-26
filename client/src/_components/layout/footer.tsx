"use client"

import * as React from "react"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/_components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import IconTiktok from "../icons/IconTiktok"

export default function Footer() {


  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold font-inter tracking-tight">SPA de Verson</h2>
            <p className="mb-6 text-muted-foreground">
              Ouvert du lundi au samedi de 14h00 à 17h30
            </p>
            <p className="text-muted-foreground">Powered by Kodana</p>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Pages</h3>
            <nav className="space-y-2 text-sm">
              <Link href="#" className="block transition-colors hover:text-primary">
                Accueil
              </Link>
              <Link href="#" className="block transition-colors hover:text-primary">
                Comment adopter ?
              </Link>
              <Link href="#" className="block transition-colors hover:text-primary">
                Ils cherchent un foyer
              </Link>
              <Link href="#" className="block transition-colors hover:text-primary">
                Ils ont trouvé un foyer
              </Link>
              <Link href="#" className="block transition-colors hover:text-primary">
                Nous soutenir
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="space-y-2 text-sm not-italic">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                <div>
                  <p>Route de Saint-Manvieu-Norrey</p>
                  <p>14790 VERSON</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-400" />
                <p>02 31 08 00 75</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-400" />
                <p>spa.bn.verson@gmail.com</p>
              </div>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Rejoignez-nous !</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <IconTiktok className="h-4 w-4" />
                      <span className="sr-only">TikTok</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur TikTok</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 SPA de Verson. Tous droits réservés.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Politique de confidentialité
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Conditions de service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
};