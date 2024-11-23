// pages/api/participants/acount.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { nom, email, telephone } = req.body;
  
      // Simulez l'ajout à une base de données
      if (!nom || !email || !telephone) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
      }
  
      // Exemple : simulation d'une réponse réussie
      return res.status(201).json({ message: 'Participant ajouté avec succès.' });
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: 'Méthode non autorisée' });
    }
  }
  