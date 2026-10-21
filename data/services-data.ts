export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagFilter: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  accent: string;
  features: string[];
  scopeOfWork: string[];
  machinery: string[];
  materials: string[];
  turnaround: string;
  useCases: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'annual-report-solutions',
    number: '01',
    title: 'Annual Report Design & Printing',
    category: 'Corporate Stakeholder Reporting',
    tagFilter: 'Corporate Reporting',
    shortDescription:
      'End-to-end corporate report fabrication from concept narrative and financial typesetting to deluxe tactile covers and digital interactive flipbooks.',
    fullDescription:
      'We provide complete annual report management for public and private enterprises, academic bodies, and non-profits. Our multidisciplinary team handles statutory and non-statutory sections, regulatory financial formatting, high-fidelity infographic charts, bespoke cover aesthetics, and precise PUR binding that lays completely flat for board members and shareholders.',
    image: '/annual-report.jpg',
    accent: '#e97819',
    features: [
      'Content writing & editorial polishing',
      'Thematic cover design with foil & embossing',
      'Financial typesetting & regulatory layout',
      'High-speed printing & lay-flat PUR binding',
      'Digital interactive PDF flipbooks for web',
    ],
    scopeOfWork: [
      'Concept development and thematic narrative framing',
      'Editorial copywriting, proofreading and index curation',
      'Financial tables, audit balance sheets and statutory formatting',
      'Custom infographic and data visualization design',
      'Physical wet proofing and sample dummy approval',
      'High-speed offset / digital print with zero-defect binding',
      'Digital flipbook conversion with search and interactive links',
    ],
    machinery: [
      'Konica Minolta AccurioPress C7100 / C4080 Digital Presses',
      'Heidelberg 4-Color Speedmaster Offset Press',
      'Automated PUR & Smyth Sewing Bookbinding Lines',
    ],
    materials: [
      'FSC-Certified Archival & Recycled Uncoated Text Papers (90 - 150 GSM)',
      'Fine Art Textured European Cover Boards (250 - 350 GSM)',
      'Gold, Rose Gold & Metallic Hot Stamping Foils',
      'Soft-Touch Matte & Anti-Scuff Thermal Laminations',
    ],
    turnaround: '48-hour physical dummy proofing; 3–5 working days for full production run post-approval.',
    useCases: [
      'Corporate Annual Reports (BSE / NSE listed)',
      'Sustainability & ESG Disclosures',
      'Integrated Stakeholder Reviews',
      'Institutional & University Annual Reviews',
    ],
  },
  {
    id: 'esg-sustainability-reporting',
    number: '01B',
    title: 'ESG & Sustainability Reporting',
    category: 'Corporate Stakeholder Reporting',
    tagFilter: 'Corporate Reporting',
    shortDescription:
      'GRI & BRSR-compliant sustainability reports, climate impact disclosures, data-dense infographics, and certified eco-friendly recycled paper fabrication.',
    fullDescription:
      'We partner with BSE/NSE listed corporations and institutions to craft world-class ESG, BRSR, and corporate sustainability disclosures. Our team ensures rigorous compliance formatting, bespoke infographic data visualization, and carbon-neutral printing on FSC-certified and recycled stocks.',
    image: '/annual-report.jpg',
    accent: '#2c9fc3',
    features: [
      'GRI, BRSR & SDG-aligned thematic formatting',
      'Data-dense carbon & emissions infographics',
      'FSC-certified 100% recycled paper stocks',
      'Zero-emission vegetable inks & eco PUR binding',
      'Interactive digital PDF flipbooks for investors',
    ],
    scopeOfWork: [
      'Narrative structuring for environmental and social metrics',
      'High-fidelity data visualization and sustainability charts',
      'BRSR and statutory compliance table typesetting',
      'Eco-certified substrate selection and carbon accounting',
      'Fast-turnaround proofing and stakeholder batch delivery',
    ],
    machinery: [
      'Konica Minolta AccurioPress C7100 Digital Production Engine',
      'Heidelberg 4-Color Speedmaster Offset Press',
      'Automated PUR Lay-Flat Bookbinding Line',
    ],
    materials: [
      '100% Post-Consumer Recycled & FSC Uncoated Papers (90 - 140 GSM)',
      'Chlorine-Free Textured European Cover Stock (250 - 320 GSM)',
      'Water-Based Eco Barrier Coatings',
    ],
    turnaround: '48-hour dummy proofs; 3–5 working days for full production run.',
    useCases: [
      'Corporate ESG & Sustainability Reports',
      'Business Responsibility and Sustainability Reporting (BRSR)',
      'Integrated Climate & Carbon Disclosures',
      'Social Impact & CSR Annual Overviews',
    ],
  },
  {
    id: 'commercial-digital-printing',
    number: '02',
    title: 'Commercial & Digital Printing',
    category: 'Marketing Collaterals & Brand Essentials',
    tagFilter: 'Commercial Print',
    shortDescription:
      'High-precision marketing collateral, brochures, catalogues, flyers, and stationery tailored with vibrant color fidelity and rapid delivery.',
    fullDescription:
      'PrintOne Graphics delivers high-end commercial print solutions for corporate enterprises, luxury retailers, and creative agencies. From high-volume offset runs to short-turnaround on-demand digital prints, we ensure exact brand color matching, crisp micro-typography, and premium post-press finishing.',
    image: '/commercial-print.jpg',
    accent: '#2c9fc3',
    features: [
      'Multi-gatefold brochures & product catalogues',
      'Executive company profiles with luxury finishes',
      'Coordinated corporate stationery suites',
      'Marketing flyers & event announcements',
      'Spot UV, soft-touch laminations & foil stamping',
    ],
    scopeOfWork: [
      'Pre-flight file verification and color separation',
      'Precision CMYK & Pantone spot color reproduction',
      'Multi-panel gatefolds, accordion folds, and custom die-cuts',
      'Stationery suite coordination (letterheads, envelopes, cards)',
      'Short-run on-demand printing with same-day proofing',
      'Bulk packaging, shrinkage wrapping, and pan-India dispatch',
    ],
    machinery: [
      'Konica Minolta AccurioPress C7100 Digital Production Engine',
      'Heidelberg SM-74 Multi-Color Offset Press',
      'Horizon Automatic Folders & Creasers',
    ],
    materials: [
      'Art Paper & Art Card (130 - 350 GSM, Gloss & Matte)',
      'Textured Linen, Laid, and Cotton Stationery Papers',
      'Synthetic Tear-Resistant & Waterproof Substrates',
      'Kraft and Specialty Recycled Stocks',
    ],
    turnaround: 'Same-day to 24 hours for short digital runs; 2–4 working days for commercial offset runs.',
    useCases: [
      'Product Launch Catalogues & Lookbooks',
      'Corporate Profile & Capabilities Booklets',
      'Exhibition & Trade Fair Collaterals',
      'Brand Stationery Suites & Presentation Folders',
    ],
  },
  {
    id: 'educational-publication-printing',
    number: '03',
    title: 'Educational & Publication Printing',
    category: 'Textbooks, Journals & Institutional Media',
    tagFilter: 'Books & Publishing',
    shortDescription:
      'Heavy-duty textbooks, peer-reviewed journals, institutional magazines, study materials, and secure examination stationery.',
    fullDescription:
      'We partner with leading universities, schools, coaching institutes, and educational publishers across India. Our automated print and bindery facility effortlessly handles bulk volume academic production with high opacity papers, durable binding, and stringent quality control.',
    image: '/education-publications.jpg',
    accent: '#cf2879',
    features: [
      'Textbooks with durable Smyth & PUR binding',
      'Academic, scientific & peer-reviewed journals',
      'Institutional & university campus magazines',
      'High-security answer sheets & exam stationery',
      'FSC certified archival and high-opacity paper stocks',
    ],
    scopeOfWork: [
      'Volume typesetting, mathematical formula layout and indexing',
      'High-speed multi-unit monochrome and full-color text printing',
      'Smyth sewn section binding for 180° flat opening',
      'Serial numbering, barcode insertion, and secure exam sheet packing',
      'Sturdy cover lamination with gloss, matte, or thermal seals',
      'Batch-wise logistics and scheduled institutional dispatches',
    ],
    machinery: [
      'High-Speed Web & Sheet-Fed Offset Presses',
      'Heavy-Duty Automated Smyth Sewing Machines',
      'Three-Knife Automated Trimming & Guillotine Systems',
    ],
    materials: [
      'High-Bulk Maplitho & Book Printing Papers (58 - 80 GSM)',
      'Natural Shade Archival Book Wove Papers',
      'High-Gloss Cover Boards (250 - 300 GSM) with UV Varnishing',
    ],
    turnaround: 'Scalable schedules for 500 to 50,000+ copies with staggered batch deliveries.',
    useCases: [
      'School & University Course Books',
      'Academic Research Journals & Symposia',
      'Campus Magazines & Alumni Publications',
      'Examination Answer Booklets & OMR Sheets',
    ],
  },
  {
    id: 'corporate-gifting-promotional',
    number: '04',
    title: 'Corporate Gifting & Merchandise',
    category: 'Branded Keepsakes & Merchandise',
    tagFilter: 'Corporate Gifting',
    shortDescription:
      'Bespoke executive diaries, customized desk and wall calendars, branded writing instruments, and curated welcome hampers.',
    fullDescription:
      'Strengthen your client relationships and recognize employee achievements with premium corporate gifting solutions. We design, customize, and package functional executive gifts featuring blind debossing, metallic foil branding, screen printing, and bespoke unboxing experiences.',
    image: '/corporate-gifting.jpg',
    accent: '#e7c627',
    features: [
      'Customised desk & wall calendars with bespoke art',
      'Executive diaries, planners & journal notebooks',
      'Branded pens, ceramic mugs & card holders',
      'Curated onboarding kits & festive gift sets',
      'Laser etching, debossing & screen printing options',
    ],
    scopeOfWork: [
      'Curated gift catalog selection tailored to brand budget',
      'Custom calendar date grid layout and holiday marking',
      'Thermo-PU leatherette cover debossing and hot foil stamping',
      'Laser marking on metal pens, mugs, and card holders',
      'Custom inner tissue wrapping, ribboning, and outer box packaging',
      'Individual personalized employee name embossing',
    ],
    machinery: [
      'Direct-to-Object UV Flatbed Printers',
      'High-Precision CO2 Laser Engraving & Etching Machines',
      'Hydraulic Hot-Stamping & Blind Debossing Presses',
    ],
    materials: [
      'Premium Vegan Leatherette & Thermo-PU Binding Covers',
      'Ceramic, Stainless Steel, and Natural Bamboo Keepsakes',
      'Wood-Free Cream Bond Writing Sheets (80 - 100 GSM)',
      'Custom Magnetic Closure Gift Boxes with Foam Inserts',
    ],
    turnaround: '3–7 working days depending on personalization and volume.',
    useCases: [
      'New Employee Onboarding Kits',
      'Annual Corporate & Executive Diaries',
      'Year-Round Desk & Wall Calendars',
      'Client Appreciation & Diwali Festive Hampers',
    ],
  },
  {
    id: 'packaging-boxes-manufacturing',
    number: '05',
    title: 'Packaging & Rigid Box Manufacturing',
    category: 'Structural Packaging & Unboxing',
    tagFilter: 'Packaging & Production',
    shortDescription:
      'Custom luxury rigid boxes, folding monocartons, product sleeves, and die-cut packaging engineered for superior brand presence.',
    fullDescription:
      'Make an unforgettable first impression before your customer even opens the product. PrintOne Graphics manufactures bespoke rigid gift boxes, product display cartons, and corrugated presentation shippers with custom die-cut foam inserts, magnetic closures, and luxury laminates.',
    image: '/catalog/packaging-boxes.jpg',
    accent: '#27292a',
    features: [
      'Luxury rigid boxes with magnetic lid closures',
      'Custom folding monocartons & product cartons',
      'Precision die-cut foam & paperboard internal inserts',
      'Embossed logos, metallic foils & spot UV gloss',
      'Eco-friendly sustainable kraft packaging options',
    ],
    scopeOfWork: [
      'Structural dieline design and 3D physical mockups',
      'CAD sampling and fitment testing with client products',
      'Multi-color offset printing on SBS / kappa board wraps',
      'Precision die-cutting, window patching, and scoring',
      'Hand-crafted wrapping, magnetic clasp assembly, and QC inspection',
    ],
    machinery: [
      'Automatic Rigid Box Corner Taping & Wrapping Lines',
      'Heavy-Duty Die-Cutting & Creasing Platens',
      'Precision Computerized Paperboard Cutters',
    ],
    materials: [
      'Imported Kappa & Grey Paperboard (1.5mm - 3.0mm thickness)',
      'Solid Bleached Sulfate (SBS) Virgin Paperboard (280 - 400 GSM)',
      'High-Density EVA & EPE Protective Foam Inserts',
      'Virgin Kraft Paper & Corrugated Flutes',
    ],
    turnaround: '5–8 working days including structural dummy sign-off.',
    useCases: [
      'Luxury Retail & Cosmetic Packaging',
      'Corporate Gift & Hamper Presentation Boxes',
      'Tech Device & Electronic Enclosures',
      'Product Launch VIP Experience Kits',
    ],
  },
  {
    id: 'large-format-display-signage',
    number: '06',
    title: 'Large-Format Display & Signage',
    category: 'Event & Retail Visual Branding',
    tagFilter: 'Large Format',
    shortDescription:
      'High-resolution outdoor flex banners, portable exhibition roll-up standees, backdrop graphics, and retail promotional displays.',
    fullDescription:
      'Command visual attention across trade expos, retail showrooms, corporate offices, and outdoor events. We utilize wide-format eco-solvent and UV inkjet technology to deliver vibrant, weatherproof, and fade-resistant graphics with sturdy portable hardware.',
    image: '/production/wide-format-printer.jpg',
    accent: '#cf2879',
    features: [
      'Heavy-duty weatherproof flex banners & vinyls',
      'Lightweight, portable aluminum roll-up standees',
      'Exhibition booth backdrops & tension fabric displays',
      'One-way vision films & window graphics',
      'Reinforced hemming, eyelets, and mounting hardware',
    ],
    scopeOfWork: [
      'High-resolution file preparation and raster image processing',
      'Vivid eco-solvent printing with fade-resistant UV pigments',
      'Automated perimeter hemming and brass eyelet grommeting',
      'Hardware fitting and tension testing for roll-up standees',
      'Protective carry bag packaging for effortless transport',
    ],
    machinery: [
      '10-Foot Wide Eco-Solvent High-Resolution Plotters',
      'Automatic Thermal Edge Hemming & Eyeleting Machines',
      'Large Format Cold Laminating Rollers',
    ],
    materials: [
      'Frontlit & Backlit Heavy Flex (340 - 510 GSM)',
      'Non-Tear Polypropylene & Star Flex Media',
      'Anodized Aluminum Roll-Up Standee Cassettes',
      'Self-Adhesive Cast Vinyl with Gloss/Matte Over-Laminate',
    ],
    turnaround: '24–36 hours for standard standees and banners; same-day rush delivery available.',
    useCases: [
      'Exhibition Booths & Trade Show Stalls',
      'Store Openings & Retail Window Promotions',
      'Conference & Seminar Stage Backdrops',
      'Corporate Event Entrance Branding',
    ],
  },
  {
    id: 'creative-design-prepress',
    number: '07',
    title: 'Creative Design & Pre-Press Engineering',
    category: 'Concept to Print-Ready Artwork',
    tagFilter: 'Design & Artwork',
    shortDescription:
      'Editorial layout, visual identity harmonization, financial data typesetting, thematic graphic systems, and pre-flight color certification.',
    fullDescription:
      'Great printing begins with meticulous design and error-free pre-press preparation. Our in-house creative studio bridges the gap between artistic vision and industrial printing, ensuring every typography hierarchy, bleed allowance, image resolution, and ink trap is calibrated to perfection.',
    image: '/print-editorial.jpg',
    accent: '#2c9fc3',
    features: [
      'Editorial layout & visual publication systems',
      'Thematic concept development & cover artwork',
      'Corporate copywriting, editing & proofreading',
      'Color management & Fogra-standard pre-press proofs',
      'Interactive digital publications & flipbooks',
    ],
    scopeOfWork: [
      'Design briefing and mood board conceptualization',
      'Multi-page publication grid and typography hierarchy setup',
      'Pre-flight file audit (RGB to CMYK conversion, 300 DPI audit)',
      'Die-line and finishing layer vector generation (Foil, Spot UV)',
      'Interactive digital PDF flipbook creation with clickable links',
    ],
    machinery: [
      'Apple Mac Pro Creative Workstations',
      'Adobe Creative Cloud (InDesign, Illustrator, Photoshop)',
      'Color Calibrated Eizo Proofing Monitors & RIP Stations',
    ],
    materials: [
      'Digital ISO Proofing Papers',
      'FOGRA 39 / 51 Certified Proofing Media',
    ],
    turnaround: 'Iterative design drafts within 48 hours; pre-press certification within 4 hours.',
    useCases: [
      'Complete Publication & Report Redesigns',
      'Brand Identity Systems & Visual Guidelines',
      'Packaging Artwork & Dieline Engineering',
      'B2B Sales Presentations & Marketing Collaterals',
    ],
  },
  {
    id: 'specialty-finishing-bindery',
    number: '08',
    title: 'Specialty Print Finishing & Bindery',
    category: 'Post-Press Embellishments & Tactile Effects',
    tagFilter: 'Finishing & Bindery',
    shortDescription:
      'Elevate standard print into collector specimens with metallic foil stamping, raised UV emboss, velvet soft-touch laminates, and Smyth sewing.',
    fullDescription:
      'Post-press finishing is where print transforms from ink on paper into a sensory, tactile experience. At PrintOne Graphics, we own and operate specialized finishing machinery that gives your business cards, book covers, packaging, and certificates unforgettable texture and prestige.',
    image: '/production/finishing-bindery.jpg',
    accent: '#e97819',
    features: [
      'Hot metallic foil stamping (Gold, Silver, Copper, Holographic)',
      'Raised 3D Spot UV & textured tactile coatings',
      'Blind debossing & multi-level sculptural embossing',
      'Smyth sewing, PUR lay-flat binding & case binding',
      'Custom dieline laser cutting, perforating & edge gilding',
    ],
    scopeOfWork: [
      'Copper and brass die fabrication for razor-sharp stamping',
      'Precise registration alignment for multi-pass foil and emboss',
      'Thermal lamination with scratch-resistant velvet and matte films',
      'Section folding, thread sewing, and hardcase binding mounting',
      'Edge gilding with metallic foils or custom pigment sprays',
    ],
    machinery: [
      'Heavy-Duty Platen Hot Stamping & Embossing Presses',
      'Precision Screen Spot UV Coaters & Infrared Dryers',
      'Automated Case Maker & Hardcover Mounting Lines',
    ],
    materials: [
      'Kurz Germany Metallic & Pigment Hot Stamping Foils',
      'Anti-Scuff Thermal Velvet & Matte Lamination Films',
      'European Imported Bookbinding Headbands & Ribbons',
      'High-Strength PUR Adhesives & Archival Thread',
    ],
    turnaround: 'Integrated directly into production line; 24–48 hours added for complex finishing.',
    useCases: [
      'Executive Hardcover Books & Commemorative Volumes',
      'Luxury Brand Invitations & Certificate Folders',
      'Premium Packaging Embellishments',
      'High-Impact Business Cards & Presentation Folders',
    ],
  },
];
