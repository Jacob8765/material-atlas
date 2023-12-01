import React from "react";
import Image from "next/image";

const aboutMaterialAtlas = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(49, 72, 63)",
      }}
      className="p-8 text-white "
    >
      <h1 className="border-rose-400 m-3 inline-block border-b-4 pb-2 text-3xl font-bold">Material Atlas: Bridging disciplines, Building Resilience</h1>

      <div className="m-3 grid grid-cols-2">
        <div className="justify-center text-justify">
          <p>
            With Lyla’s rich educational background that stretches from the National University of Sin- gapore to the Southern California Institute of Architecture (SCI-arc), and an enriching
            professional journey that encompasses prominent architecture firms across the globe, Lyla epitomizes the symbiosis of innovative design and sustainability.
          </p>
          <br />
          <p>
            Lyla’s professional impact has been significant, leaving her creative imprints at AEDAS, Greg Lynn Form, Graftlab, and Holzer Kobler Architecturen. Her wealth of experience, blended with
            her innovative vision, eventually led to the establishment of Neuni, her own creative practice. Neuni serves as a testament to Lyla’s unwavering commitment to sus- tainable, innovative
            design.
          </p>
          <br />
          <p>
            Her entrepreneurial spirit led her to found China's first makerspace Neuni Lab for the design community, followed by the creation of the country's inaugural material library, complemented
            by a consulting agency focused on sustainable and innovative material solutions. Yet, these ventures were not merely business-oriented; they served as plat- forms for Lyla to explore the
            practical aspects of sustainability.
          </p>
          <br />
          <p>
            Lyla's dedication to fostering a sustainable future is not confined to her professional en- deavors; her active participation in NGOs and community services underscore her com- mitment to
            societal responsibility. Her passion for sustainability earned her a spot in Loha’s Magazine's 100 Power Ladies in Sustainability.
          </p>
          <br />
          <p>
            As an educator, Lyla has held various positions, including Associate Professor at Tongji University and Lecturer at the University of Hong Kong, among others. Her pedagogical approach
            covers a multitude of subjects, from Sustainable Design to Digital Fabrication, instilling in her students the importance of innovation and sustainability.
          </p>

          <p>
            Lyla is also a culture influencer, having spoken at several high-profile platforms such as TEDx and Yixi, and events hosted by luxury fashion titans like Prada and Kering Group. Through
            these platforms, she inspires others to reimagine the future of design through sustainable and innovative practices.
          </p>
          <br />
          <p>
            Lyla Wu's journey is an inspirational blend of research, hands-on experience, and teach- ing. As she embarks on her Doctorate, her mission remains steadfast - to reshape the world through
            the prism of innovative and sustainable design, one project at a time.
          </p>
        </div>
        <div className="m-5 flex justify-center justify-items-center">
          <Image src="/assets/living_shoreline_4.png" height={500} width={500} objectFit="cover" objectPosition="0px 0px" alt="background" />
        </div>
      </div>
    </div>
  );
};

export default aboutMaterialAtlas;
