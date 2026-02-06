// Hash routing utilities for URL-based navigation
// Derives slugs from section titles for bidirectional lookup

import { sections } from '../data/sections';

const slugToId = new Map<string, number>();
const idToSlug = new Map<number, string>();

sections.forEach((section) => {
  const slug = section.title.toLowerCase().replace(/\s+/g, '-');
  slugToId.set(slug, section.id);
  idToSlug.set(section.id, slug);
});

/** Get a section ID from a hash string. Returns null for home or unknown. */
export function sectionIdFromHash(hash: string): number | null {
  const slug = hash.replace(/^[#/]+/, '').toLowerCase();
  if (!slug) return null;
  return slugToId.get(slug) ?? null;
}

/** Get a hash string from a section ID. Returns '' for null. */
export function hashFromSectionId(id: number | null): string {
  if (id === null) return '';
  return idToSlug.get(id) ?? '';
}

/** Check if a hash string maps to a valid section. */
export function isValidSectionHash(hash: string): boolean {
  const slug = hash.replace(/^[#/]+/, '').toLowerCase();
  return slug === '' || slugToId.has(slug);
}
