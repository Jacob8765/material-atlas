import React from 'react'
import Image from "next/image";

const AboutSection = () => {
  return (
    <>
         <div
          className="p-8 grid grid-cols-2"
          style={{
            backgroundColor: 'rgb(149, 159, 152)'
          }}>
          <div className="m-3 text-white">
            <h2 className="m-3 text-3xl font-bold border-b-4 border-rose-400 pb-2 inline-block">About Material Atlas</h2>

            <p className="m-3 text-lg text-justify">Lyla Wu's journey in material and design is as diverse as it is impassioned. From Switzerland to HongKong and Beijing, she has left her mark as an architect and exhibition designer. Breaking new ground, she established the first makerspace in China specifically for the design community. In 2016, she took another pioneering step, founding the country's first material library, coupled with a consulting agency dedicated to helping industries find sustainable and innovative material solutions.</p>
            <p className="m-3 text-lg mt-0 text-justify">
              However, her entrepreneurial ventures were more than business pursuits; they served as a platform for her to explore the pragmatic aspects of sustainability. Lyla's devotion to creating a sustainable future extends beyond the professional sphere. Her involvement in numerous NGOs and community services highlights her commitment to social responsibility. This dedication did not go unnoticed, as Loha's Magazine recognized her as one of the 100 Power Ladies in Sustainability.</p>
          </div>
          <div className="relative w-full pt-[56.25%] m-8 mt-16"> {/* This sets the 16:9 ratio */}
            <Image
              className="absolute top-0 left-0 w-full h-full p-2 pr-8"
              src={'/assets/lyla8638_data_visualization_with_the_following_data_one_part_ce_faedc670-d1b6-4af4-8a0d-7b80b6ce1f6a.png'}
              layout="fill"
              objectFit="fill"
              alt='about'
            />
          </div>
        </div>
    </>
  )
}

export default AboutSection