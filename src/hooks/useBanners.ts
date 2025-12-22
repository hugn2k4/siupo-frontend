import { useEffect, useState } from "react";
import bannerApi from "../api/bannerApi";
import type { Banner } from "../types/models/banner";

interface UseBannersResult {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
}

export const useBanners = (position: string, defaultBanners: Banner[] = []): UseBannersResult => {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!position) return;

    let isMounted = true;

    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await bannerApi.getAll();
        const filtered = response.data
          .filter((b) => b.position === position)
          .sort((a, b) => Number(a.id) - Number(b.id));
        if (isMounted && filtered.length > 0) {
          setBanners(filtered);
        }
        setError(null);
      } catch (err: unknown) {
        const errorObj = err instanceof Error ? err : new Error("Unknown error");
        setError(errorObj);
        if (isMounted) setBanners(defaultBanners);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBanners();
    return () => {
      isMounted = false;
    };
  }, [position, JSON.stringify(defaultBanners)]);

  return { banners, loading, error };
};
