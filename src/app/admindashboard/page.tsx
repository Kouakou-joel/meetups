'use client';
import { useEffect, useState } from 'react';

interface Participant {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  nombre_personnes: number;
}

export default function AdminDashboard() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  // const [loading, setLoading] = useState(true);
   const [ error ] = useState<string | null>(null);

useEffect(() => {
  const fetchParticipants = async () => {
    try {
      const response = localStorage.getItem('participants');
      setParticipants(JSON.parse(response || '[]'));
    } catch (error) {
      console.error('Erreur lors du chargement des participants:', error);
      // setError('Erreur lors du chargement des participants');
    }
  };

  fetchParticipants();
}, []);

  //  if (loading) return <div>Chargement...</div>;
   if (error) return <div>Erreur: {error}</div>;

  // Calculer les statistiques
  const totalInscrits = participants.length;
  const placesRestantes = 500 - totalInscrits;
 ;

  return (
    <div className="p-8">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white shadow-lg p-6 rounded-xl text-black">
          <h1 className="mb-6 font-bold text-2xl">Tableau de bord administrateur</h1>
          
          {/* Statistiques */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="font-medium text-indigo-900 text-lg">Total Inscrits</h3>
              <p className="font-bold text-3xl text-indigo-600">{totalInscrits}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-medium text-green-900 text-lg">Places restantes</h3>
              <p className="font-bold text-3xl text-green-600">{placesRestantes}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg text-purple-900">Total Personnes</h3>
              <p className="font-bold text-3xl text-purple-600">{totalInscrits}</p>
            </div>
          </div>
  
          {/* Liste des inscrits */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Téléphone</th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Personnes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participants.map((participants) => (
                  <tr key={participants.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{participants.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{participants.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{participants.telephone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{participants.nombre_personnes}</td>
                  </tr>
                ))}
                {participants.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      Aucun participant inscrit
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}