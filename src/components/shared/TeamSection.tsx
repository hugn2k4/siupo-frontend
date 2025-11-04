// src/components/shared/TeamSection.tsx
// Reusable Team section component

import { Skeleton } from "@mui/material";
import chef1 from "../../assets/images/chefs/image_chef_1.png";
import chef2 from "../../assets/images/chefs/image_chef_2.png";
import chef3 from "../../assets/images/chefs/image_chef_3.png";
import defaultBackground from "../../assets/images/defaults/image_background_team_section.png";
import { useTranslation } from "../../hooks/useTranslation";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface TeamSectionProps {
  loading?: boolean;
  members?: TeamMember[];
  maxMembers?: number;
  variant?: "home" | "about";
  backgroundColor?: string;
  textColor?: string;
}

const TeamSection = ({
  loading = false,
  members,
  maxMembers = 3,
  variant = "home",
  backgroundColor,
  textColor,
}: TeamSectionProps) => {
  const { t } = useTranslation(variant === "about" ? "about" : "home");
  const { t: tChef } = useTranslation("chef");

  // Variant-specific configurations
  const variantConfig = {
    home: {
      bgColor: "bg-green-primary",
      textColor: "text-green-100",
      heading: t("chefSection.heading") as string,
      title: t("chefSection.title") as string,
      bottomMargin: "pb-78",
      gridMargin: "-mt-74",
      gridPadding: "px-25",
    },
    about: {
      bgColor: "bg-primary",
      textColor: "text-orange-100",
      heading: t("team.title") as string,
      title: t("team.description") as string,
      bottomMargin: "pb-58",
      gridMargin: "-mt-54",
      gridPadding: "px-40",
    },
  };

  const config = variantConfig[variant];

  // Get team members based on variant
  const defaultMembers =
    variant === "about"
      ? (tChef("chefs", { returnObjects: true }) as TeamMember[]).slice(0, maxMembers)
      : (t("chefSection.members", { returnObjects: true }) as TeamMember[]).slice(0, maxMembers);

  const teamMembers = members || defaultMembers;
  const chefImages = [chef1, chef2, chef3];

  // Get images from banners
  const backgroundImage = defaultBackground;

  // Allow override with custom backgroundColor
  const bgColorClass = backgroundColor || config.bgColor;
  const textColorClass = textColor || config.textColor;

  return (
    <section className={`relative ${bgColorClass} pt-16 ${config.bottomMargin}`}>
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">{config.heading}</h2>
        <p className={`${textColorClass} max-w-2xl mx-auto`}>{config.title}</p>
      </div>

      {/* Team grid - overlapping design */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-6xl ${config.gridPadding} top-full ${config.gridMargin}`}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${variant === "about" ? "gap-8" : "gap-6"} place-items-center`}
        >
          {teamMembers.map((member, index) => (
            <div
              key={`team-member-${index}`}
              className="bg-white rounded-lg shadow-lg text-center overflow-hidden w-full"
            >
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={256} />
              ) : (
                <img
                  src={member.image || chefImages[index]}
                  alt={member.name}
                  className="w-full h-70 object-cover"
                  loading="lazy"
                />
              )}
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
