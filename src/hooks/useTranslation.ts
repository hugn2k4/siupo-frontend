import { useTranslation as useI18nTranslation } from "react-i18next";

/**
 * Custom hook wrapper for useTranslation with namespace support
 * @param namespace - The translation namespace to use
 * @example
 * const { t } = useTranslation('checkout');
 * const title = t('title');
 *
 * @example
 * const { t, i18n } = useTranslation();
 * const homeLabel = t('navigation.home');
 * i18n.changeLanguage('vi');
 */

export type Namespace =
  | "common"
  | "home"
  | "auth"
  | "checkout"
  | "cart"
  | "product"
  | "booking"
  | "account"
  | "about"
  | "menu"
  | "contact"
  | "chef"
  | "shop"
  | "vouchers";

export function useTranslation(namespace: Namespace = "common") {
  return useI18nTranslation(namespace);
}

export default useTranslation;
