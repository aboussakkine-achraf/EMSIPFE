import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Usercontext } from './Usercontext';

const Addpfe = () => {
  const [titre, setTitre] = useState('');
  const [domainEtude, setDomainEtude] = useState('');
  const [problematique, setProblematique] = useState('');
  const [entrepriseOptions, setEntrepriseOptions] = useState([]);
  const [selectedEntreprise, setSelectedEntreprise] = useState('');
  const [description, setDescription] = useState('');
  const [rediriger, setRediriger] = useState(false);
  const [quitter, setQuitter] = useState(false);
  const { setUserInfo, userInfo } = useContext(Usercontext);

  useEffect(() => {
    fetchEntrepriseOptions(); // Fetch entreprise options when component mounts
  }, []);

  const fetchEntrepriseOptions = async () => {
    try {
      const response = await fetch('http://localhost:4000/listeEntreprise');
      if (response.ok) {
        const data = await response.json();
        setEntrepriseOptions(data); // Update the entrepriseOptions state with fetched data
      } else {
        throw new Error('Failed to fetch entreprises');
      }
    } catch (error) {
      console.error('Error fetching entreprise options:', error);
    }
  };

  async function nouveauPfe(e) {
    if (!quitter) {
      e.preventDefault();
      const response = await fetch('http://localhost:4000/addpfe', {
        method: 'POST',
        body: JSON.stringify({ titre, domainEtude, problematique, entreprise: selectedEntreprise, description }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      setRediriger(response.ok);
    }
  }

  if (rediriger && userInfo.role) {
    let destination;
    switch (userInfo.role) {
      case 'ETUDIANT':
        destination = '/gest/listPfe';
        break;
      case 'ENSEIGNANT':
        destination = '/ense/listPfe';
        break;
      case 'COORDINATEUR':
        destination = '/cord/listPfe';
        break;
      case 'ADMIN':
        destination = '/Admin/listPfe';
        break;
      default:
        destination = '/';
    }
    return <Navigate to={destination} />;
  }

  return (
    <>
      <div className='h-[90%] flex flex-col justify-around items-center'>
        <h2 className='text-xl font-bold pb-4 pt-4'>Ajouter un sujet de PFE :</h2>
        <form className='flex flex-col justify-center gap-y-4 w-[75%]' onSubmit={nouveauPfe}>
          <input
            placeholder='Titre'
            className='border-black border-2 rounded-lg pl-2 h-9'
            value={titre}
            onChange={e => setTitre(e.target.value)}
            required
          />
          <input
            placeholder='Domaine de recherche'
            className='border-black border-2 rounded-lg pl-2 h-9'
            value={domainEtude}
            onChange={e => setDomainEtude(e.target.value)}
            required
          />
          <input
            placeholder='Problematique'
            className='border-black border-2 rounded-lg pl-2 h-9'
            value={problematique}
            onChange={e => setProblematique(e.target.value)}
            required
          />
          <select
            placeholder='Entreprise'
            className='border-black border-2 rounded-lg pl-2 h-9'
            value={selectedEntreprise}
            onChange={e => setSelectedEntreprise(e.target.value)}
            required
          >
            <option value=''>Selecter une entreprise</option>
            {entrepriseOptions.map(entreprise => (
              <option key={entreprise._id} value={entreprise._id}>
                {entreprise.nom}
              </option>
            ))}
          </select>
          <textarea
            id='message'
            rows='4'
            className='border-black border-2 rounded-lg pl-2'
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
          <div className='flex gap-x-3 justify-end h-11'>
            <button className='bg-red-500 w-[20%] rounded-lg' onClick={() => setQuitter(true)}>
              Annuler
            </button>
            <button className='bg-green-500 w-[20%] rounded-lg' type='submit'>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addpfe;
