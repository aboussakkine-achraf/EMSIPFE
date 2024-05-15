import React, { useState } from 'react';
import mohamedImage from '../../assets/mohamed.png';
import abderrafieImage from '../../assets/abderrafie.png';
import achrafImage from '../../assets/achraf.png';
import badrImage from '../../assets/badr.png';
import ahmedImage from '../../assets/ahmed.png';

const developers = [
  {
    name: 'Mohamed Amine Essaoud',
    image: mohamedImage,
    description: 'FUTUR INGENIEUR EN INFORMATIQUE ET RESEAU',
  },
  {
    name: 'Abderrafie El Fakir',
    image: abderrafieImage,
    description: 'FUTUR INGENIEUR EN INFORMATIQUE ET RESEAU',
  },
  {
    name: 'Achraf Aboussakinf',
    image: achrafImage,
    description: 'FUTUR INGENIEUR EN INFORMATIQUE ET RESEAU',
  },
  {
    name: 'Badr Tebaa',
    image: badrImage,
    description: 'FUTUR INGENIEUR EN INFORMATIQUE ET RESEAU',
  },
  {
    name: 'Ahmed Yazali',
    image: ahmedImage,
    description: 'FUTUR INGENIEUR EN INFORMATIQUE ET RESEAU',
  },
];

const AboutUs = () => {
  const [hovered, setHovered] = useState(-1); // -1 signifie aucun développeur survolé

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#0d3b66]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-[#faf0ca] p-6 rounded-lg shadow-md text-center"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(-1)}
          >
            <img
              src={dev.image}
              alt={dev.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold">{dev.name}</h3>
            {hovered === index && (
              <p className="text-gray-600 mt-2">{dev.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
