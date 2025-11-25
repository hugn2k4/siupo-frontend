import { useMemo } from "react";
import ROUTES_META from "../config/routesMeta";
import { useTranslation } from "./useTranslation";

interface TranslatedRouteMeta {
  title: string;
  breadcrumb: { label: string; path?: string }[];
  backgroundImage?: string;
}

/**
 * Hook to get translated route metadata
 * @param path - The route path
 * @returns Translated route metadata with title and breadcrumb
 */
export function useRouteMeta(path: string): TranslatedRouteMeta | null {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation("auth");

  return useMemo(() => {
    const meta = ROUTES_META[path];
    if (!meta) return null;

    // Translate title
    const title: string = meta.titleKey
      ? meta.titleKey.startsWith("forgotPassword") || meta.titleKey.startsWith("setNewPassword")
        ? // @ts-expect-error - Dynamic translation key
          String(tAuth(meta.titleKey))
        : // @ts-expect-error - Dynamic translation key
          String(t(meta.titleKey))
      : meta.title;

    // Translate breadcrumb
    const breadcrumb = meta.breadcrumb.map((item) => ({
      label: item.labelKey
        ? item.labelKey.startsWith("forgotPassword") || item.labelKey.startsWith("setNewPassword")
          ? // @ts-expect-error - Dynamic translation key
            String(tAuth(item.labelKey))
          : // @ts-expect-error - Dynamic translation key
            String(t(item.labelKey))
        : item.label,
      path: item.path,
    }));

    return {
      title,
      breadcrumb,
      backgroundImage: meta.backgroundImage,
    };
  }, [path, t, tAuth]);
}

export default useRouteMeta;
