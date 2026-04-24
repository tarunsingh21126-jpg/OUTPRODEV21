
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';
import Skeleton from '../components/Skeleton';
import { ArrowRight, Globe, Smartphone, Palette, TrendingUp } from "lucide-react";
import Button from "@mui/material/Button";

// Icon mapping
const iconMap = {
  'globe': Globe,
  'smartphone': Smartphone,
  'palette': Palette,
  'trending-up': TrendingUp,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || Globe;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchServices = async () => {
      try {
        const [allRes, featuredRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/services`),
          axios.get(`${process.env.REACT_APP_API_URL}/services?featured=true`)
        ]);
        console.log('Services response:', allRes.data);
        setServices(allRes.data.services || []);
        setFeaturedServices(featuredRes.data.services || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        setServices([]);
        setFeaturedServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <Skeleton type="services" />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.02] max-w-5xl text-balance">
            Six practices. <span className="text-foreground/40">One operating system.</span>
          </h1>
          <p className="mt-10 text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Engage one capability or operate as your fractional product team. Every practice
            shares one design system, one delivery cadence, and one quality bar.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="border border-white/10">
            {services.map((s, i) => (
              <div key={s.title} className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10 last:border-b-0 group hover:bg-white/[0.02] transition-colors">
                <div className="lg:col-span-1 p-8 lg:py-10 border-b lg:border-b-0 lg:border-r border-white/10 flex items-start lg:items-center">
                  <span className="font-mono text-sm text-muted-foreground tracking-widest">0{i + 1}</span>
                </div>
                <div className="lg:col-span-4 p-8 lg:py-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between gap-6">
                  <div>
                    <div className="size-12 border border-white/10 grid place-items-center mb-6 group-hover:border-primary group-hover:text-primary transition-colors">
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{s.title}</h3>
                  </div>
                </div>
                <div className="lg:col-span-4 p-8 lg:py-10 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="label-mono mb-4">Description</div>
                  <p className="text-base text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
                <div className="lg:col-span-3 p-8 lg:py-10">
                  <div className="label-mono mb-4">Deliverables</div>
                  <ul className="space-y-2">
                    {/* {s.deliverables.map((d) => (
                    
                    <li key={d} className="flex items-center gap-3 text-sm">
                      <span className="size-1 bg-primary" /> {d}
                    </li>
                      ))} */}
                    {s.features?.map((f) => (
                      <li key={f.title} className="flex items-center gap-3 text-sm">
                        <span className="size-1 bg-primary" /> {f.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A streamlined approach to delivering exceptional results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery', desc: 'We understand your vision, goals, and target audience.' },
              { number: '02', title: 'Strategy', desc: 'We develop a comprehensive plan tailored to your needs.' },
              { number: '03', title: 'Execution', desc: 'Our expert team builds and deploys your solution.' },
              { number: '04', title: 'Support', desc: 'Ongoing optimization and support for success.' }
            ].map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="border border-white/10 rounded-lg p-8 hover:bg-white/[0.05] transition-colors">
                  <div className="text-4xl font-bold text-primary/30 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              We leverage the latest and most reliable technologies to build scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Frontend', tech: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
              { name: 'Backend', tech: ['Node.js', 'Express', 'Python', 'Django'] },
              { name: 'Databases', tech: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'] },
              { name: 'Tools', tech: ['Git', 'Docker', 'AWS', 'Vercel'] }
            ].map((stack) => (
              <motion.div
                key={stack.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-lg p-6 hover:bg-white/[0.05] transition-colors"
              >
                <h3 className="text-lg font-semibold mb-4">{stack.name}</h3>
                <ul className="space-y-2">
                  {stack.tech.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="size-1 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              What sets us apart in the competitive tech landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Team', desc: 'Highly skilled professionals with 10+ years of experience across multiple domains.' },
              { title: 'Quality Focused', desc: 'We maintain high code quality standards and comprehensive testing protocols.' },
              { title: 'Timely Delivery', desc: 'Committed to delivering projects on schedule without compromising on quality.' },
              { title: 'Scalable Solutions', desc: 'Building systems that grow with your business needs.' },
              { title: '24/7 Support', desc: 'Ongoing support and maintenance to ensure your systems run smoothly.' },
              { title: 'Cost Effective', desc: 'Transparent pricing with no hidden costs, maximum value for your investment.' }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-lg p-8 hover:border-primary/50 hover:bg-white/[0.05] transition-all"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Flexible Pricing Models
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the engagement model that works best for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Project Based',
                desc: 'Fixed scope, timeline, and cost. Perfect for well-defined projects.',
                features: ['Fixed Cost', 'Defined Timeline', 'Clear Deliverables', 'Quality Assurance']
              },
              {
                title: 'Time & Materials',
                desc: 'Flexible engagement for evolving projects with changing requirements.',
                features: ['Hourly Billing', 'Flexible Scope', 'Scalable Team', 'Regular Updates'],
                highlighted: true
              },
              {
                title: 'Dedicated Team',
                desc: 'Full-time team members working exclusively on your project.',
                features: ['Full-time Availability', 'Team Flexibility', 'Long-term Engagement', 'Seamless Integration']
              }
            ].map((plan) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative rounded-lg border p-8 transition-all ${plan.highlighted
                  ? 'border-primary bg-primary/10 scale-105'
                  : 'border-white/10 hover:bg-white/[0.05]'
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-semibold">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-muted-foreground mb-6">{plan.desc}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <span className="size-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 md:py-32 bg-[#0b1220] text-white">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Have something specific in mind?
        </h1>

        <p className="text-gray-400 max-w-2xl mb-10">
          Send us a brief. We'll respond within 48 hours with a scoping conversation, no decks attached.
        </p>

        <Button
          asChild
          className="bg-cyan-400 text-black px-8 py-6 text-sm tracking-widest 
            hover:bg-cyan-300 transition-all duration-300
            shadow-[0_0_30px_rgba(34,211,238,0.6)] 
            hover:shadow-[0_0_60px_rgba(34,211,238,0.9)]
            dark:bg-cyan-400 dark:text-black"
        >
          <Link to="/contact" className="flex items-center gap-3">
            START A CONVERSATION
            <ArrowRight className="size-5" />
          </Link>
        </Button>

      </div>
    </>
  )
};
export default Services;

