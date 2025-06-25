"use client";

import { Mail, MapPin, Phone, Clock, MessageSquare, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Get in <span className="text-blue-400">Touch</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          We'd love to hear from you. Here's how you can reach us.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 border border-blue-500/30">
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
            <p className="text-slate-400 mb-4">
              For general inquiries and support
            </p>
            <a
              href="mailto:contact@mindfuel.io"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              contact@mindfuel.io
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all">
            <div className="w-14 h-14 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30">
              <MapPin className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Visit Us</h3>
            <p className="text-slate-400 mb-4">
              Our headquarters in San Francisco
            </p>
            <address className="text-slate-400 not-italic">
              123 Tech Lane
              <br />
              San Francisco, CA 94107
            </address>
          </div>

          {/* Hours Card */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-green-500/50 transition-all">
            <div className="w-14 h-14 bg-green-600/20 rounded-lg flex items-center justify-center mb-6 border border-green-500/30">
              <Clock className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Hours</h3>
            <p className="text-slate-400 mb-4">
              Our team is available during these times
            </p>
            <div className="text-slate-400 space-y-1">
              <p>Mon-Fri: 9AM - 6PM PST</p>
              <p>Sat-Sun: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Options */}
      <section className="py-16 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Other Ways to <span className="text-blue-400">Connect</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We're active on these platforms
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: <Phone className="h-6 w-6" />,
                name: "Call Us",
                value: "+1 (555) 123-4567",
              },
              {
                icon: <MessageSquare className="h-6 w-6" />,
                name: "Live Chat",
                value: "Available 24/7",
              },
              {
                icon: <Globe className="h-6 w-6" />,
                name: "Social Media",
                value: "@mindfuel",
              },
            ].map((method, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 w-full sm:w-auto min-w-[240px] text-center"
              >
                <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {method.name}
                </h3>
                <p className="text-slate-400">{method.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Still Have <span className="text-blue-400">Questions</span>?
          </h2>
          <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
            Check out our FAQ or browse our knowledge base for instant answers.
          </p>
        </div>
      </section>
    </div>
  );
}
