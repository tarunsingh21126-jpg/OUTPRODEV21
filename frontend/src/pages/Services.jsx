
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';
import Skeleton from '../components/Skeleton';
import { ArrowRight } from "lucide-react";
import Button from "@mui/material/Button";


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
          setServices(allRes.data.services);
          setFeaturedServices(featuredRes.data.services);
        } catch (err) {
          setError('Failed to load services');
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
                    <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="lg:col-span-3 p-8 lg:py-10">
                    <div className="label-mono mb-4">Deliverables</div>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 text-sm">
                          <span className="size-1 bg-primary" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <div className="flex flex-col items-center justify-center text-center py-20 bg-[#0b1220] text-white">

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

