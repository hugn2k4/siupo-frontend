import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import translation files
import aboutEn from "../locales/en/about.json";
import accountEn from "../locales/en/account.json";
import authEn from "../locales/en/auth.json";
import bookingEn from "../locales/en/booking.json";
import cartEn from "../locales/en/cart.json";
import checkoutEn from "../locales/en/checkout.json";
import chefEn from "../locales/en/chef.json";
import commonEn from "../locales/en/common.json";
import contactEn from "../locales/en/contact.json";
import homeEn from "../locales/en/home.json";
import menuEn from "../locales/en/menu.json";
import productEn from "../locales/en/product.json";
import shopEn from "../locales/en/shop.json";
import vouchersEn from "../locales/en/vouchers.json";
import aboutVi from "../locales/vi/about.json";
import accountVi from "../locales/vi/account.json";
import authVi from "../locales/vi/auth.json";
import bookingVi from "../locales/vi/booking.json";
import cartVi from "../locales/vi/cart.json";
import checkoutVi from "../locales/vi/checkout.json";
import chefVi from "../locales/vi/chef.json";
import commonVi from "../locales/vi/common.json";
import contactVi from "../locales/vi/contact.json";
import homeVi from "../locales/vi/home.json";
import menuVi from "../locales/vi/menu.json";
import productVi from "../locales/vi/product.json";
import shopVi from "../locales/vi/shop.json";
import vouchersVi from "../locales/vi/vouchers.json";

// Define resources type for type safety
export const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    auth: authEn,
    checkout: checkoutEn,
    cart: cartEn,
    product: productEn,
    booking: bookingEn,
    account: accountEn,
    about: aboutEn,
    menu: menuEn,
    contact: contactEn,
    chef: chefEn,
    shop: shopEn,
    vouchers: vouchersEn,
  },
  vi: {
    common: commonVi,
    home: homeVi,
    auth: authVi,
    checkout: checkoutVi,
    cart: cartVi,
    product: productVi,
    booking: bookingVi,
    account: accountVi,
    about: aboutVi,
    menu: menuVi,
    contact: contactVi,
    chef: chefVi,
    shop: shopVi,
    vouchers: vouchersVi,
  },
} as const;

// Initialize i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,

    // Default language
    fallbackLng: "vi",

    // Default namespace
    defaultNS: "common",

    // Available namespaces
    ns: [
      "common",
      "home",
      "auth",
      "checkout",
      "cart",
      "product",
      "booking",
      "account",
      "about",
      "menu",
      "contact",
      "chef",
      "shop",
      "vouchers",
    ],

    // Language detection options
    detection: {
      // Order of detection methods
      order: ["localStorage", "navigator"],

      // Keys to lookup language from
      lookupLocalStorage: "i18nextLng",

      // Cache user language
      caches: ["localStorage"],
    },

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React options
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
    },

    // Debug mode (disable in production)
    debug: import.meta.env.DEV,
  });

export default i18n;
