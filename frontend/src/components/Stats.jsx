import React, { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate, useInView, motion } from 'framer-motion';

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, latest => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest + suffix;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const Stats = () => {
  const statsData = [
    { label: "Total Projects", value: 15, suffix: "+" },
    { label: "Certifications", value: 8, suffix: "+" },
    { label: "Core Technologies", value: 6, suffix: "+" },
    { label: "Client Dedication", value: 100, suffix: "%" }
  ];

  return (
    <section className="py-12 bg-darkNav/30 border-y border-gray-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 glass rounded-xl border border-white/5 text-center hover:border-neonCyan/20 transition-all duration-300 shadow-xl"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-neonCyan font-mono tracking-tight mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider font-mono">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
