import React from 'react';

function CopyToClipboard ({value}) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  };
  return (
    <button 
        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 ml-2"
        type="button"
        onClick={copyToClipboard}>
        Copiar 
    </button>

  );
}
export default CopyToClipboard;