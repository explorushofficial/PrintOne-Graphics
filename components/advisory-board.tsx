import { User, Sparkles } from 'lucide-react';

interface AdvisoryMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

const ADVISORY_MEMBERS: AdvisoryMember[] = [
  {
    id: 'jogendra-vichare',
    name: 'JOGENDRA VICHARE',
    role: 'Advisory Board Member',
    image: '/advisory/jogendra-vichare.png',
    bio: `With an extensive experience of over 35 years in the printing industry, Mr. Jogendra Vichare brings exceptional expertise, technical knowledge, and industry insight to PrintOne Graphics. His deep understanding of printing, production management, and quality standards ensures excellence in every project. His commitment to quality, timely delivery, and customer satisfaction continues to drive the company’s growth and strengthen its reputation as a trusted printing partner.`,
  },
  {
    id: 'shashank-khandare',
    name: 'SHASHANK KHANDARE',
    role: 'Advisory Board Member',
    image: '/advisory/shashank-khandare.png',
    bio: `Shashank Khandare brings over 18 years of experience in the printing and packaging industry, backed by a Diploma in Printing and an Engineering qualification in Packaging. With strong expertise in sales and marketing, strategic planning, business development, and cost estimation, he plays a key role in driving business growth and building lasting client relationships. His in-depth industry knowledge, commercial acumen, and customer-focused approach enable him to develop effective strategies, deliver competitive solutions, and ensure excellence in quality and service.`,
  },
  {
    id: 'nitesh-patil',
    name: 'NITESH PATIL',
    role: 'Advisory Board Member',
    image: '/advisory/nitesh-patil.png',
    bio: `Nitesh Patil has 5 years of experience in the printing and packaging industry, with sound technical knowledge of printing machinery and packaging processes. He possesses a good understanding of machine operations, production requirements, and technical aspects of printing, contributing to efficient workflow, quality output, and smooth production operations at PrintOne Graphics.`,
  },
];

export function AdvisoryBoard() {
  return (
    <section className="relative overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2] py-14 sm:py-16 lg:py-20">
      {/* Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(#10383A 1px, transparent 1px), radial-gradient(#10383A 1px, #faf8f2 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
        aria-hidden="true"
      />

      <div className="page-wrap relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ded7cc] bg-[#f2ede4] px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[.18em] text-[#666E51]">
            <Sparkles size={11} className="text-[#DAA112]" />
            <span>LEADERSHIP &amp; STRATEGIC GUIDANCE</span>
          </div>

          <h2 className="mt-3 font-display text-[clamp(1.75rem,2.8vw,2.6rem)] font-extrabold tracking-[-.04em] text-[#10383A]">
            OUR ADVISORY BOARD
          </h2>

          <div className="mx-auto mt-2.5 h-0.5 w-10 bg-[#DAA112]" />

          <p className="mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-[#55524c]">
            Guided by seasoned industry pioneers whose strategic foresight, deep operational acumen, and commitment to excellence steer PrintOne Graphics to new benchmarks.
          </p>
        </div>

        {/* 3-Member Cards Grid - Slightly Wider Container */}
        <div className="mx-auto mt-10 sm:mt-12 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {ADVISORY_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col rounded-2xl border border-[#1b4b4e] bg-[#10383A] p-4 sm:p-5 pb-5 sm:pb-6 shadow-xl transition-all duration-300 hover:border-[#DAA112] hover:shadow-[0_20px_45px_rgba(16,56,58,0.4)] hover:-translate-y-1"
            >
              {/* Image Container / Placeholder - Wider & Slightly Taller */}
              <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-xl border border-[#1d5255] bg-[#ffffff]/60">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Compact Architectural Placeholder */
                  <div className="relative flex h-full w-full flex-col items-center justify-center p-4 text-center">
                    {/* Subtle grid background inside container */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          'linear-gradient(#DAA112 1px, transparent 1px), linear-gradient(to right, #DAA112 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Avatar Icon Silhouette */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#23585b] bg-[#10383A] text-[#DAA112] shadow-inner transition-transform duration-300 group-hover:scale-108 group-hover:border-[#DAA112]">
                      <User size={28} strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10 mt-3">
                      <span className="inline-block rounded-full border border-[#23585b] bg-[#10383A]/90 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#d0dedd] shadow-sm">
                        Photo Placeholder
                      </span>
                    </div>

                    <p className="relative z-10 mt-1.5 text-[10px] text-[#8fa8a7]">
                      Provide image to display
                    </p>
                  </div>
                )}
              </div>

              {/* Member Details */}
              <div className="mt-4 sm:mt-5 flex flex-1 flex-col">
                <div className="text-center">
                  <span className="text-[10.5px] font-bold uppercase tracking-[.18em] text-[#DAA112]">
                    {member.role}
                  </span>

                  <h3 className="mt-1 font-display text-[15.5px] sm:text-[17px] font-bold tracking-tight text-white group-hover:text-[#f7e4a8] transition-colors">
                    {member.name}
                  </h3>

                  <div className="mx-auto my-2.5 h-[1.5px] w-8 bg-[#DAA112]/40 transition-all duration-300 group-hover:w-12 group-hover:bg-[#DAA112]" />
                </div>

                {member.bio && (
                  <p className="mt-2.5 text-[12px] sm:text-[12.5px] leading-[1.65] text-[#b8cecc] text-center font-normal">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
