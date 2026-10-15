export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const writeToken =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
  '';

export const isSanityConfigured = Boolean(
  projectId && projectId.trim() !== '' && projectId !== 'your-sanity-project-id'
);

export const hasWriteAccess = Boolean(isSanityConfigured && writeToken.trim() !== '');

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
