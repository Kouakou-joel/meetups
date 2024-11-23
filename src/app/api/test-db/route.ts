 // Start of Selection
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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

    console.log('Participants:', participants);
    
    // Vérification des données reçues
    if (!participants.nom || !participants.email || !participants.telephone) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Vérifier si l'email existe déjà
      const checkEmail = await client.query(
        'SELECT * FROM participants WHERE email = $1',
        [participants.email]
      );

      if (checkEmail.rows.length > 0) {
        return NextResponse.json(
          { error: 'Cette adresse email est déjà inscrite' },
          { status: 400 }
        );
      }

      // Insérer le nouveau participant
      const result = await client.query(
        `INSERT INTO participants (nom, email, telephone, nombre_personnes)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [participants.nom, participants.email, participants.telephone, participants.nombrePersonnes]
      );

      return NextResponse.json({
        success: true,
        participant: result.rows[0]
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}