import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-4" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p>Email: customersupport@hahastore.com</p>
            <p>Phone: +1414 57123 </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Our Address</h3>
            <p>HaHa Street , Laughter City, Harder State</p>
          </div>
          <div>
            <iframe title='footer-map'
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30709.93693013486!2d91.86396819092232!3d77.62605813017859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1725017697471!5m2!1sid!2sid"
              width="250"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>&copy; 2024 Haha Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
