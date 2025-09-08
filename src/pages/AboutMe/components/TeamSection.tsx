import AboutusStaff from "../../../assets/images/AboutusStaff.png";
const TeamSection: React.FC = () => {
  const teamMembers = [
    { name: "Aida Henry", role: "Kitchen Porter" },
    { name: "Lydia Haris", role: "Head Chef" },
    { name: "Moana Henry", role: "Kitchen Porter" },
    { name: "Tala William", role: "Head Chef" },
  ];

  return (
    <section className="py-16 bg-orange-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Team Member</h2>
          <p className="text-orange-100 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">
                <img src={AboutusStaff} alt={member.name} className="w-full h-64 object-cover rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-orange-100">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamSection;
