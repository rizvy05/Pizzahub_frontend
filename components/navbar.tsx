'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Pizza,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
  ShoppingBag,
  PlusCircle,
  Users,
  UtensilsCrossed,
  Menu,
  X,
} from 'lucide-react';

export type UserRole = 'customer' | 'vendor' | 'admin';

export interface NavbarUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

interface NavbarProps {
  user: NavbarUser | null;
  onLogout: () => Promise<void> | void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus automatically on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Role-specific quick links in the main navbar
  const getRoleNavLinks = (role: UserRole) => {
    switch (role) {
      case 'customer':
        return [
          {
            label: 'My Orders',
            href: '/dashboard/orders',
            icon: ShoppingBag,
          },
        ];
      case 'vendor':
        return [
          {
            label: 'My Menu',
            href: '/dashboard/menu-items',
            icon: UtensilsCrossed,
          },
          {
            label: 'Add Item',
            href: '/dashboard/add-item',
            icon: PlusCircle,
          },
        ];
      case 'admin':
        return [
          {
            label: 'Manage Users',
            href: '/dashboard/users',
            icon: Users,
          },
          {
            label: 'Review Menu',
            href: '/dashboard/menu-items',
            icon: UtensilsCrossed,
          },
        ];
      default:
        return [];
    }
  };

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Menu', href: '/browse-menu' },
  ];

  const roleLinks = user ? getRoleNavLinks(user.role) : [];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleLogoutClick = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    await onLogout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-stone-900"
        >
     
          <Image
            src="/Pizza.png"
            alt="PizzaHub Logo"
            width={150}
            height={65}
          />
          {/* <span>
            Pizza<span className="text-red-600">Hub</span>
          </span> */}
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-orange-50 text-red-600 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {roleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-orange-50 text-red-600 font-semibold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Auth State (Logged Out vs Logged In) */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 active:scale-[0.98]"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2.5 rounded-full border border-stone-200 bg-stone-50/70 py-1.5 pl-2 pr-3 text-left transition-colors hover:border-orange-200 hover:bg-orange-50/50"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover ring-1 ring-stone-200"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold uppercase text-white">
                    {user.name.charAt(0)}
                  </span>
                )}
                <div className="flex flex-col">
                  <span className="max-w-[120px] truncate text-sm font-semibold leading-none text-stone-800">
                    {user.name}
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-orange-600">
                    {user.role}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-stone-500 transition-transform duration-150 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5"
                >
                  <div className="border-b border-stone-100 px-3 py-2">
                    <p className="truncate text-sm font-semibold text-stone-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-stone-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-orange-50 hover:text-red-600"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-orange-50 hover:text-red-600"
                    >
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </Link>
                  </div>

                  <div className="border-t border-stone-100 pt-1">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogoutClick}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-lg p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-100 bg-white px-4 pb-5 pt-3 md:hidden">
          {user && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-orange-50/60 p-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold uppercase text-white">
                  {user.name.charAt(0)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-900">
                  {user.name}
                </p>
                <p className="text-xs font-medium uppercase text-orange-600">
                  {user.role}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-orange-50 text-red-600 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {roleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-orange-50 text-red-600 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-stone-100 pt-4">
            {!user ? (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/sign-in"
                  className="rounded-lg border border-stone-200 py-2.5 text-center text-sm font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-lg bg-red-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-700"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  <Settings className="h-4 w-4" />
                  Profile Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}