'use client';
import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";

interface Participant {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  nombrePersonnes: number;
}

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalInscrits, setTotalInscrits] = useState(0);

  useEffect(() => {
    fetchTotalInscrits();
  }, []);

  const fetchTotalInscrits = async () => {
    try {
      const storedParticipants = localStorage.getItem('participants');
      const participantsArray = storedParticipants ? JSON.parse(storedParticipants) : [];
      setTotalInscrits(participantsArray.length);
    } catch (error) {
      console.log('Erreur lors de la récupération du total:', error);
    }
  };

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Vérifier les places disponibles
      if (totalInscrits >= 500) {
        alert("Désolé, il ne reste plus de places disponibles.");
        return;
      }

      const newParticipant: Participant = {
        id: generateUniqueId(),
        nom: name,
        email: email,
        telephone: telephone,
        nombrePersonnes: 1
      };

      const storedParticipants = localStorage.getItem('participants');
      const participantsArray = storedParticipants ? JSON.parse(storedParticipants) : [];
      const emailExists = participantsArray.some((participant: any) => participant.email === newParticipant.email);

      if (emailExists) {
        alert("Cette adresse email est déjà inscrite.");
        return;
      }

      participantsArray.push(newParticipant);
      localStorage.setItem('participants', JSON.stringify(participantsArray));

      // Réinitialiser le formulaire
      setName('');
      setEmail('');
      setTelephone('');
      
      // Mettre à jour le compteur
      await fetchTotalInscrits();
      
      alert('Inscription réussie !');
      
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Une erreur est survenue lors de l\'inscription');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 from-purple-50 to-indigo-50 py-32 w-full h-full">
      <div className="mx-auto px-4 pt-3 max-md:w-screen max-w-2xl">
        {/* Logo et En-tête */}
        <div className="justify-center text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/assets/images/IMG_3465.JPG"
              alt="Logo Gala"
              width={150}
              height={150}
              className="shadow-md rounded-full"
            />
          </div>
          <h1 className="mb-2 font-bold text-3xl text-blue-500">Meetup 2024</h1>
        
        </div>

        {/* Formulaire d'inscription */}
        <div className="shadow-xl mb-10 p-8 rounded-2xl">
          <h2 className="mb-8 font-bold text-3xl text-center text-gray-800">Inscription</h2>
          <form onSubmit={handleSubmit} className="space-y-6 max-sm:space-y-2 max-md:space-y-3 mx-auto max-w-2xl">
            <div className="space-y-3">
              {/* Nom */}
              <div className="max-sm:block max-md:block flex space-x-5 max-sm:space-x-0 max-md:space-x-0">
                <div className="w-40">
                  <label className="flex items-center mb-2 font-medium text-gray-700 text-sm">Nom</label>
                </div>
                <div className="w-2/3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-300 px-2 py-2 border rounded-lg focus:ring-2 w-96 max-sm:w-60 max-md:w-58 h-8 text-black outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="max-sm:block max-md:block flex space-x-6 max-sm:space-x-0 max-md:space-x-0">
                <div className="w-40">
                  <label className="flex mb-2 font-medium text-gray-700 text-sm">Email</label>
                </div>
                <div className="w-2/3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300 px-2 border rounded-lg focus:ring-2 w-96 max-sm:w-60 max-md:w-58 h-8 text-black outline-none"
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="max-sm:block max-md:block flex space-x-5 max-sm:space-x-0 max-md:space-x-0">
                <div className="w-40">
                  <label className="block mb-2 font-medium text-gray-700 text-sm">Téléphone</label>
                </div>
                <div>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="border-gray-300 px-2 py-2 border rounded-lg focus:ring-2 w-96 max-sm:w-60 max-md:w-58 h-8 text-black outline-none"
                    required
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  className="border-gray-300 rounded focus:ring-blue-200 w-4 h-4 text-blue-300"
                  required
                />
                <label className="ml-2 text-gray-700 text-sm">
                  J&apos;accepte les conditions
                </label>
              </div>

              {/* Bouton Submit */}
              <div className="flex space-x-5">
                <div className="mx-24 max-sm:mx-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`items-center max-sm:items-center max-md:items-center bg-blue-500 hover:bg-blue-400 shadow-md hover:shadow-lg mt-6 py-1 max-sm:p-0 max-md:p-0 rounded-lg w-96 max-sm:w-60 max-md:w-56 h-8 font-medium text-center text-white transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Inscription en cours...' : 'Confirmer mon inscription'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mb-1 text-center text-gray-600">
          <p className="text-sm">
            Pour toute question, contactez-nous à {" 0170165414 "}
            <a href="mailto:event@example.com" className="text-blue-500 hover:text-blue-400">
              event@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
