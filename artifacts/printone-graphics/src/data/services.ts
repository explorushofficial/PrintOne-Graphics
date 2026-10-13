export type Service = {
  id: string;
  title: string;
  intro: string;
  detail: string;
  tag: string;
  color: string;
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    id: 'annual-reports',
    title: 'Annual reports',
    intro: 'A year of work, made clear and compelling.',
    detail: 'Content writing, thematic cover concepts, typesetting, financial and non-financial layouts, statutory and non-statutory sections, print, binding and PDF flipbooks.',
    tag: 'Design + print',
    color: 'orange',
    image: '/annual-report.jpg',
    imageAlt: 'Printed annual reports with an open report beside bound copies',
  },
  {
    id: 'commercial-print',
    title: 'Commercial print',
    intro: 'Everyday communication, beautifully produced.',
    detail: 'Brochures, catalogues, company profiles, magazines, flyers, corporate stationery and marketing collateral.',
    tag: 'Business essentials',
    color: 'blue',
    image: '/commercial-print.jpg',
    imageAlt: 'Printed brochures, a folded leaflet and a product catalogue',
  },
  {
    id: 'education-publication',
    title: 'Education & publishing',
    intro: 'Ideas and learning, ready to be shared.',
    detail: 'Textbooks, journals, learning resources, institutional magazines, answer sheets, books and publications.',
    tag: 'Books + learning',
    color: 'pink',
    image: '/education-publications.jpg',
    imageAlt: 'Educational books, a journal and open learning materials',
  },
  {
    id: 'corporate-gifting',
    title: 'Corporate gifting',
    intro: 'Useful objects with your identity on them.',
    detail: 'Custom calendars, diaries, notebooks, pens, mugs, gift sets, card holders and branded merchandise.',
    tag: 'Gifting + merchandise',
    color: 'yellow',
    image: '/corporate-gifting.jpg',
    imageAlt: 'A diary, notebook, pen, mug and gift box for corporate gifting',
  },
  {
    id: 'packaging-finishing',
    title: 'Packaging & finishing',
    intro: 'The final details that make a piece feel complete.',
    detail: 'Packaging, binding and finishing services for print projects, publications and brand materials.',
    tag: 'Production',
    color: 'black',
  },
  {
    id: 'creative-design',
    title: 'Creative design',
    intro: 'A thoughtful visual system from the first page.',
    detail: 'Creative design for print and publishing, including thematic direction, layout and production-ready artwork.',
    tag: 'Ideas to artwork',
    color: 'cyan',
  },
];
