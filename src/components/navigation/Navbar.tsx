import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Disclosure, Menu, Transition } from '@headlessui/react'

const navigation = [
  { name: 'Home', href: '/', current: true },
  {
    name: 'About Us',
    href: '#',
    current: false,
    dropdown: [
      { name: 'Mission & Vision', href: '#mission-vision' },
      { name: 'Our Work', href: '#our-work' },
      { name: 'Who We Are', href: '#who-we-are' },
    ],
  },
  { name: 'Donate', href: '/donate', current: false },
  { name: 'Daily Food Request', href: '/daily-food-request', current: false },
  { name: 'Volunteers', href: '/volunteers', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)

  const handleMobileLinkClick = () => {
    setMobileDropdownOpen(false)
    document.getElementById('mobile-menu-button')?.click()
  }

  return (
    <Disclosure as="nav" className="bg-black shadow-lg fixed w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2"
                  >
                    <Image
                      src="/logo.png"
                      alt="FoodShare"
                      width={120}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </motion.div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.dropdown ? (
                      <Menu as="div" className="relative">
                        <Menu.Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200">
                          {item.name}
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-black py-2 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                            {item.dropdown.map((dropdownItem) => (
                              <Menu.Item key={dropdownItem.name}>
                                {({ active }) => (
                                  <Link
                                    href={dropdownItem.href}
                                    className={classNames(
                                      active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white',
                                      'block px-6 py-2.5 text-sm transition-colors duration-200'
                                    )}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'text-white border-b-2 border-white'
                            : 'text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white',
                          'inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Auth & Contact Buttons */}
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <Link href="/auth/signin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors duration-200"
                  >
                    Sign In NGO/Restaurant
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-gray-200 transition-colors duration-200"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <Disclosure.Button 
                  id="mobile-menu-button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="lg:hidden bg-black">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="px-3 py-2">
                      <button
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="w-full text-left text-base font-medium text-white hover:bg-gray-900 hover:text-white flex justify-between items-center"
                      >
                        {item.name}
                        <svg
                          className={`h-5 w-5 transform transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {mobileDropdownOpen && (
                        <div className="mt-2 pl-4 space-y-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={handleMobileLinkClick}
                              className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-white rounded-md"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleMobileLinkClick}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 border-white text-white'
                          : 'border-transparent text-gray-300 hover:bg-gray-900 hover:border-gray-300 hover:text-white',
                        'block px-3 py-2 text-base font-medium border-l-4'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/auth/signin"
                onClick={handleMobileLinkClick}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-white border-l-4 border-transparent"
              >
                Sign In NGO/Restaurant
              </Link>
            </div>
            <div className="border-t border-gray-800 pb-3 pt-4">
              <div className="px-4 space-y-3">
                <Link
                  href="/contact"
                  onClick={handleMobileLinkClick}
                  className="block w-full text-center rounded-md bg-white px-4 py-2.5 text-base font-medium text-black hover:bg-gray-200 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}