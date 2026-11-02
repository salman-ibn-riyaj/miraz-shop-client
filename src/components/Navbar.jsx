"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown, Label, Description, Header } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiShoppingBag,
  FiHome,
  FiWatch,
  FiHeart,
  FiChevronDown,
  FiLogIn,
  FiLogOut,
  FiUser,
  FiUserPlus,
  FiGrid,
  FiPackage,
  FiSmile,
  FiGift,
  FiHeadphones,
  FiCreditCard,
  FiLink,
} from "react-icons/fi";
import { ThemeSwitch } from "./ThemeSwitch";
import { authClient } from "@/lib/auth-client"; // Better Auth client instance

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
    header: "Watches & Timepieces",
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
      {
        key: "Kids-learnings",
        title: "Kids Learnings",
        description: "Educational toys & learning materials",
        href: "/electronicsandgadgets/kids-learnings",
        icon: FiGift,
      },
      {
        key: "trimmer",
        title: "Trimmers",
        description: "Precision trimmers and shavers",
        href: "/electronicsandgadgets/trimmer",
        icon: FiGift,
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
    key: "accessories",
    label: "Accessories",
    header: "Accessories Collection",
    icon: FiHeadphones,
    type: "dropdown",
    children: [
      {
        key: "wallets",
        title: "Wallets",
        description: "Leather wallets & card holders",
        href: "/accessories/wallets",
        icon: FiCreditCard,
      },
      {
        key: "bracelet",
        title: "Bracelet",
        description: "Stylish bracelets, chains & wristbands",
        href: "/accessories/bracelet",
        icon: FiLink,
      },
    ],
  },
  {
    key: "add-products",
    label: "Add Products",
    href: "/add-product",
    icon: FiGift,
    type: "link",
  },
];

// Reusable button styles (সব button এক size-এ থাকবে, text ভাঙবে না)
const primaryBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900";

const dangerBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-gray-900";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const displayName = user?.name || user?.email || "Admin";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Screen বড় হলে mobile menu নিজে থেকে বন্ধ হবে
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleMobileDropdown = (key) => {
    setOpenMobileDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully", { duration: 1500 });
            setIsMenuOpen(false);
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch (err) {
      toast.error("Sign out failed. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg"
    >
      <header className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-3 px-3 sm:px-6">
        {/* Left Section: Mobile Toggle & Logo */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="xl:hidden p-1 text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md"
            >
              <FiShoppingBag className="h-5 w-5" />
            </motion.div>
            <span className="whitespace-nowrap text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
              Miraz <span className="text-primary">Shop</span>
            </span>
          </NextLink>
        </div>

        {/* Center Section: Desktop Navigation (xl থেকে দেখাবে) */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              const isThisOpen = openDropdown === item.key;
              return (
                <Dropdown
                  key={item.key}
                  isOpen={isThisOpen}
                  onOpenChange={(open) => setOpenDropdown(open ? item.key : null)}
                >
                  <Dropdown.Trigger>
                    <div
                      className="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-default-100 hover:text-primary"
                      onClick={() => setOpenDropdown(isThisOpen ? null : item.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setOpenDropdown(isThisOpen ? null : item.key);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span>{item.label}</span>
                      <motion.div
                        animate={{ rotate: isThisOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </Dropdown.Trigger>

                  <Dropdown.Popover>
                    <Dropdown.Menu
                      aria-label={`${item.label} Menu`}
                      className="w-[340px] max-w-[90vw]"
                    >
                      <Dropdown.Section>
                        <Header className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-default-400">
                          {item.header ?? item.label}
                        </Header>
                        {item.children?.map((child) => (
                          <Dropdown.Item
                            key={child.key}
                            as={NextLink}
                            href={child.href}
                            className="rounded-xl px-3 py-2.5 transition-all hover:bg-content2"
                          >
                            <div className="flex w-full items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <child.icon className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <Label className="cursor-pointer text-sm font-bold text-foreground">
                                  {child.title}
                                </Label>
                                <Description className="text-xs font-normal text-default-400">
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

            return (
              <NextLink
                key={item.key}
                href={item.href}
                className="shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-default-100 hover:text-primary"
              >
                {item.label}
              </NextLink>
            );
          })}
        </div>

        {/* Right Section: Theme & Auth */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {mounted ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ThemeSwitch />
            </motion.div>
          ) : (
            <div className="h-10 w-10" />
          )}

          {/* Auth Area (md থেকে দেখাবে, ছোট screen-এ mobile menu-তে থাকবে) */}
          {isPending ? (
            <div className="hidden h-10 w-28 animate-pulse rounded-xl bg-default-100 md:block" />
          ) : user ? (
            <>
              {/* Admin name */}
              <div className="hidden items-center gap-2 whitespace-nowrap rounded-xl border border-default-200 bg-default-100/60 px-3 py-2 text-sm font-semibold text-foreground md:flex">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600/15 text-indigo-600">
                  <FiUser className="h-3.5 w-3.5" />
                </span>
                <span className="max-w-[120px] truncate">{displayName}</span>
              </div>

              {/* Sign Out */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className={`${dangerBtn} hidden md:inline-flex`}
              >
                <FiLogOut className="h-4 w-4 shrink-0" />
                <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-block"
              >
                <NextLink href="/signin" className={primaryBtn}>
                  <FiLogIn className="h-4 w-4 shrink-0" />
                  <span>Sign In</span>
                </NextLink>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-block"
              >
                <NextLink href="/signup" className={primaryBtn}>
                  <FiUserPlus className="h-4 w-4 shrink-0" />
                  <span>Sign Up</span>
                </NextLink>
              </motion.div>
            </>
          )}
        </div>
      </header>

      {/* Mobile / Tablet Menu (xl-এর নিচে) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-default-200 bg-background xl:hidden"
          >
            {/* বেশি item হলে menu scroll করা যাবে */}
            <div className="flex max-h-[calc(100vh-4rem)] flex-col gap-3 overflow-y-auto p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.type === "dropdown") {
                  const isOpen = !!openMobileDropdown[item.key];
                  return (
                    <div key={item.key} className="flex flex-col gap-1">
                      <button
                        onClick={() => toggleMobileDropdown(item.key)}
                        className="flex w-full items-center justify-between py-2 text-base font-medium text-foreground hover:text-primary"
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
                        <div className="ml-2 flex flex-col gap-2 border-l-2 border-primary/20 pb-2 pl-8 pt-1">
                          {item.children?.map((child) => (
                            <NextLink
                              key={child.key}
                              href={child.href}
                              className="flex items-center gap-2 py-1 text-sm font-medium text-default-600 hover:text-primary"
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

              {/* Mobile Auth Area */}
              <div className="flex flex-col gap-2 border-t border-default-200 pt-3">
                {isPending ? (
                  <div className="h-10 w-full animate-pulse rounded-xl bg-default-100" />
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 py-2 text-base font-semibold text-foreground">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/15 text-indigo-600">
                        <FiUser className="h-4 w-4" />
                      </span>
                      <span className="truncate">{displayName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className={`${dangerBtn} w-full`}
                    >
                      <FiLogOut className="h-4 w-4 shrink-0" />
                      <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <NextLink
                      href="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className={`${primaryBtn} w-full`}
                    >
                      <FiLogIn className="h-4 w-4 shrink-0" />
                      <span>Sign In</span>
                    </NextLink>
                    <NextLink
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className={`${primaryBtn} w-full`}
                    >
                      <FiUserPlus className="h-4 w-4 shrink-0" />
                      <span>Sign Up</span>
                    </NextLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}