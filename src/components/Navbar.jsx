"use client";

import React, { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import {
  Dropdown,
  Button,
  Label,
  Description,
  Header,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiShoppingBag,
  FiHome,
  FiWatch,
  FiHeart,
  FiChevronDown,
  FiLogIn,
  FiUserPlus,
  FiGrid,
  FiPackage,
  FiSmile,
  FiGift,
} from "react-icons/fi";
import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";

// Single Source of Truth for Navigation Links
const navItems = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: FiHome,
    type: "link",
  },
  {
    key: "electronics-gadgets",
    label: "Electronics & Gadgets",
    icon: FiGrid,
    type: "dropdown",
    children: [
      {
        key: "mens-watches",
        title: "Men's Watches",
        description: "Luxury chronographs & smartwatches",
        href: "/electronicsandgadgets/watches/menswatch",
        icon: FiWatch,
      },
      {
        key: "womens-watches",
        title: "Women's Watches",
        description: "Elegant timepieces & luxury bands",
        href: "/electronicsandgadgets/watches/womenswatch",
        icon: FiHeart,
      },
    ],
  },
  {
    key: "3-pcs",
    label: "3 PCs",
    href: "/3-pcs",
    icon: FiPackage,
    type: "link",
  },
  {
    key: "beauty-health",
    label: "Beauty & Health",
    href: "/beauty-health",
    icon: FiSmile,
    type: "link",
  },
  {
    key: "add Products",
    label: "Add Products",
    href: "/add-product",
    icon: FiGift,
    type: "link",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileDropdown = (key) => {
    setOpenMobileDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg"
    >
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Left Section: Mobile Toggle & Logo */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-foreground p-1 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>

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

        {/* Center Section: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              return (
                <Dropdown key={item.key} isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                  <Dropdown.Trigger>
                    <div
                      ref={triggerRef}
                      className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-default-100"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setIsDropdownOpen(!isDropdownOpen);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span>{item.label}</span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </Dropdown.Trigger>

                  <Dropdown.Popover>
                    <Dropdown.Menu
                      aria-label={`${item.label} Menu`}
                      className="w-[340px]"
                    >
                      <Dropdown.Section>
                        <Header className="px-2 py-1.5 text-xs font-semibold text-default-400 uppercase tracking-wider">
                          Watches & Timepieces
                        </Header>
                        {item.children?.map((child) => (
                          <Dropdown.Item
                            key={child.key}
                            as={NextLink}
                            href={child.href}
                            className="py-2.5 px-3 rounded-xl transition-all hover:bg-content2"
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <child.icon className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <Label className="text-sm font-bold text-foreground cursor-pointer">
                                  {child.title}
                                </Label>
                                <Description className="text-xs text-default-400 font-normal">
                                  {child.description}
                                </Description>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Section>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              );
            }

            const Icon = item.icon;
            return (
              <NextLink
                key={item.key}
                href={item.href}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                {Icon && <Icon className="h-4 w-4 text-default-500" />}
                <span>{item.label}</span>
              </NextLink>
            );
          })}
        </div>

        {/* Right Section: Actions & Dark Mode */}
        <div className="flex items-center gap-3">
          {mounted ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {/* <Button
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
              </Button> */}
              <ThemeSwitch />
            </motion.div>
          ) : (
            <div className="h-10 w-10" />
          )}

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden sm:inline-block">
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              href="/signin"
              variant="flat"
              color="default"
              startcontent={<FiLogIn className="h-4 w-4" />}
            >
              Sign In
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <FiUserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Sign Up</span>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-default-200 md:hidden bg-background overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.type === "dropdown") {
                  const isOpen = !!openMobileDropdown[item.key];
                  return (
                    <div key={item.key} className="flex flex-col gap-1">
                      <button
                        onClick={() => toggleMobileDropdown(item.key)}
                        className="flex items-center justify-between w-full py-2 text-base font-medium text-foreground hover:text-primary"
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon className="h-5 w-5 text-primary" />}
                          <span>{item.label}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      {isOpen && (
                        <div className="pl-8 flex flex-col gap-2 pt-1 pb-2 border-l-2 border-primary/20 ml-2">
                          {item.children?.map((child) => (
                            <NextLink
                              key={child.key}
                              href={child.href}
                              className="text-sm font-medium text-default-600 hover:text-primary flex items-center gap-2 py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <child.icon className="h-4 w-4 text-primary" />
                              <span>{child.title}</span>
                            </NextLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NextLink
                    key={item.key}
                    href={item.href}
                    className="flex items-center gap-3 py-2 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    <span>{item.label}</span>
                  </NextLink>
                );
              })}

              <div className="pt-3 border-t border-default-200">
                <Button
                  as={NextLink}
                  href="/signin"
                  variant="flat"
                  color="default"
                  fullWidth
                  startcontent={<FiLogIn className="h-5 w-5 text-current" />}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}