// components/featured-listings.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Carousel } from './slider'; // Import Carousel
import { LocationIcon } from './emojis'; // Import LocationIcon

const featuredListings = [
    {
        id: 1,
        title: 'Luxury Apartment with City View',
        price: '₹ 2.5 Cr',
        location: 'Mumbai, India',
        imageUrl: '/img1 (2).jpg',
        type: 'Apartment',
        tags: ['Premium', 'Verified'],
    },
    {
        id: 2,
        title: 'Spacious Family House',
        price: '₹ 1.2 Cr',
        location: 'Bangalore, India',
        imageUrl: '/img2 (2).jpg',
        type: 'House',
        tags: ['New'],
    },
    {
        id: 3,
        title: 'Prime Commercial Land',
        price: '₹ 5.0 Cr',
        location: 'Delhi, India',
        imageUrl: '/img1 (2).jpg',
        type: 'Land',
        tags: ['Premium'],
    },
    {
        id: 4,
        title: 'Cozy Studio for Rent',
        price: '₹ 25,000/month',
        location: 'Chennai, India',
        imageUrl: '/img2 (2).jpg',
        type: 'Rental',
        tags: ['Verified'],
    },
    {
        id: 5,
        title: 'Modern Villa with Pool',
        price: '₹ 3.8 Cr',
        location: 'Goa, India',
        imageUrl: '/img1 (2).jpg',
        type: 'Villa',
        tags: ['Premium', 'New'],
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

export const FeaturedListings = () => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="py-12"
        >
            <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold text-center text-gray-800 mb-10"
            >
                Featured Listings
            </motion.h2>
            <div className="relative max-w-full lg:max-w-4xl mx-auto">
                <Carousel cardWidthClass="w-full sm:w-1/2 lg:w-1/3 p-2" snapAlign="snap-start" interval={4000}>
                    {featuredListings.map((listing) => (
                        <motion.div
                            key={listing.id}
                            variants={itemVariants}
                            className="flex-shrink-0 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.02] cursor-pointer"
                        >
                            <div className="relative">
                                <img
                                    src={listing.imageUrl}
                                    alt={listing.title}
                                    className="w-full h-56 object-cover rounded-t-2xl"
                                />
                                <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                                    {listing.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#20b4b1]/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{listing.title}</h3>
                                <p className="text-[#20b4b1] font-extrabold text-lg mb-1">{listing.price}</p>
                                <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                                    <LocationIcon /> {listing.location}
                                </p>
                                <button className="w-full bg-[#20b4b1] hover:bg-[#1a9a97] text-white py-3 rounded-xl font-medium transition duration-300 ease-in-out shadow-md">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </Carousel>
            </div>
            <motion.div
                variants={itemVariants}
                className="text-center mt-12"
            >
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-full font-semibold shadow-md transition-transform duration-200 transform hover:scale-105">
                    Browse All Listings
                </button>
            </motion.div>
        </motion.section>
    );
};