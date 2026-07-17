import React from 'react';
import { motion } from 'framer-motion';

const SocialLink = ({ href, icon, hoverColor = '#10B981', children, ...rest }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 inline-block"
    whileHover={{ y: -6, scale: 1.25, color: hoverColor }}
    whileTap={{ scale: 0.85 }}
    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
    {...rest}
  >
    {children}
  </motion.a>
);

const Footer = ({ data }) => {
  return (
    <footer className="glass py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-8 mb-6">
          {data?.github && (
            <SocialLink href={data.github} hoverColor="#ffffff">
              <i className="fab fa-github text-2xl"></i>
            </SocialLink>
          )}
          {data?.linkedin && (
            <SocialLink href={data.linkedin} hoverColor="#0077b5">
              <i className="fab fa-linkedin text-2xl"></i>
            </SocialLink>
          )}
          {data?.phone && (
            <SocialLink
              href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '').replace(/^([0-9]{10})$/, '91$1')}`}
              hoverColor="#25D366"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
            </SocialLink>
          )}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#A1A1AA] text-sm"
        >
          &copy; {new Date().getFullYear()} Karthick V. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
