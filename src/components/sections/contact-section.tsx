'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Kaggle } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../ui-custom/animations';
import { GlassCard, GradientText, GlassButton } from '../ui-custom/glass-card';
import profile from '../../../content/profile.json';
import { getProfilePhoneList } from '@/lib/utils';

/** Formspree form — override with NEXT_PUBLIC_CONTACT_FORM_ACTION in .env or Vercel. */
const DEFAULT_FORMSPREE_ACTION = 'https://formspree.io/f/xojrpknn';
const CONTACT_FORM_ACTION =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION?.trim() || DEFAULT_FORMSPREE_ACTION;

export function ContactSection() {
  const phones = getProfilePhoneList(profile);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('subject', formData.subject);
      fd.append('message', formData.message);
      fd.append('_replyto', formData.email);
      fd.append('_subject', `[Portfolio] ${formData.subject}`);

      const res = await fetch(CONTACT_FORM_ACTION, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Try email or LinkedIn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <GradientText>Touch</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                
                <StaggerContainer className="space-y-4">
                  <StaggerItem>
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group"
                    >
                      <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                        <Mail className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{profile.email}</p>
                      </div>
                    </a>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors group">
                      <div className="p-3 rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                        <Phone className="text-cyan-400" size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-400 text-sm">Phone</p>
                        <div className="flex flex-col gap-1 mt-1">
                          {phones.map((num) => (
                            <a
                              key={num}
                              href={`tel:${num}`}
                              className="text-white break-all hover:text-cyan-300 transition-colors"
                            >
                              {num}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="p-3 rounded-xl bg-purple-500/20">
                        <MapPin className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white">{profile.location}</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                {/* Social Links */}
                <div className="mt-8">
                  <p className="text-gray-400 text-sm mb-4">Find me on</p>
                  <div className="flex gap-4">
                    <motion.a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
                    >
                      <Github size={24} />
                    </motion.a>
                    <motion.a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
                    >
                      <Linkedin size={24} />
                    </motion.a>
                    <motion.a
                      href={profile.social.kaggle}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Kaggle profile"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.848 1.78v4.824c0 .154-.078.233-.233.233H5.329c-.156 0-.233-.079-.233-.233V.233c0-.156.077-.233.233-.233h2.325c.156 0 .233.077.233.233v14.618l7.066-7.146c.166-.166.33-.248.492-.248h3.239c.117 0 .198.042.248.124.049.083.035.174-.042.273l-7.386 7.296 7.65 9.495c.077.099.088.19.033.273-.055.082-.14.124-.252.124z" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </GlassCard>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" delay={0.4}>
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-gray-500 text-sm mb-6">
                Messages are sent securely via Formspree. Replies use the email you enter below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-400 text-sm mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-gray-400 text-sm mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-gray-400 text-sm mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-gray-400 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {submitError ? (
                  <p className="text-sm text-red-400" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <GlassButton type="submit" className="w-full" variant="primary">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      ✓ Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </GlassButton>
              </form>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
