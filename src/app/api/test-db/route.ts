import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Lire le corps de la requête de manière sécurisée
    const text = await request.text();
    if (!text) {
      return NextResponse.json(
        { error: 'Corps de la requête vide' },
        { status: 400 }
      );
    }

    const participants = JSON.parse(text);
    
    // Vérification des données reçues
    if (!participants.nom || !participants.email || !participants.telephone) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // const client = await pool.connect();

    try {
      // Vérifier si l'email existe déjà
      if (typeof window !== 'undefined') {
        const storedParticipants = localStorage.getItem('participants');
        const participantsArray = storedParticipants ? JSON.parse(storedParticipants) : [];
        const emailExists = participantsArray.some((participant: any) => participant.email === participants.email);

        if (emailExists) {
          return NextResponse.json(
            { error: 'Cette adresse email est déjà inscrite' },
            { status: 400 }
          );
        }
      }

      // Générer un ID unique pour le participant
      const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

      const data = {
        id: generateUniqueId(),
        nom: participants.nom,
        email: participants.email,
        telephone: participants.telephone
      }

      // Stocker les données dans le localStorage
      if (typeof window !== 'undefined') {
        const storedParticipants = localStorage.getItem('participants');
        const participantsArray = storedParticipants ? JSON.parse(storedParticipants) : [];
        participantsArray.push(data);
        localStorage.setItem('participants', JSON.stringify(participantsArray));
      }

      return NextResponse.json({
        success: true,
        participant: data
      });

    } finally {
      // client.release();
    }

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}