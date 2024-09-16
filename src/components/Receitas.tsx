// src/components/Receitas.tsx
import React from 'react';

interface Receita {
  id: string;
  descricao: string;
  valor: number;
}

const Receitas: React.FC<{ receitas: Receita[] }> = ({ receitas }) => {
  return (
    <div>
      <h2>Receitas</h2>
      <ul>
        {receitas.map(receita => (
          <li key={receita.id}>{receita.descricao}: R${receita.valor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Receitas;
