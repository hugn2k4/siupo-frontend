import { useState, useEffect } from "react";
import bannerApi from "../api/bannerApi";
import type { Banner } from "../types/models/banner";

interface UseBannersResult {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
}

export const useBanners = (position: string): UseBannersResult => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!position) return;

    const fetchBanners = async () => {
      try {
        setLoading(true);

        const response = await bannerApi.getAll();

        const filtered = response.data
          .filter((b) => b.position === position) // ❌ bỏ lọc active
          .sort((a, b) => Number(a.id) - Number(b.id));

        setBanners(filtered);
        setError(null);
      } catch (err: unknown) {
        const errorObj = err instanceof Error ? err : new Error("Unknown error");
        setError(errorObj);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [position]);

  return { banners, loading, error };
};
