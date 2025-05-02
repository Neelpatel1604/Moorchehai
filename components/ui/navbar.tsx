"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#1e40af]">Moorcheh</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/research" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Research
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/products/overview" title="Product Overview">
                        Explore the full lineup of Moorcheh edge AI solutions
                      </ListItem>
                      <ListItem href="/products/pricing" title="Pricing">
                        Transparent pricing options for businesses of all sizes
                      </ListItem>
                      <ListItem href="/products/chatbot" title="Moorcheh Chat Bot">
                        AI assistants that run entirely on-device with offline support
                      </ListItem>
                      <ListItem href="/products/sdk" title="Moorcheh SDK">
                        Developer tools for embedding edge AI in your applications
                      </ListItem>
                      <ListItem href="/products/edge" title="Moorcheh on Edge">
                        Comprehensive edge AI infrastructure for enterprise deployment
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/console" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Console
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] py-12">
                <nav className="flex flex-col gap-6">
                  <Link 
                    href="/" 
                    className="text-base font-medium text-gray-800 transition-colors hover:text-[#1e40af]"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-base font-medium text-gray-800 transition-colors hover:text-[#1e40af]"
                  >
                    About
                  </Link>
                  <Link 
                    href="/research" 
                    className="text-base font-medium text-gray-800 transition-colors hover:text-[#1e40af]"
                  >
                    Research
                  </Link>
                  
                  <div className="py-2">
                    <h3 className="text-base font-medium text-gray-800 mb-3">Products</h3>
                    <ul className="pl-2 space-y-4 border-l-2 border-gray-100">
                      <li>
                        <Link 
                          href="/products/overview"
                          className="block text-sm text-gray-600 transition-colors hover:text-[#1e40af]"
                        >
                          Product Overview
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/products/pricing"
                          className="block text-sm text-gray-600 transition-colors hover:text-[#1e40af]"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/products/chatbot"
                          className="block text-sm text-gray-600 transition-colors hover:text-[#1e40af]"
                        >
                          Moorcheh Chat Bot
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/products/sdk"
                          className="block text-sm text-gray-600 transition-colors hover:text-[#1e40af]"
                        >
                          Moorcheh SDK
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/products/edge"
                          className="block text-sm text-gray-600 transition-colors hover:text-[#1e40af]"
                        >
                          Moorcheh on Edge
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <Link 
                    href="/console" 
                    className="text-base font-medium text-gray-800 transition-colors hover:text-[#1e40af]"
                  >
                    Console
                  </Link>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button className="w-full bg-[#1e40af] hover:bg-blue-800">
                      Get Started
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center">
            <Button variant="default" className="hidden md:inline-flex bg-[#1e40af] hover:bg-blue-800">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}

const ListItem = ({ className, title, href, children }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-[#1e40af] focus:bg-gray-100 focus:text-[#1e40af]",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}; 