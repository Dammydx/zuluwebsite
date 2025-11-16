import Link from 'next/link';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">zolu</h3>
            <p className="text-sm text-gray-600">
              Nigeria&apos;s first digital market hub connecting vendors, agro
              brands, and consumers.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  For Customers
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  For Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  For Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/get-started"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Creator Circle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  About Zolu
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Blog / News
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t pt-8">
          <p className="text-sm text-gray-600">
            © 2025 IRL-Technologies Ltd. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
