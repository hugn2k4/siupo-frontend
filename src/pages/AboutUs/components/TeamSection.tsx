import type { BannerProps } from "../../../types/props/BannerProps";
import { Skeleton } from "@mui/material";
const TeamSection: React.FC<BannerProps> = ({ banners, loading }) => {
  const teamMembers = [
    { name: "Aida Henry", role: "Kitchen Porter" },
    { name: "Lydia Haris", role: "Head Chef" },
    { name: "Moana Henry", role: "Kitchen Porter" },
    { name: "Tala William", role: "Head Chef" },
  ];
  const staffImage = banners[1]?.url || ""; // id: 104 - image_about_us_staff
  const backgroundImage = banners[2]?.url || "";
  return (
    <section className="relative bg-primary pt-16 pb-78">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Team Member</h2>
        <p className="text-orange-100 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      {/* Grid nổi lên */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 top-full -mt-54">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={256} />
              ) : staffImage ? (
                <img src={staffImage} alt={member.name} className="w-full h-64 object-cover" />
              ) : null}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamSection;
