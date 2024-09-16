// src/components/Despesas.tsx
import React from 'react';

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
}

const Despesas: React.FC<{ despesas: Despesa[] }> = ({ despesas }) => {
  return (
    <div>
      <h2>Despesas</h2>
      <ul>
        {despesas.map(despesa => (
          <li key={despesa.id}>{despesa.descricao}: R${despesa.valor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Despesas;
