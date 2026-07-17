import React from 'react';

const Footer = ({ data }) => {
  return (
    <footer className="glass py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {data?.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonCyan transition-colors">
              <i className="fab fa-github text-2xl"></i>
            </a>
          )}
          {data?.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonCyan transition-colors">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          )}
          {data?.phone && (
            <a href={`https://wa.me/${data.phone.replace(/[^0-9]/g, "").replace(/^([0-9]{10})$/, "91$1")}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
          )}
        </div>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Karthick V. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
