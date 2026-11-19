
import Link from 'next/link';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="border-t bg-white text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* 1. Logo and Short Description */}
          <div className="space-y-3">
            {/* <Link href="/" className="text-2xl font-bold text-white">
              🍕 Pizza<span className="text-red-500">Hub</span>
            </Link> */}
            <Image
                       src="/Pizza.png"
                       alt="PizzaHub Logo"
                       width={150}
                       height={65}
                     />
            <p className="text-sm leading-relaxed text-gray-400">
              Discover local pizzerias, customize your favorite wood-fired pizzas, and track hot, fresh delivery straight to your door.
            </p>
          </div>

          {/* 2. Important Navigation Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse-menu" className="hover:text-red-400">
                  Browse Menu
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-red-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-red-400">
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 123 Pizza Street, Food District</li>
              <li>📞 +1 (555) 234-5678</li>
              <li>✉️ support@pizzahub.com</li>
              <li>🕒 Mon – Sun: 10:00 AM – 11:00 PM</li>
            </ul>
          </div>

          {/* 4. Social Media Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-gray-800 px-3 py-2 hover:bg-red-600 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-gray-800 px-3 py-2 hover:bg-red-600 hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-gray-800 px-3 py-2 hover:bg-red-600 hover:text-white"
              >
                X (Twitter)
              </a>
            </div>
          </div>

        </div>

        {/* 5. Copyright Information */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} PizzaHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}