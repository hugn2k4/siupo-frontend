import type { BannerProps } from "../../../types/props/BannerProps";
import { Skeleton } from "@mui/material";
import { useTranslation } from "../../../hooks/useTranslation"; // Thêm import này
import defaultAboutUsStaff from "../../../assets/images/image_about_us_staff.png";
import defaultBackground from "../../../assets/images/image_about_us_6.png";
import chef1 from "../../../assets/images/image_chef_1.png";
import chef2 from "../../../assets/images/image_chef_2.png";
import chef3 from "../../../assets/images/image_chef_3.png";
const TeamSection: React.FC<BannerProps> = ({ banners, loading }) => {
  const { t } = useTranslation("chef"); // Dùng chung namespace "chef" như ChefPage
  const chefImages = [chef1, chef2, chef3];
  // Lấy dữ liệu từ translation giống hệt ChefPage, chỉ lấy 3 thành viên đầu
  const allChefs = t("chefs", { returnObjects: true }) as Array<{
    name: string;
    role: string;
  }>;

  const teamMembers = allChefs.slice(0, 3); // Chỉ lấy 3 người đầu tiên

  const staffImage = banners[1]?.url || defaultAboutUsStaff; // id: 104
  const backgroundImage = banners[2]?.url || defaultBackground;

  return (
    <section className="relative bg-green-primary pt-16 pb-78">
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
        <p className="text-green-100 max-w-2xl mx-auto">
          Your dedication and performance have been outstanding — thank you for consistently going above and beyond.
        </p>
      </div>

      {/* Grid nổi lên - giữ nguyên hoàn toàn */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-25 top-full -mt-74">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={256} />
              ) : staffImage ? (
                <img
                  src={chefImages[index]} // Dùng ảnh riêng theo index: chef1, chef2, chef3
                  alt={member.name}
                  className="w-full h-70 object-cover"
                />
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
