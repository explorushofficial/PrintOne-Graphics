import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured, writeToken } from '../env';

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false to get fresh updates immediately when admin adds products/services
    })
  : null;

export const writeClient =
  isSanityConfigured && writeToken
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token: writeToken,
        useCdn: false,
      })
    : null;

