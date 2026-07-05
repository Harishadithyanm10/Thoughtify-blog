
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-brand-dark text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-extrabold mb-6">About Thoughtify</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-200 leading-relaxed">
              Thoughtify is more than just a blogging platform—it's a community where
              ideas grow, stories inspire, and knowledge is shared. Whether you're a
              passionate writer, an aspiring creator, or an avid reader, Thoughtify
              provides the perfect place to express yourself and connect with others.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <h2 className="text-3xl font-bold text-brand-dark mb-6">
              Our Story
            </h2>

            <p className="text-gray-700 leading-8 mb-5">
              In today's fast-paced digital world, meaningful content often gets lost
              in endless feeds and distractions. Thoughtify was created to provide a
              clean, focused, and engaging platform where creators can publish
              high-quality articles and readers can discover content that truly
              matters.
            </p>

            <p className="text-gray-700 leading-8">
              Our goal is simple—to make sharing knowledge, experiences, and ideas
              effortless while building a supportive community that values authentic
              voices and thoughtful conversations.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 pb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4"></div>

            <h3 className="text-2xl font-bold text-brand-dark mb-4">
              Our Mission
            </h3>

            <p className="text-gray-700 leading-7">
              To empower individuals to share knowledge, express creativity, and
              inspire others through meaningful writing in a modern, user-friendly
              environment.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4"></div>

            <h3 className="text-2xl font-bold text-brand-dark mb-4">
              Our Vision
            </h3>

            <p className="text-gray-700 leading-7">
              To become one of the most trusted blogging communities where millions
              of readers discover valuable insights and creators build their digital
              presence.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">
              Why Choose Thoughtify?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="shadow-lg rounded-xl p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-bold text-xl mb-3">
                  Powerful Writing Experience
                </h3>
                <p className="text-gray-600">
                  Create, edit, and publish beautifully formatted blog posts with an
                  intuitive interface.
                </p>
              </div>

              <div className="shadow-lg rounded-xl p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-bold text-xl mb-3">
                  Organized Categories
                </h3>
                <p className="text-gray-600">
                  Discover articles across technology, travel, education,
                  programming, lifestyle, business, health, and many more topics.
                </p>
              </div>

              <div className="shadow-lg rounded-xl p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-bold text-xl mb-3">
                  Community Engagement
                </h3>
                <p className="text-gray-600">
                  Connect with readers through comments, discussions, and meaningful
                  conversations.
                </p>
              </div>

              <div className="shadow-lg rounded-xl p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-bold text-xl mb-3">
                  Secure Authentication
                </h3>
                <p className="text-gray-600">
                  Your account and content are protected using modern authentication
                  and security practices.
                </p>
              </div>

              <div className="shadow-lg rounded-xl p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-bold text-xl mb-3">
                  Fast & Responsive
                </h3>
                <p className="text-gray-600">
                  Built using modern web technologies to deliver a smooth experience
                  across desktop, tablet, and mobile devices.
                </p>
              </div>

              <div className="shadow-lg rounded-xl p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4"></div>
                <h3 className="font-bold text-xl mb-3">
                  Open for Everyone
                </h3>
                <p className="text-gray-600">
                  Whether you're a beginner or an experienced writer, everyone is
                  welcome to share their voice with the world.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-brand-dark text-white rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Core Values
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="font-bold text-xl mb-2">Innovation</h3>
                <p className="text-gray-300">
                  Constantly improving the writing experience.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Creativity</h3>
                <p className="text-gray-300">
                  Encouraging unique ideas and diverse perspectives.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Community</h3>
                <p className="text-gray-300">
                  Building meaningful connections through content.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Integrity</h3>
                <p className="text-gray-300">
                  Promoting authentic, respectful, and trustworthy content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="text-center py-20 px-6">
          <h2 className="text-4xl font-bold text-brand-dark mb-5">
            Join Our Journey
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-8">
            Every great idea starts with a single thought. At Thoughtify, we believe
            every voice deserves to be heard. Join our growing community of writers
            and readers, share your knowledge, inspire others, and make your thoughts
            matter.
          </p>
        </section>
      </div>
    </Layout>
  );
}
