"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { Button, Link as HeroLink } from "@heroui/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiShoppingBag,
  FiHome,
  FiCpu,
  FiMonitor,
  FiHeart,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Electronics & Gadgets", href: "/electronics", icon: FiCpu },
    { name: "3 PCs", href: "/3-pcs", icon: FiMonitor },
    { name: "Beauty & Health", href: "/beauty-health", icon: FiHeart },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg"
    >
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Left Section: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-foreground p-1 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

          {/* Logo with Hover Animation */}
          <NextLink href="/" className="flex items-center gap-2 font-bold text-inherit">
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
        </div>

        {/* Center Section: Navigation Links (Desktop) */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <HeroLink
                as={NextLink}
                href={link.href}
                color="foreground"
                className="text-sm font-medium flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <link.icon className="h-4 w-4 text-default-500" />
                <span>{link.name}</span>
              </HeroLink>
            </motion.li>
          ))}
        </ul>

        {/* Right Section: Dark/Light Mode & Auth Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          {mounted ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                isIconOnly
                variant="flat"
                color="default"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <FiSun className="h-5 w-5 text-warning" />
                    ) : (
                      <FiMoon className="h-5 w-5 text-default-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>
          ) : (
            <div className="w-10 h-10" />
          )}

          {/* Sign In Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-block"
          >
            <Button
              as={NextLink}
              href="/signin"
              variant="flat"
              color="default"
              startContent={<FiLogIn className="h-4 w-4" />}
              className="font-medium"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Sign Up Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              as={NextLink}
              href="/signup"
              color="primary"
              variant="solid"
              startContent={<FiUserPlus className="h-4 w-4" />}
              className="font-medium shadow-sm"
            >
              Sign Up
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Animated Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-default-200 md:hidden bg-background overflow-hidden"
          >
            <ul className="flex flex-col gap-2 p-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                >
                  <HeroLink
                    as={NextLink}
                    href={link.href}
                    color="foreground"
                    className="w-full flex items-center gap-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5 text-primary" />
                    <span>{link.name}</span>
                  </HeroLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-2 border-t border-default-200"
              >
                <Button
                  as={NextLink}
                  href="/signin"
                  variant="flat"
                  color="default"
                  fullWidth
                  startContent={<FiLogIn className="h-5 w-5" />}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}