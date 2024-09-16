import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { firestore } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import '../styles/Dashboard.css';

// Registrar componentes necessários para o gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Expense {
  id: string; // Adicionando id para identificar despesas
  category: string;
  amount: number;
  date: string; // Adicionando data para o histórico
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Despesas',
        data: [] as number[],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Salário e Dinheiro Extra',
        data: [0, 0], // Placeholder para mostrar Salário e Dinheiro Extra no gráfico
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [salary, setSalary] = useState<number>(0);
  const [extraMoney, setExtraMoney] = useState<number>(0);
  const [expenseCategory, setExpenseCategory] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]); // Estado para armazenar as despesas

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, 'expenses'));
      let labels: string[] = [];
      let values: number[] = [];
      let totalExpensesValue = 0;

      const expensesList: Expense[] = [];

      snapshot.forEach(doc => {
        const expenseData = doc.data() as Omit<Expense, 'id'>;
        expensesList.push({ id: doc.id, ...expenseData });
        labels.push(expenseData.category);
        values.push(expenseData.amount);
        totalExpensesValue += expenseData.amount;
      });

      setTotalExpenses(totalExpensesValue);
      setBalance(salary + extraMoney - totalExpensesValue);
      setExpenses(expensesList);

      setData({
        labels,
        datasets: [
          {
            label: 'Despesas',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Salário e Dinheiro Extra',
            data: [salary, extraMoney],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [salary, extraMoney]);

  const handleAddExpense = async () => {
    if (expenseCategory && expenseAmount > 0) {
      try {
        await addDoc(collection(firestore, 'expenses'), {
          category: expenseCategory,
          amount: expenseAmount,
          date: new Date().toISOString().split('T')[0], // Adiciona a data atual no formato YYYY-MM-DD
        });
        setExpenseCategory('');
        setExpenseAmount(0);
        fetchData(); // Atualiza os dados após adicionar
      } catch (error) {
        console.error("Erro ao adicionar despesa: ", error);
      }
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'expenses', id));
      fetchData(); // Atualiza os dados após a remoção
    } catch (error) {
      console.error("Erro ao remover despesa: ", error);
    }
  };

  const handleEditExpense = async (id: string, newAmount: number) => {
    try {
      const expenseRef = doc(firestore, 'expenses', id);
      await updateDoc(expenseRef, { amount: newAmount });
      fetchData(); // Atualiza os dados após a edição
    } catch (error) {
      console.error("Erro ao editar despesa: ", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">Dashboard</div>
      </div>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Salário</h3>
          <input
            type="number"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="summary-card">
          <h3>Dinheiro Extra</h3>
          <input
            type="number"
            value={extraMoney || ''}
            onChange={(e) => setExtraMoney(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="summary-card">
          <h3>Total Receitas</h3>
          <p>R$ {salary + extraMoney}</p>
        </div>
        <div className="summary-card">
          <h3>Total Despesas</h3>
          <p>R$ {totalExpenses}</p>
        </div>
        <div className="summary-card">
          <h3>Saldo</h3>
          <p>R$ {balance}</p>
        </div>
      </div>
      <div className="expense-form">
        <h3>Adicionar Despesa</h3>
        <label>
          Categoria:
          <input
            type="text"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            placeholder="Categoria"
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            value={expenseAmount || ''}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            placeholder="0"
          />
        </label>
        <button onClick={handleAddExpense}>Adicionar Despesa</button>
      </div>
      <div className="chart-container">
        <Pie
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.label}: R$ ${context.raw}`;
                  },
                },
              },
            },
          }}
        />
      </div>
      <div className="expense-history">
        <h3>Histórico de Gastos</h3>
        <ul>
          {expenses.map(expense => (
            <li key={expense.id} className="expense-item">
              <span>{expense.date}</span> - <span>{expense.category}</span>: R$ {expense.amount}
              <button onClick={() => handleDeleteExpense(expense.id)}>Remover</button>
              <button onClick={() => {
                const newAmount = prompt("Novo valor:", expense.amount.toString());
                if (newAmount !== null && !isNaN(Number(newAmount))) {
                  handleEditExpense(expense.id, Number(newAmount));
                }
              }}>Editar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
