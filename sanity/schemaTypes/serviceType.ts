import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Service Index / Number',
      type: 'string',
      description: 'e.g. "01", "02", "09"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Service Title',
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
      name: 'category',
      title: 'Service Category Subtitle',
      type: 'string',
      description: 'e.g. "Corporate Stakeholder Reporting" or "High-Volume Commercial Production"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagFilter',
      title: 'Filter Tab Category',
      type: 'string',
      options: {
        list: [
          'Corporate Reporting',
          'Commercial Print',
          'Books & Publishing',
          'Corporate Gifting',
          'Packaging & Production',
          'Large Format',
          'Design & Artwork',
          'Finishing & Bindery',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Summary shown on service cards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 5,
      description: 'Detailed overview shown inside service detail modal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent Hex Color',
      type: 'string',
      description: 'Hex color code (e.g. #e97819 or #1c1d1f)',
      initialValue: '#e97819',
    }),
    defineField({
      name: 'image',
      title: 'Service Cover Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageUrl',
      title: 'External / Static Image Path (Fallback)',
      type: 'string',
      description: 'Optional URL or relative path (e.g. /annual-report.jpg) if not uploading an image file.',
    }),
    defineField({
      name: 'features',
      title: 'Key Capabilities / Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bulleted highlights (e.g., "Thematic cover design with foil & embossing")',
    }),
    defineField({
      name: 'scopeOfWork',
      title: 'Scope of Work',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'machinery',
      title: 'Machinery & Equipment Deployed',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'materials',
      title: 'Substrates & Finishes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'turnaround',
      title: 'Typical Turnaround Time',
      type: 'string',
      description: 'e.g. "48-hour dummy proofing; 3–5 working days for full production run."',
    }),
    defineField({
      name: 'useCases',
      title: 'Primary Use Cases',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order Priority',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
});
