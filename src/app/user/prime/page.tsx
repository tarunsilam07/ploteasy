"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import {
  CalendarDaysIcon,
  HomeModernIcon,
  StarIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ShareIcon,
  ArrowUturnLeftIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Plan {
  title: string;
  color: string;
  listings: number;
  premiumBadging: number;
  shows: number;
  emi: boolean;
  saleAssurance: boolean;
  socialMedia: boolean;
  moneyBack: boolean | string;
  teleCalling: boolean;
  price: string;
  originalPrice: string;
  note: string;
}

interface ShowMoreState {
  [key: string]: boolean;
}

const plans: Plan[] = [
  {
    title: "Quarterly Plan",
    color: "from-blue-500 to-blue-700",
    listings: 5,
    premiumBadging: 1,
    shows: 1,
    emi: true,
    saleAssurance: false,
    socialMedia: true,
    moneyBack: false,
    teleCalling: false,
    price: "₹8,999/-",
    originalPrice: "₹12,499",
    note: "Inclusive of GST",
  },
  {
    title: "Half Yearly Plan",
    color: "from-emerald-500 to-emerald-700",
    listings: 10,
    premiumBadging: 2,
    shows: 2,
    emi: true,
    saleAssurance: false,
    socialMedia: true,
    moneyBack: false,
    teleCalling: true,
    price: "₹17,999/-",
    originalPrice: "₹26,999",
    note: "Inclusive of GST",
  },
  {
    title: "Annual Plan",
    color: "from-purple-500 to-purple-700",
    listings: 25,
    premiumBadging: 3,
    shows: 4,
    emi: true,
    saleAssurance: true,
    socialMedia: true,
    moneyBack: "Yes (After 6th month)",
    teleCalling: true,
    price: "₹29,988/-",
    originalPrice: "₹44,982",
    note: "Inclusive of GST",
  },
];

const SubscriptionPage = () => {
  const [showMore, setShowMore] = useState<ShowMoreState>({});

  const toggleShowMore = (title: string) => {
    setShowMore((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderFeature = (
    text: string,
    value: boolean | string | number,
    Icon: React.ElementType
  ) => {
    const isMoneyBackPolicy = text.toLowerCase().includes("money back");

    return (
      <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <Icon className="w-5 h-5 text-gray-500" />
          {text}
        </span>
        {typeof value === "boolean" ? (
          value ? (
            <CheckCircleIcon className="w-6 h-6 text-[#20B4B1]" />
          ) : (
            <MinusCircleIcon className="w-6 h-6 text-gray-300" />
          )
        ) : isMoneyBackPolicy ? (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            {value}
          </span>
        ) : (
          <span className="font-semibold text-gray-800">{value}</span>
        )}
      </li>
    );
  };

  const PlanCard = ({ plan }: { plan: Plan }) => (
    <div
      className={`relative flex flex-col justify-between bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 border-t-8 ${plan.color} overflow-hidden`}
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-center text-gray-900 mb-1">
          {plan.title.toUpperCase()}
        </h3>
        <p className="text-center text-gray-500 text-sm mb-2">
          The perfect plan for your needs.
        </p>
        <div className="text-center mb-4">
          <p className="text-3xl font-extrabold text-gray-900">{plan.price}</p>
          <p className="text-sm text-gray-400 line-through">
            (Original: {plan.originalPrice})
          </p>
        </div>

        <ul className="text-base">
          {renderFeature(
            plan.title === "Quarterly Plan"
              ? "3 Months Validity"
              : plan.title === "Half Yearly Plan"
              ? "6 Months Validity"
              : "12 Months Validity",
            true,
            CalendarDaysIcon
          )}
          {renderFeature(
            `${plan.premiumBadging} Premium Listing${plan.premiumBadging > 1 ? "s" : ""}`,
            true,
            StarIcon
          )}
          {renderFeature(
            `${plan.listings} Property Listing${plan.listings > 1 ? "s" : ""}`,
            true,
            HomeModernIcon
          )}
          {renderFeature(
            `Property Shows`,
            `${plan.shows} Event${plan.shows > 1 ? "s" : ""}`,
            CalendarDaysIcon
          )}

          {showMore[plan.title] && (
            <>
              {renderFeature("EMI Options", plan.emi, BanknotesIcon)}
              {renderFeature("Sale Assurance", plan.saleAssurance, ShieldCheckIcon)}
              {renderFeature("Social Media Promotions", plan.socialMedia, ShareIcon)}
              {renderFeature("100% Money Back Policy", plan.moneyBack, ArrowUturnLeftIcon)}
              {renderFeature("Tele Calling Service", plan.teleCalling, PhoneIcon)}
            </>
          )}
        </ul>

        <div className="mt-4 text-center">
          <button
            onClick={() => toggleShowMore(plan.title)}
            className="inline-flex items-center justify-center text-[#20B4B1] hover:text-[#1a9a97] text-sm font-semibold mb-3 px-5 py-1.5 rounded-full transition duration-300 border border-[#20B4B1]"
          >
            {showMore[plan.title] ? "View Less Features" : "View More Features"}
          </button>

          <button className="w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#20B4B1] to-[#1a9a97] hover:opacity-90 transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
            BUY NOW
          </button>

          {plan.note && <p className="mt-2 text-xs text-gray-500">{plan.note}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Unlock Your Property's Full Potential
        </h2>
        <p className="mt-4 text-lg sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Choose a plan designed to elevate your listings and connect you with the right buyers.
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
        {plans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} />
        ))}
      </div>

      {/* Mobile Slider View */}
      <div className="md:hidden px-4 relative">
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="w-full"
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.title}>
              <PlanCard plan={plan} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 text-[#20B4B1]">
          <ChevronLeftIcon className="w-8 h-8" />
        </div>
        <div className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2 text-[#20B4B1]">
          <ChevronRightIcon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
