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
    image: '', // Placeholder for image
    bio: 'Strategic advisor guiding PrintOne’s visionary growth, client relationships, and industry-wide print innovation.',
  },
  {
    id: 'shashank-khandare',
    name: 'SHASHANK KHANDARE',
    role: 'Advisory Board Member',
    image: '', // Placeholder for image
    bio: 'Providing expertise in corporate stewardship, creative leadership, and high-impact brand solutions.',
  },
  {
    id: 'nitesh-patil',
    name: 'NITESH PATIL',
    role: 'Advisory Board Member',
    image: '', // Placeholder for image
    bio: 'Championing operational excellence, advanced print manufacturing standards, and pan-India execution.',
  },
];

export function AdvisoryBoard() {
  return (
    <section className="relative overflow-hidden border-b border-[#e5ded4] bg-[#faf8f2] py-12 sm:py-14 lg:py-16">
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

        {/* 3-Member Cards Grid - Wider Container */}
        <div className="mx-auto mt-10 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {ADVISORY_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col rounded-xl border border-[#1b4b4e] bg-[#10383A] p-3 sm:p-3.5 pb-4 sm:pb-5 shadow-lg transition-all duration-300 hover:border-[#DAA112] hover:shadow-[0_16px_36px_rgba(16,56,58,0.35)] hover:-translate-y-0.5"
            >
              {/* Image Container / Placeholder - Wider Footprint */}
              <div className="relative aspect-[4/3.5] w-full overflow-hidden rounded-lg border border-[#1d5255] bg-[#ffffff]/60">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              <div className="mt-4 flex flex-1 flex-col text-center">
                <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#DAA112]">
                  {member.role}
                </span>

                <h3 className="mt-1 font-display text-[15px] sm:text-base font-bold tracking-tight text-white group-hover:text-[#f7e4a8] transition-colors">
                  {member.name}
                </h3>

                <div className="mx-auto my-2 h-[1px] w-6 bg-[#DAA112]/40 transition-all duration-300 group-hover:w-10 group-hover:bg-[#DAA112]" />

                {member.bio && (
                  <p className="mt-0.5 text-[11.5px] sm:text-xs leading-relaxed text-[#c2d5d4]">
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
