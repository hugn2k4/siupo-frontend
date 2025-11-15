import type { BannerProps } from "../../../types/props/BannerProps";
import { Skeleton } from "@mui/material";

const TestimonialSection: React.FC<BannerProps> = ({ banners, loading }) => {
  const clientImage = banners[3]?.url || "";
  return (
    <section className="py-16 bg-white mt-60">
      <div className="text-center mb-12">
        <h3 className="text-primary mb-2 text-left pl-[30%]" style={{ fontSize: 30, fontFamily: "Great Vibes" }}>
          Testimonials
        </h3>
        <h2 className="text-4xl font-bold text-gray-800 text-left pl-[30%] mb-4">What our client are saying</h2>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-6">
            {loading ? (
              <Skeleton variant="circular" width={160} height={160} className="mx-auto" />
            ) : clientImage ? (
              <img src={clientImage} alt="Client" className="w-40 h-40 object-cover rounded-full mx-auto" />
            ) : null}
          </div>

          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xl">
                ⭐
              </span>
            ))}
          </div>

          <blockquote className="text-gray-600 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat."
          </blockquote>

          <div>
            <p className="font-semibold text-gray-800">Aaravh Naehia</p>
            <p className="text-gray-500">Food Specialist</p>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialSection;
