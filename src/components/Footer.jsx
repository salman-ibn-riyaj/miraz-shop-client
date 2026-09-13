"use client";

import React from "react";
import NextLink from "next/link";
import { Button, Input, Separator } from "@heroui/react";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiMail,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Categories",
      links: [
        { name: "Electronics & Gadgets", href: "/electronics" },
        { name: "3 PCs", href: "/3-pcs" },
        { name: "Beauty & Health", href: "/beauty-health" },
        { name: "New Arrivals", href: "/new-arrivals" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Track Order", href: "/track-order" },
        { name: "Shipping & Delivery", href: "/shipping" },
        { name: "Returns & Exchanges", href: "/returns" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Miraz Shop", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com", label: "GitHub" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full border-t border-default-200 bg-background text-foreground transition-colors duration-200">
      {/* Top Container */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Logo */}
              <NextLink href="/" className="inline-flex items-center gap-2 font-bold">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md"
                >
                  <FiShoppingBag className="h-5 w-5" />
                </motion.div>
                <span className="text-xl font-extrabold tracking-tight text-foreground">
                  Miraz <span className="text-primary">Shop</span>
                </span>
              </NextLink>

              <p className="text-default-500 text-sm max-w-sm leading-relaxed">
                Your premier destination for high-quality electronics, gadgets, computing setups, and lifestyle essentials.
              </p>

              {/* Contact Info Snippets */}
              <div className="space-y-2 pt-2 text-xs text-default-400">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-primary" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-primary" />
                  <span>+880 1700-000000</span>
                </div>
              </div>
            </div>

            {/* Newsletter Input */}
            <div className="mt-6 space-y-2">
              <span className="text-sm font-semibold text-foreground">
                Subscribe to our newsletter
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  startcontent={<FiMail className="text-default-400" />}
                  variant="flat"
                  size="sm"
                  className="bg-content1"
                />
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    color="primary"
                    size="sm"
                    isIconOnly
                    aria-label="Subscribe"
                    className="shadow-md"
                  >
                    <FiArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <NextLink
                      href={link.href}
                      className="text-sm text-default-500 hover:text-primary transition-colors inline-block"
                    >
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block"
                      >
                        {link.name}
                      </motion.span>
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* HeroUI Separator */}
        <div className="my-10">
          <Separator variant="default" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-default-400">
          <p>© {currentYear} Miraz Shop. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-content1 hover:bg-content2 text-default-600 hover:text-primary transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}