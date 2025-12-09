"use client";

const footerLinks = {
  company: [
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Work", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Resources", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  social: [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Dribbble", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Creative Studio
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Building digital experiences that inspire and engage.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Follow Us</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Creative Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

