import React, { useState } from 'react';
import '../styles/ExpenseForm.css';

const ExpenseForm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione a lógica para enviar os dados para o Firestore aqui
    console.log({ category, amount, description });
  };

  return (
    <div className="expense-form-container">
      <div className="expense-form">
        <h2>Adicionar Despesa</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Valor</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Adicionar Despesa</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
