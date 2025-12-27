import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";

const LatestNewsBlog = () => {
  const { t } = useTranslation("home");
  const blogPosts = [
    {
      id: 1,
      image:
        "https://cdn.gosmd.gr/img/1920/max/82/2019/12/04/1675175153557-273421438-5de7beaedfae8.webp?t=78nTv0FnHxJ2CAtuPn3Nnw",
      date: "02 Jan 2022",
      comments: 3,
      title: "Chocolate Truffle Cake With Honey Flavor",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur elit. Non mi sed etiam a id at ultricies neque.Tempus,poten diam ac integer id tellus est.",
    },
    {
      id: 2,
      image:
        "https://cdn.gosmd.gr/img/1920/max/82/2019/12/04/1675175153557-273421438-5de7beaedfae8.webp?t=78nTv0FnHxJ2CAtuPn3Nnw",
      date: "02 Jan 2022",
      comments: 3,
      title: "Chocolate Truffle Cake With Honey Flavor",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur elit. Non mi sed etiam a id at ultricies neque.Tempus,poten diam ac integer id tellus est.",
    },
    {
      id: 3,
      image:
        "https://cdn.gosmd.gr/img/1920/max/82/2019/12/04/1675175153557-273421438-5de7beaedfae8.webp?t=78nTv0FnHxJ2CAtuPn3Nnw",
      date: "02 Jan 2022",
      comments: 3,
      title: "Chocolate Truffle Cake With Honey Flavor",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur elit. Non mi sed etiam a id at ultricies neque.Tempus,poten diam ac integer id tellus est.",
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="flex justify-center items-center gap-2 mb-3 sm:mb-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{t("blog.title") as string}</h1>
            <span className="text-2xl sm:text-3xl">🌿</span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t("blog.description") as string}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span>Comments ({post.comments.toString().padStart(2, "0")})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                {/* Read More Link */}
                <button className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors group/btn">
                  <span>{t("blog.readMore") as string}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsBlog;
