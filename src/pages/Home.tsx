// src/pages/Home.tsx
import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="project-title">Finessnap</h1>
        <p className="project-tagline">Seu aliado inteligente para o gerenciamento de finanças pessoais</p>
      </header>
      <main className="home-main">
        <section className="home-intro">
          <p>
            O <span className="highlight">Finessnap</span> é uma ferramenta inovadora projetada para ajudar você a gerenciar suas finanças de maneira eficiente e fácil.
          </p>
          <p>
            Com o Finessnap, você pode adicionar suas receitas e despesas, visualizar relatórios detalhados e obter uma visão clara de sua saúde financeira.
          </p>
          <p>
            Navegue pelas diferentes seções do aplicativo para explorar todas as suas funcionalidades. Para saber mais sobre o desenvolvimento e os recursos do aplicativo, visite a <a href="/sobre" className="about-link">página Sobre</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
