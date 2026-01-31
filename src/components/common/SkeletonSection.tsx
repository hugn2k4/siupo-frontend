// src/components/common/SkeletonSection.tsx
// Reusable skeleton loading for sections

import { Box, Container, Skeleton } from "@mui/material";

interface SkeletonSectionProps {
  variant?: "hero" | "grid" | "list" | "gallery";
  height?: string | number;
}

export const SkeletonSection = ({ variant = "list", height = "400px" }: SkeletonSectionProps) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {variant === "hero" && (
        <Box sx={{ display: "flex", gap: 4, minHeight: height }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={60} />
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="70%" height={40} />
            <Skeleton variant="rectangular" width={200} height={50} sx={{ mt: 3, borderRadius: 2 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      )}

      {variant === "grid" && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Box key={i}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          ))}
        </Box>
      )}

      {variant === "list" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" height={30} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="50%" />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {variant === "gallery" && (
        <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rectangular" width={300} height={250} sx={{ borderRadius: 2, flexShrink: 0 }} />
          ))}
        </Box>
      )}
    </Container>
  );
};
