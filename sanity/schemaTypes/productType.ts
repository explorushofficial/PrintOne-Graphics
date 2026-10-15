import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Category Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Collateral (Business essentials)', value: 'Business essentials' },
          { title: 'Books & Publishing (Books + learning)', value: 'Books + learning' },
          { title: 'Corporate Gifting (Gifting + merchandise)', value: 'Gifting + merchandise' },
          { title: 'Packaging & Production (Packaging + displays)', value: 'Packaging + displays' },
          { title: 'Annual Reports & Design (Publications + reports)', value: 'Publications + reports' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Short Intro / Tagline',
      type: 'string',
      description: 'A brief 1-line headline (e.g., "A clear introduction to what you do.")',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'detail',
      title: 'Detailed Description',
      type: 'text',
      rows: 4,
      description: 'Comprehensive specifications, dimensions, use cases, and finishing options.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Theme Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Orange (Signature)', value: 'orange' },
          { title: 'Blue', value: 'blue' },
          { title: 'Pink', value: 'pink' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Cyan', value: 'cyan' },
          { title: 'Black / Dark', value: 'black' },
        ],
      },
      initialValue: 'orange',
    }),
    defineField({
      name: 'image',
      title: 'Product Photo / Artwork',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageUrl',
      title: 'External / Static Image Path (Fallback)',
      type: 'string',
      description: 'Optional URL or relative path (e.g., /catalog/brochures.jpg) if not uploading an image file directly.',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Descriptive text for accessibility and SEO',
    }),
    defineField({
      name: 'order',
      title: 'Display Order Priority',
      type: 'number',
      description: 'Lower numbers display first (e.g. 1, 2, 3...)',
      initialValue: 10,
    }),
    defineField({
      name: 'capabilities',
      title: 'Production Capabilities',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'List of production capabilities for this item (e.g., Paper Stocks: ..., Specialty Finishes: ..., Custom Sizes: ...)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'image',
    },
  },
});
