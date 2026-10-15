import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schemaTypes';
import { dataset, projectId } from './sanity/env';

export default defineConfig({
  basePath: '/admin',
  title: 'Print One Graphics Admin Panel',
  projectId: projectId || 'dummy-project-id',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({
      title: 'Content Desk',
    }),
  ],
});
