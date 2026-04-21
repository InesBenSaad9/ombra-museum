/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gallery } from './types';

export const GALLERIES: Gallery[] = [
  {
    id: 1,
    name: "La Misère et l'Inégalité",
    subtitle: "La pauvreté est une violence silencieuse.",
    color: "#D46A1A",
    oddBadge: "ODD 1",
    count: 12,
    artworks: [
      {
        id: "odd1-1",
        title: "Les Glaneuses",
        artist: "Jean-François Millet",
        year: "1857",
        medium: "Huile sur toile",
        dimensions: "83.5 × 111 cm",
        quote: "Des dos courbés sous le poids d'une dignité invisible.",
        description: "Travail précaire, inégalité rurale.",
        image: "/Les Glaneuses.jpg",
        odd: 1,
        oddLabel: "Pauvreté",
        oddColor: "#D46A1A",
        quiz: [
          {
            id: "q1",
            text: "Quel ODD cette œuvre illustre-t-elle ?",
            options: ["ODD 2", "ODD 4", "ODD 1", "ODD 3"],
            correctIndex: 2,
            explanation: "Cette œuvre illustre la pauvreté et les inégalités rurales, thèmes centraux de l'ODD 1."
          },
          {
             id: "q2",
             text: "Que font les femmes dans ce tableau ?",
             options: ["Semer du blé", "Danser", "Glaner les épis restants", "Porter l'eau"],
             correctIndex: 2,
             explanation: "Le glanage consiste à ramasser ce qui reste après la récolte, symbole de subsistance extrême."
          }
        ]
      },
      {
        id: "odd1-2",
        title: "Guernica",
        artist: "Pablo Picasso",
        year: "1937",
        medium: "Huile sur toile",
        dimensions: "349 × 776 cm",
        quote: "La douleur d'un peuple entier en noir et blanc.",
        description: "Violence systémique, destruction des communautés pauvres.",
        image: "/guernica.jpg",
        odd: 1,
        oddLabel: "Pauvreté",
        oddColor: "#D46A1A",
        quiz: [
          {
            id: "q1",
            text: "Quel événement a inspiré Guernica ?",
            options: ["La Révolution française", "Le bombardement de Guernica", "La Guerre froide", "La Shoah"],
            correctIndex: 1,
            explanation: "Le tableau a été peint en réponse au bombardement de la ville de Guernica pendant la guerre civile espagnole."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "La Faim et la Résistance",
    subtitle: "Nourrir est un acte politique.",
    color: "#C9891A",
    oddBadge: "ODD 2",
    count: 13,
    artworks: [
      {
        id: "odd2-1",
        title: "Famine Memorial",
        artist: "Rowan Gillespie",
        year: "1997",
        medium: "Sculpture bronze",
        dimensions: "6 figures",
        quote: "Des corps qui marchent vers la mer — ou vers la mort.",
        description: "Commémoration de la Grande Famine irlandaise.",
        image: "/famine memorial.jpg",
        odd: 2,
        oddLabel: "Faim",
        oddColor: "#C9891A",
        quiz: [
          {
            id: "q1",
            text: "Quel événement commémore cette sculpture ?",
            options: ["La Grande Famine irlandaise", "La WWII", "La peste noire", "La révolution industrielle"],
            correctIndex: 0,
            explanation: "Il s'agit d'un mémorial dédié aux victimes de la Grande Famine irlandaise de 1845-1852."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Le Corps en Résistance",
    subtitle: "Le corps n'est pas un luxe. La santé est un droit.",
    color: "#8B1A1A",
    oddBadge: "ODD 3 ★",
    count: 15,
    artworks: [
      {
        id: "odd3-1",
        title: "Le Cri",
        artist: "Edvard Munch",
        year: "1893",
        medium: "Huile sur carton",
        dimensions: "91 × 73.5 cm",
        quote: "L'angoisse de l'âme traversant le temps.",
        description: "Santé mentale et angoisse existentielle.",
        image: "/le cri.png",
        odd: 3,
        oddLabel: "Santé",
        oddColor: "#8B1A1A",
        quiz: [
          {
            id: "q1",
            text: "Quel ODD cette œuvre illustre-t-elle le mieux ?",
            options: ["ODD 1 — Pauvreté", "ODD 3 — Santé mentale", "ODD 4 — Éducation", "ODD 2 — Faim"],
            correctIndex: 1,
            explanation: "Le Cri est l'icône mondiale de l'angoisse et des troubles mentaux, liés à l'ODD 3."
          },
          {
            id: "q2",
             text: "Quelle émotion Munch exprimait-il ?",
             options: ["Terreur cosmique", "Joie", "Ennui", "Mélancolie"],
             correctIndex: 0,
             explanation: "Munch a décrit cet instant comme un 'cri infini traversant la nature'."
          }
        ]
      },
      {
        id: "odd3-2",
        title: "Autoportrait aux cheveux coupés",
        artist: "Frida Kahlo",
        year: "1940",
        medium: "Huile sur toile",
        dimensions: "40 × 27.9 cm",
        quote: "Je me peins parce que je suis seule.",
        description: "Santé mentale, douleur chronique, identité.",
        image: "/Autoportrait aux cheveux coupés.jpg",
        odd: 3,
        oddLabel: "Santé",
        oddColor: "#8B1A1A",
        quiz: [
          {
            id: "q1",
            text: "Quel accident a marqué la vie de Frida ?",
            options: ["Chute de cheval", "Accident de bus à 18 ans", "Noyade", "Incendie"],
            correctIndex: 1,
            explanation: "L'accident de bus a causé des blessures à vie, influençant toute son œuvre."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Le Savoir en Résistance",
    subtitle: "L'éducation est la seule arme que personne ne peut te voler.",
    color: "#185FA5",
    oddBadge: "ODD 4",
    count: 12,
    artworks: [
      {
        id: "odd4-1",
        title: "L'École d'Athènes",
        artist: "Raphaël",
        year: "1509",
        medium: "Fresque",
        dimensions: "500 × 770 cm",
        quote: "La connaissance n'a jamais appartenu qu'à ceux qui osaient questionner.",
        description: "Le savoir classique comme fondement de l'éducation.",
        image: "/L'École d'Athènes.jpg",
        odd: 4,
        oddLabel: "Éducation",
        oddColor: "#185FA5",
        quiz: [
          {
            id: "q1",
            text: "Qui sont les deux figures centrales ?",
            options: ["Socrate et Platon", "Platon et Aristote", "Aristote et Euclide", "Héraclite et Diogène"],
            correctIndex: 1,
            explanation: "Platon pointant le ciel et Aristote la terre sont au centre de la fresque."
          }
        ]
      }
    ]
  }
];
