const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Still You Need Our Support ?</h2>
            <p className="text-gray-300">Don't wait make a smart & logical quote here. Its pretty easy.</p>
          </div>
          <div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 px-4 py-3 rounded-l-full focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-r-full font-semibold transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NewsletterSection;
