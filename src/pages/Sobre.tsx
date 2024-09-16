import React from 'react';
import '../styles/Sobre.css'; // Atualize o caminho

const Sobre: React.FC = () => {
  return (
    <div className="sobre-container">
      <h1>Sobre</h1>
      <div className="info-container">
        <div className="bio">
    
          <div className="details">
            <h2>Rafaela Boldrini Lopes</h2>
            <p>Estudante de engenharia de Software</p>
            <p>
            Sou estudante de desenvolvimento de software. Meu objetivo com este projeto é fornecer uma ferramenta útil para o gerenciamento de finanças pessoais de maneira eficiente e acessível. Adoro enfrentar desafios e estou sempre em busca de novas oportunidades para aprender e crescer na área de tecnologia.
            </p>
            <a href="hhttps://github.com/rafablopes" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div className="mission">
          <h3>Missão do Projeto</h3>
          <p>
            O Gerenciador de Orçamento Pessoal visa ajudar usuários a gerenciar suas finanças de maneira prática e eficiente. 
            Nosso objetivo é fornecer uma plataforma intuitiva que facilite o acompanhamento de receitas e despesas, 
            possibilitando uma visão clara e detalhada da saúde financeira pessoal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sobre;

