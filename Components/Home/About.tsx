"use client"

import Image from "next/image"

export default function About() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {/**adding animation to the logo here */}
            About <span className="text-[#FF9833]">AI HIRE</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We are revolutionizing the recruitment industry by leveraging artificial intelligence 
            to create seamless connections between talented professionals and innovative companies.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To eliminate bias in recruitment and make hiring faster, smarter, and more efficient. 
              We believe every candidate deserves a fair chance and every company deserves to find 
              the perfect match.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Through our AI-powered platform, we are bridging the gap between talent and opportunity, 
              creating a future where recruitment is transparent, data-driven, and human-centered.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-gray-100 rounded-2xl p-8">
              <div className="text-6xl text-center">🚀</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Constantly pushing boundaries with cutting-edge AI technology to solve real recruitment challenges.",
                icon: "💡",
              },
              {
                title: "Fairness",
                description: "Committed to eliminating bias and ensuring equal opportunities for all candidates regardless of background.",
                icon: "⚖️",
              },
              {
                title: "Transparency",
                description: "Building trust through clear processes, honest communication, and data-driven insights.",
                icon: "🔍",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-gray-100 hover:border-[#FF9833] transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Powered by Advanced AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Machine Learning</h3>
              <p className="text-gray-600">
                Our algorithms learn from thousands of successful placements to improve matching accuracy over time.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Natural Language Processing</h3>
              <p className="text-gray-600">
                Advanced NLP capabilities analyze resumes, job descriptions, and candidate profiles with human-level understanding.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Bias Detection</h3>
              <p className="text-gray-600">
                Built-in systems identify and eliminate unconscious bias to ensure fair evaluation of all candidates.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Predictive Analytics</h3>
              <p className="text-gray-600">
                Data-driven insights help companies make informed hiring decisions and predict candidate success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

