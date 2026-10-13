export type Service = {
  id: string;
  title: string;
  intro: string;
  detail: string;
  tag: string;
  color: string;
  image: string;
  imageAlt: string;
};

const item = (
  id: string,
  title: string,
  tag: string,
  intro: string,
  detail: string,
  color: string,
): Service => ({
  id,
  title,
  tag,
  intro,
  detail,
  color,
  image: `/catalog/${id}.jpg`,
  imageAlt: `Illustrative sample image of ${title.toLowerCase()}`,
});

export const services: Service[] = [
  item('brochures', 'Brochures', 'Business essentials', 'A clear introduction to what you do.', 'Sample brochure formats for presenting services, campaigns and key information.', 'orange'),
  item('product-catalogues', 'Product catalogues', 'Business essentials', 'Products, organised for easy browsing.', 'A sample catalogue concept with room for product stories, specifications and imagery.', 'blue'),
  item('company-profiles', 'Company profiles', 'Business essentials', 'Your organisation, in a considered format.', 'Sample profile layouts for sharing an organisation’s story, capabilities and values.', 'pink'),
  item('marketing-flyers', 'Marketing flyers', 'Business essentials', 'A focused message, ready to circulate.', 'Single- and multi-page flyer examples for announcements, promotions and events.', 'yellow'),
  item('corporate-stationery', 'Corporate stationery', 'Business essentials', 'Everyday pieces with a consistent identity.', 'Sample letterheads, envelopes and business cards with a coordinated visual system.', 'black'),

  item('textbooks', 'Textbooks', 'Books + learning', 'Learning content with room to breathe.', 'Sample textbook formats for structured lessons, diagrams and reference material.', 'blue'),
  item('educational-journals', 'Educational journals', 'Books + learning', 'Research and ideas, thoughtfully presented.', 'An illustrative journal format for articles, research and institutional knowledge.', 'pink'),
  item('learning-resources', 'Learning resources', 'Books + learning', 'Useful materials for active learning.', 'Sample workbooks and activity sheets designed to support learning journeys.', 'cyan'),
  item('institutional-magazines', 'Institutional magazines', 'Books + learning', 'A shared story, issue by issue.', 'Illustrative magazine layouts for campus news, community and institutional features.', 'orange'),
  item('answer-sheets', 'Answer sheets', 'Books + learning', 'Structured pages for clear responses.', 'Sample answer-sheet formats with legible layouts and practical page organisation.', 'yellow'),
  item('books-publications', 'Books & publications', 'Books + learning', 'A good idea, given a lasting form.', 'Sample book and publication formats across a range of editorial projects.', 'black'),

  item('custom-calendars', 'Custom calendars', 'Gifting + merchandise', 'A brand presence throughout the year.', 'Illustrative desk and wall calendar concepts with customisable content.', 'yellow'),
  item('diaries', 'Diaries', 'Gifting + merchandise', 'A daily companion for plans and notes.', 'Sample diary formats with options for cover design and page planning.', 'orange'),
  item('notebooks', 'Notebooks', 'Gifting + merchandise', 'A useful place for the next idea.', 'Illustrative notebooks with custom cover treatments and interior pages.', 'blue'),
  item('branded-pens', 'Branded pens', 'Gifting + merchandise', 'A small everyday item, made personal.', 'Sample branded pen concepts for events, teams and thoughtful gifting.', 'pink'),
  item('custom-mugs', 'Custom mugs', 'Gifting + merchandise', 'A familiar favourite with a fresh identity.', 'Illustrative mug artwork and print concepts for branded gifts.', 'cyan'),
  item('gift-sets', 'Gift sets', 'Gifting + merchandise', 'A collection that feels considered.', 'Sample gift-set combinations bringing useful branded pieces together.', 'black'),
  item('card-holders', 'Card holders', 'Gifting + merchandise', 'Compact, practical and easy to carry.', 'Illustrative card holder concepts for event and corporate gifting.', 'orange'),
  item('promotional-merchandise', 'Promotional merchandise', 'Gifting + merchandise', 'Useful objects for a memorable moment.', 'Sample merchandise ideas that can be adapted to a campaign or occasion.', 'blue'),

  item('flex-banners', 'Flex banners', 'Production', 'Large-format communication with presence.', 'Illustrative flex banner formats for displays, events and outdoor communication.', 'pink'),
  item('roll-up-banners', 'Roll-up banners', 'Production', 'Portable display, ready to travel.', 'Sample roll-up banner artwork and format for exhibitions and presentations.', 'cyan'),
  item('packaging-boxes', 'Packaging boxes', 'Production', 'A first impression that starts before opening.', 'Illustrative folding carton and box concepts with space for brand details.', 'yellow'),
  item('binding', 'Binding', 'Production', 'Pages brought together for the long run.', 'Sample binding options for reports, books, journals and other print projects.', 'black'),
  item('print-finishing', 'Print finishing', 'Production', 'The final details that complete a piece.', 'Illustrative finishing options for printed materials, subject to project requirements.', 'orange'),

  item('annual-report-design', 'Annual report design', 'Ideas to artwork', 'A year of work, shaped into a clear story.', 'Sample design direction for annual report structure, visual hierarchy and page systems.', 'blue'),
  item('thematic-cover-design', 'Thematic cover design', 'Ideas to artwork', 'A strong opening for a publication.', 'Illustrative cover concepts that express a publication’s central theme.', 'pink'),
  item('content-writing', 'Content writing', 'Ideas to artwork', 'Find the words for the message.', 'Sample editorial and content support for reports, publications and print communication.', 'yellow'),
  item('typesetting-layout', 'Typesetting & layout', 'Ideas to artwork', 'Make every page easier to follow.', 'Illustrative typesetting and page layout for readable, production-ready publications.', 'cyan'),
  item('publication-design', 'Publication design', 'Ideas to artwork', 'A visual system made for the whole edition.', 'Sample publication design direction covering grids, typography and page rhythm.', 'black'),
  item('pdf-flipbooks', 'PDF flipbooks', 'Ideas to artwork', 'A publication, ready to share digitally.', 'Illustrative PDF flipbook preparation for online reading and sharing.', 'orange'),
];
