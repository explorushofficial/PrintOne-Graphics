import { defineField, defineType } from 'sanity';

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Hero Showcase Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title / Caption',
      type: 'string',
      description: 'A label or title for this slide (e.g. "Commercial Offset Press")',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'image',
      title: 'Hero Background Image',
      type: 'image',
      description: 'High-resolution photo for the rotating hero banner',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (Direct Fallback or CDN)',
      type: 'url',
      description: 'Optional direct image URL',
    }),
    defineField({
      name: 'focus',
      title: 'Focal Point / Alignment',
      type: 'string',
      description: 'CSS object-position alignment for wide displays',
      initialValue: '85% center',
      options: {
        list: [
          { title: '85% Center (Default / Ideal for Press visual)', value: '85% center' },
          { title: 'Center Center', value: 'center center' },
          { title: 'Top Center', value: 'top center' },
          { title: 'Bottom Center', value: 'bottom center' },
          { title: 'Left Center', value: 'left center' },
          { title: 'Right Center', value: 'right center' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Slide Sequence Order',
      type: 'number',
      description: 'Order in which this photo appears in the slideshow (1, 2, 3...)',
      initialValue: 1,
    }),
    defineField({
      name: 'isActive',
      title: 'Active in Hero Slideshow',
      type: 'boolean',
      description: 'Toggle on to display in the live hero section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, media, order, isActive }) {
      return {
        title: title || 'Untitled Slide',
        subtitle: `Sequence #${order ?? 1} • ${isActive !== false ? 'Live' : 'Hidden'}`,
        media,
      };
    },
  },
});
