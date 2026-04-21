/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  quote: string;
  description: string;
  image: string;
  odd: number; // SDG number
  oddLabel: string;
  oddBadge?: string;
  oddColor: string;
  quiz: Question[];
}

export interface Gallery {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  oddBadge: string;
  count: number;
  artworks: Artwork[];
}

export interface UserStats {
  flames: number;
  rank: string;
  rankName: string;
  nextRankFlames: number;
}
