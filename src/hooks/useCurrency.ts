import { useTranslation } from "react-i18next";
import { formatCurrencyBase } from "../utils/format";

export const useCurrency = () => {
  const { i18n } = useTranslation();

  const format = (value: number) => {
    return formatCurrencyBase(value, i18n.language);
  };

  return { format, locale: i18n.language };
};
