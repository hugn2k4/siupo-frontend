import { Suspense, lazy, memo } from "react";
import { ErrorBoundary } from "../../components/common/ErrorBoundary";
import { SkeletonSection } from "../../components/common/SkeletonSection";
import Hero from "./components/Hero";
const AboutUs = lazy(() => import("./components/AboutUs"));
const FoodCategory = lazy(() => import("./components/FoodCategory"));
const WhyChooseUs = lazy(() => import("./components/WhyChoseUs"));
const MenuSection = lazy(() => import("./components/MenuSection"));
const CustomerReview = lazy(() => import("./components/CustomerReview"));
const LatestNewsBlog = lazy(() => import("./components/LatestNewsBlog"));
const TeamSection = lazy(() => import("../../components/shared/TeamSection"));
const Partners = lazy(() => import("../../components/shared/Partners"));

function HomePage() {
  return (
    <>
      {/* Hero - Load immediately (above fold) */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* Below fold - Lazy load with suspense */}
      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <AboutUs />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="gallery" />}>
        <ErrorBoundary>
          <FoodCategory />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <WhyChooseUs />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="list" />}>
        <ErrorBoundary>
          <MenuSection />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <TeamSection />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="list" />}>
        <ErrorBoundary>
          <CustomerReview />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="grid" />}>
        <ErrorBoundary>
          <LatestNewsBlog />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<SkeletonSection variant="gallery" />}>
        <ErrorBoundary>
          <Partners />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default memo(HomePage);
