// components/testimonials-section.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Carousel } from './slider'; // Import Carousel
import { QuoteIcon, StarIcon } from './emojis'; // Import QuoteIcon and StarIcon

const testimonials = [
    {
        id: 1,
        quote: "Finding our dream home was a breeze with this platform! The search filters are incredibly precise, and the support team was always there to help.",
        author: "Priya Sharma",
        location: "Bengaluru",
        rating: 5,
    },
    {
        id: 2,
        quote: "I listed my apartment for rent and had multiple offers within days. The process was smooth, and the visibility for my listing was exceptional.",
        author: "Rajesh Kumar",
        location: "Hyderabad",
        rating: 5,
    },
    {
        id: 3,
        quote: "As a first-time buyer, I was overwhelmed, but the detailed property information and clear photos made my decision much easier. Highly recommended!",
        author: "Anjali Singh",
        location: "Pune",
        rating: 4,
    },
];

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
        },
    },
};

export const TestimonialsSection = () => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="py-12 bg-[#20b4b1]/10 rounded-3xl shadow-inner mt-12"
        >
            <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold text-center text-gray-800 mb-10"
            >
                What Our Clients Say
            </motion.h2>
            <div className="relative max-w-full lg:max-w-6xl mx-auto">
                <Carousel cardWidthClass="w-full md:w-1/2 lg:w-1/3 p-4" snapAlign="snap-center" interval={5000}>
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                        >
                            <QuoteIcon />
                            <p className="text-lg text-gray-700 mb-5 italic font-light">"{testimonial.quote}"</p>
                            <div className="text-yellow-500 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} fill={i < testimonial.rating} />
                                ))}
                            </div>
                            <p className="font-bold text-gray-800">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </motion.div>
                    ))}
                </Carousel>
            </div>
        </motion.section>
    );
};