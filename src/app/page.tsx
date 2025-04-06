    'use client'

    import { motion } from 'framer-motion'
    import Navbar from '@/components/navigation/Navbar'
    import { Swiper, SwiperSlide } from 'swiper/react'
    import { Navigation, Pagination, Autoplay } from 'swiper/modules'
    import 'swiper/css'
    import 'swiper/css/navigation'
    import 'swiper/css/pagination'
    import Image from 'next/image'

    const slides = [
      {
        image: '/images/slider/slide1.jpg',
        title: 'Fighting Hunger Together',
        description: 'Connecting those in need with food resources through NGO partnerships',
      },
      {
        image: '/images/slider/slide2.jpg',
        title: 'Reduce Food Waste',
        description: 'Help us redistribute surplus food from events and restaurants to those who need it',
      },
      {
        image: '/images/slider/slide3.jpg',
        title: 'Make a Difference',
        description: 'Join our network of volunteers and donors to create positive change',
      },
    ]

    const sections = [
      {
        id: 'mission-vision',
        title: 'Mission & Vision',
        content: 'Our mission is to create a sustainable food-sharing ecosystem that connects surplus food with those in need. We envision a world where no one goes hungry and no food goes to waste.',
      },
      {
        id: 'our-work',
        title: 'Our Work',
        content: 'We facilitate food donation from events and restaurants, coordinate with NGOs for distribution, and engage volunteers to help make it all possible.',
      },
      {
        id: 'who-we-are',
        title: 'Who We Are',
        content: 'We are a dedicated team of individuals committed to fighting hunger and reducing food waste through technology and community engagement.',
      },
    ]

    export default function Home() {
      const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }

      return (
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          
          {/* Hero Section with Slider */}
          <div className="h-[80vh] pt-20">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="h-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl font-bold md:text-7xl text-center max-w-4xl"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 max-w-2xl text-center text-xl md:text-2xl leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('mission-vision')}
                        className="mt-6 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Buttons for Sections */}
        

          {/* About Sections */}
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`py-24 ${index % 2 === 0 ? 'bg-black' : 'bg-gray-900'}`}
            >
              <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="text-center">
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-8">
                    {section.title}
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-300">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Footer */}
          <footer className="bg-black text-white border-t border-gray-800">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
                  <ul className="space-y-4">
                    <li>Email:info@v2kr.org</li>
                    <li>Phone: +19624357461</li>
                    <li>Address: Ahmedabad Institute Of Technology,Gota,Ahmedabad</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
                  <ul className="space-y-4">
                    <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                    <li><a href="#" className="hover:text-gray-300">Donate</a></li>
                    <li><a href="#" className="hover:text-gray-300">Find NGO</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
                  <ul className="space-y-4">
                    <li><a href="https://www.facebook.com/" className="hover:text-gray-300">Facebook</a></li>
                    <li><a href="https://x.com/?lang=en" className="hover:text-gray-300">Twitter</a></li>
                    <li><a href="https://www.instagram.com/kevish_29?igsh=MXNkcGZhaTBteDIwNA==" className="hover:text-gray-300">Instagram</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-400">&copy; 2025 v2kr. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )
    }
