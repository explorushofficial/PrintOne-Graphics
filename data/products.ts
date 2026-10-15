export type Product = {
  id: string;
  title: string;
  intro: string;
  detail: string;
  tag: string;
  color: string;
  image: string;
  imageAlt: string;
  capabilities?: string[];
};

// Alias for compatibility
export type Service = Product;

const item = (
  id: string,
  title: string,
  tag: string,
  intro: string,
  detail: string,
  color: string,
): Product => ({
  id,
  title,
  tag,
  intro,
  detail,
  color,
  image: `/catalog/${id}.jpg`,
  imageAlt: `Illustrative sample image of ${title.toLowerCase()}`,
});

export const products: Product[] = [
  // Business Essentials
  item('brochures', 'Brochures', 'Business essentials', 'A clear introduction to what you do.', 'Sample brochure formats for presenting services, campaigns, and key company information.', 'orange'),
  item('product-catalogues', 'Product catalogues', 'Business essentials', 'Products, organised for easy browsing.', 'Comprehensive catalogue concepts with room for product stories, specifications, and vibrant imagery.', 'blue'),
  item('company-profiles', 'Company profiles', 'Business essentials', 'Your organisation, in a considered format.', 'Executive profile layouts for sharing an organisation’s legacy, capabilities, and values.', 'pink'),
  item('marketing-flyers', 'Marketing flyers', 'Business essentials', 'A focused message, ready to circulate.', 'Single- and multi-page flyer examples for product announcements, promotions, and industry events.', 'yellow'),
  item('corporate-stationery', 'Corporate stationery', 'Business essentials', 'Everyday pieces with a consistent identity.', 'Sample letterheads, envelopes, and business cards featuring a coordinated visual identity system.', 'black'),

  // Books + Learning
  item('textbooks', 'Textbooks', 'Books + learning', 'Learning content with room to breathe.', 'Structured textbook formats for curriculum lessons, complex diagrams, and academic reference material.', 'blue'),
  item('educational-journals', 'Educational journals', 'Books + learning', 'Research and ideas, thoughtfully presented.', 'Scholarly journal formats designed for academic papers, peer reviews, and institutional knowledge.', 'pink'),
  item('learning-resources', 'Learning resources', 'Books + learning', 'Useful materials for active learning.', 'Sample workbooks, problem sets, and activity sheets engineered to support student learning journeys.', 'cyan'),
  item('institutional-magazines', 'Institutional magazines', 'Books + learning', 'A shared story, issue by issue.', 'Illustrative magazine layouts for university news, alumni updates, and institutional highlights.', 'orange'),
  item('answer-sheets', 'Answer sheets', 'Books + learning', 'Structured pages for clear responses.', 'Sample examination answer sheets with legible layouts, barcode grids, and secure page organisation.', 'yellow'),
  item('books-publications', 'Books & publications', 'Books + learning', 'A good idea, given a lasting form.', 'Sample book and publication formats across a diverse range of literary and editorial projects.', 'black'),

  // Corporate Gifting + Merchandise
  item('custom-calendars', 'Custom calendars', 'Gifting + merchandise', 'A brand presence throughout the year.', 'Illustrative desk and wall calendar concepts with bespoke art, custom grids, and date marking.', 'yellow'),
  item('diaries', 'Diaries', 'Gifting + merchandise', 'A daily companion for plans and notes.', 'Executive diary formats with thermo-PU leatherette covers, foil stamping, and page planners.', 'orange'),
  item('notebooks', 'Notebooks', 'Gifting + merchandise', 'A useful place for the next idea.', 'Bespoke notebooks with custom cover treatments, elastic band closures, and ruled interior pages.', 'blue'),
  item('branded-pens', 'Branded pens', 'Gifting + merchandise', 'A small everyday item, made personal.', 'Laser-engraved metal and rollerball pen concepts for executive teams, events, and corporate gifting.', 'pink'),
  item('custom-mugs', 'Custom mugs', 'Gifting + merchandise', 'A familiar favourite with a fresh identity.', 'Durable ceramic mugs with high-resolution direct wrap printing for memorable branded moments.', 'cyan'),
  item('gift-sets', 'Gift sets', 'Gifting + merchandise', 'A collection that feels considered.', 'Curated gift-set hampers combining notebooks, pens, mugs, and accessories in bespoke presentation boxes.', 'black'),
  item('card-holders', 'Card holders', 'Gifting + merchandise', 'Compact, practical and easy to carry.', 'Bespoke card holder concepts in fine leatherette and brushed metal for corporate and client gifting.', 'orange'),
  item('promotional-merchandise', 'Promotional merchandise', 'Gifting + merchandise', 'Useful objects for a memorable moment.', 'Versatile promotional keepsakes that can be tailored to marketing campaigns or landmark events.', 'blue'),

  // Packaging + Large Format Displays
  item('packaging-boxes', 'Packaging boxes', 'Packaging + displays', 'A first impression that starts before opening.', 'Custom rigid boxes, folding cartons, and presentation boxes with bespoke inserts and luxury finishing.', 'yellow'),
  item('flex-banners', 'Flex banners', 'Packaging + displays', 'Large-format communication with presence.', 'Heavy-duty weatherproof flex banners for retail store fronts, exhibitions, and outdoor displays.', 'pink'),
  item('roll-up-banners', 'Roll-up banners', 'Packaging + displays', 'Portable display, ready to travel.', 'High-resolution roll-up standees with lightweight aluminum cassettes for conferences and trade expos.', 'cyan'),

  // Publications & Hardbound Editions
  item('annual-report-design', 'Annual report editions', 'Publications + reports', 'A year of work, shaped into a clear story.', 'Hardbound and softcover annual report editions with thematic cover treatments and lay-flat binding.', 'blue'),
  item('thematic-cover-design', 'Thematic publication covers', 'Publications + reports', 'A strong opening for a publication.', 'Custom cover sample portfolios featuring gold foil, multi-level embossing, and spot UV accents.', 'pink'),
  item('pdf-flipbooks', 'Digital flipbook editions', 'Publications + reports', 'A publication, ready to share digitally.', 'Interactive digital flipbooks configured for seamless online reading, sharing, and mobile browsing.', 'orange'),
  item('binding', 'Bound publication specimens', 'Publications + reports', 'Pages brought together for the long run.', 'Sample binding options including Smyth sewn hardcases, PUR perfect binding, and wire-o binding.', 'black'),
  item('print-finishing', 'Finished print portfolios', 'Publications + reports', 'The final details that complete a piece.', 'Curated specimen folders demonstrating spot UV, soft-touch velvet laminates, and hot foil finishes.', 'orange'),
];

export const services = products;
