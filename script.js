document.addEventListener('DOMContentLoaded', function () {
  const pageBannerText = {
    'index.html': 'Visao geral do ecossistema de cultivo, producao e venda.',
    'plantio.html': 'Guia pratico de implantacao, substrato, rega e estabilizacao inicial.',
    'mudas.html': 'Comparativo tecnico de mudas, estetica, velocidade e valor de mercado.',
    'caudex.html': 'Formacao estrutural do caudex com foco em valor ornamental e manejo.',
    'enxertia.html': 'Tecnicas de enxertia, controle de risco e escala comercial.',
    'podas.html': 'Protocolo de poda para arquitetura, floracao e saude da planta.',
    'polinizacao.html': 'Polinizacao manual para cruzamentos, vagens e banco genetico.',
    'crescimento.html': 'Gestao da fase adulta com diagnostico, manutencao e performance.',
    'logistica.html': 'Matriz de preco, expediacao e estrategia comercial orientada por dados.'
  };

  const pageProcessImages = {
    'index.html': [
      'imagnes/banner.png',
      'imagnes/Fotos Plantio/plantio.jpg',
      'imagnes/Fotos Mudas/mudas (1).jpeg',
      'imagnes/Fotos Enxertia/enxertia.jpg',
      'imagnes/Fotos Poda/WhatsApp Image 2026-03-19 at 23.36.53.jpeg',
      'imagnes/Fotos Venda/foto_venda.jpg'
    ],
    'plantio.html': [
      'imagnes/Fotos Plantio/plantio.jpg',
      'imagnes/Fotos Plantio/plantio_.png',
      'imagnes/Fotos Plantio/plantio__.jpg',
      'imagnes/Fotos Plantio/plantiio__.jpg',
      'imagnes/Fotos Germinação/geminação.jpeg'
    ],
    'mudas.html': [
      'imagnes/Fotos Mudas/mudas (1).jpeg',
      'imagnes/Fotos Mudas/mudas (3).jpeg',
      'imagnes/Fotos Mudas/mudas (5).jpeg',
      'imagnes/Fotos Mudas/mudas (7).jpeg',
      'imagnes/Fotos Mudas/mudas (9).jpeg',
      'imagnes/Fotos Mudas/mudas (10).jpeg'
    ],
    'caudex.html': [
      'imagnes/plantio/passo_a_passo_caudex.jpg',
      'imagnes/Fotos Plantio/plantio_.png',
      'imagnes/Fotos Plantio/plantiio__.jpg'
    ],
    'enxertia.html': [
      'imagnes/Fotos Enxertia/enxertia.jpg',
      'imagnes/Fotos Enxertia/enxertia_.jpg',
      'imagnes/plantio/passo_a_passo_exertia.jpg'
    ],
    'podas.html': [
      'imagnes/Fotos Poda/WhatsApp Image 2026-03-19 at 23.36.52.jpeg',
      'imagnes/Fotos Poda/WhatsApp Image 2026-03-19 at 23.36.53.jpeg',
      'imagnes/Fotos Poda/WhatsApp Image 2026-03-19 at 23.36.53 (1).jpeg',
      'imagnes/Fotos Poda/WhatsApp Image 2026-03-19 at 23.36.53 (2).jpeg'
    ],
    'polinizacao.html': [
      'imagnes/plantio/passo_a_passo_polinizacao manual.jpg',
      'imagnes/Fotos Germinação/geminação.jpeg'
    ],
    'crescimento.html': [
      'imagnes/Fotos crescimento/WhatsApp Image 2026-03-20 at 22.06.24 (1).jpeg',
      'imagnes/Fotos crescimento/WhatsApp Image 2026-03-20 at 22.06.24 (2).jpeg',
      'imagnes/Fotos crescimento/WhatsApp Image 2026-03-20 at 22.06.25.jpeg'
    ],
    'logistica.html': [
      'imagnes/Fotos Venda/foto_venda.jpg',
      'imagnes/Fotos Venda/foto_venda_.jpg',
      'imagnes/banner.png'
    ]
  };

  function prettifyFileName(filePath) {
    const decoded = decodeURIComponent(filePath);
    const name = decoded.split('/').pop().replace(/\.[^.]+$/, '');
    return name
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[()]/g, '')
      .trim();
  }

  function initPageTopBanner() {
    const main = document.querySelector('main');
    if (!main || document.querySelector('.site-top-banner')) return;

    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const titleText = (document.title || 'Rosa do Deserto').split('|')[0].trim();
    const subtitle = pageBannerText[pageName] || 'Conteudo tecnico e pratico para evolucao consistente no cultivo.';

    const banner = document.createElement('section');
    banner.className = 'site-top-banner';
    banner.innerHTML = `
      <div class="container site-top-banner-inner">
        <h2>${titleText}</h2>
        <p>${subtitle}</p>
      </div>
    `;

    main.parentNode.insertBefore(banner, main);
  }

  function initPhotoUploadSlots() {
    const main = document.querySelector('main');
    if (!main || main.querySelector('.process-photo-uploader')) return;

    const section = document.createElement('section');
    section.className = 'process-photo-uploader';
    section.innerHTML = `
      <div class="container">
        <h2>Registro Visual do Processo</h2>
        <p>Adicione fotos do seu processo para acompanhamento tecnico e historico visual.</p>
        <div class="upload-slots">
          <article class="upload-slot">
            <h4>Antes</h4>
            <label>Selecionar foto<input type="file" accept="image/*" data-preview="preview-antes"></label>
            <div id="preview-antes" class="upload-preview"><small>Nenhuma foto enviada</small></div>
          </article>
          <article class="upload-slot">
            <h4>Durante</h4>
            <label>Selecionar foto<input type="file" accept="image/*" data-preview="preview-durante"></label>
            <div id="preview-durante" class="upload-preview"><small>Nenhuma foto enviada</small></div>
          </article>
          <article class="upload-slot">
            <h4>Resultado</h4>
            <label>Selecionar foto<input type="file" accept="image/*" data-preview="preview-resultado"></label>
            <div id="preview-resultado" class="upload-preview"><small>Nenhuma foto enviada</small></div>
          </article>
        </div>
      </div>
    `;
    main.appendChild(section);

    section.querySelectorAll('input[type="file"]').forEach((input) => {
      input.addEventListener('change', function (event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const previewId = input.dataset.preview;
        const previewEl = section.querySelector(`#${previewId}`);
        if (!previewEl) return;

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = 'Foto do processo';
        previewEl.innerHTML = '';
        previewEl.appendChild(img);
      });
    });
  }

  function initProcessPhotoGrid() {
    const main = document.querySelector('main');
    if (!main || main.querySelector('.process-photo-grid-section')) return;

    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const images = pageProcessImages[pageName];
    if (!images || images.length === 0) return;

    const section = document.createElement('section');
    section.className = 'process-photo-grid-section';

    const cards = images.map((path) => {
      const safePath = encodeURI(path).replace(/#/g, '%23');
      const caption = prettifyFileName(path);
      return `
        <figure class="process-photo-card">
          <img src="${safePath}" alt="${caption}" />
          <figcaption>${caption}</figcaption>
        </figure>
      `;
    }).join('');

    section.innerHTML = `
      <div class="container">
        <h2>Galeria do Processo</h2>
        <p>Fotos reais das pastas do projeto para documentar visualmente cada etapa.</p>
        <div class="process-photo-grid">${cards}</div>
      </div>
    `;

    const uploader = main.querySelector('.process-photo-uploader');
    if (uploader) {
      main.insertBefore(section, uploader);
    } else {
      main.appendChild(section);
    }
  }

  function initKpiCounters() {
    const kpiValues = document.querySelectorAll('.kpi p');
    if (kpiValues.length === 0) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const original = el.textContent.trim();
        const match = original.match(/\d+/);
        if (!match) {
          obs.unobserve(el);
          return;
        }

        const target = Number(match[0]);
        const duration = 900;
        const start = performance.now();

        function update(now) {
          const progress = Math.min(1, (now - start) / duration);
          const current = Math.round(target * progress);
          el.textContent = original.replace(/\d+/, String(current));
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = original;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });

    kpiValues.forEach((k) => counterObserver.observe(k));
  }

  function highlightActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === current) {
        a.classList.add('active-link');
      }
    });
  }

  initPageTopBanner();
  initPhotoUploadSlots();
  initProcessPhotoGrid();
  initKpiCounters();
  highlightActiveNav();

  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const nav = document.getElementById('nav');

  if (mobileNavToggle && nav) {
    mobileNavToggle.addEventListener('click', function () {
      if (nav.classList.contains('mobile-nav-open')) {
        nav.classList.remove('mobile-nav-open');
        mobileNavToggle.textContent = '☰';
      } else {
        nav.classList.add('mobile-nav-open');
        mobileNavToggle.textContent = '✕';
      }
    });
  }

  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (carousel && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: -340, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  const mapInfo = document.getElementById('mapInfo');
  const mapGrid = document.getElementById('mapGrid');

  const estados = [
    { sigla: 'SC', regiao: 'Sul', temp: '12–16°C (inverno)', humidity: '65–80%', difficulty: 'Alta', issues: 'Frio intenso, geadas', recommendation: 'Estufa e janela interna', substrate: 'Areia grossa + perlita + cascalho' },
    { sigla: 'RS', regiao: 'Sul', temp: '10–17°C (inverno)', humidity: '60–85%', difficulty: 'Alta', issues: 'Frio, geadas', recommendation: 'Proteção térmica + vaso aquecido', substrate: 'Terra leve + areia grossa + carvão' },
    { sigla: 'PR', regiao: 'Sul', temp: '11–18°C', humidity: '65–80%', difficulty: 'Alta', issues: 'Umidade e frio serrano', recommendation: 'Ambiente interno e cobertura', substrate: 'Substrato poroso + perlita' },
    { sigla: 'SP', regiao: 'Sudeste', temp: '14–25°C', humidity: '60–82%', difficulty: 'Alta (serras)', issues: 'Invernos frios em altitude', recommendation: 'Solarização interna', substrate: 'Mistura drenante com areia e fibra' },
    { sigla: 'MG', regiao: 'Sudeste', temp: '13–24°C', humidity: '60–75%', difficulty: 'Alta (serras)', issues: 'Altitude fria', recommendation: 'Local protegido + MSP', substrate: 'Terra vegetal + vermiculita' },
    { sigla: 'AM', regiao: 'Norte', temp: '24–31°C', humidity: '80–95%', difficulty: 'Média', issues: 'Chuvas fortes', recommendation: 'Cobertura e ventilação', substrate: 'Areia grossa + fibra de coco' },
    { sigla: 'PA', regiao: 'Norte', temp: '24–32°C', humidity: '82–94%', difficulty: 'Média', issues: 'Encharcamento', recommendation: 'Plantio em vaso elevado', substrate: 'Perlita + cascalho' },
    { sigla: 'AP', regiao: 'Norte', temp: '24–31°C', humidity: '83–96%', difficulty: 'Média', issues: 'Chuva intensa', recommendation: 'Abas de proteção', substrate: 'Substrato drenante com vermiculita' },
    { sigla: 'ES', regiao: 'Sudeste', temp: '21–29°C', humidity: '76–89%', difficulty: 'Média', issues: 'Umidade litorânea', recommendation: 'Boa ventilação', substrate: 'Mistura leve e seca rapidamente' },
    { sigla: 'RJ', regiao: 'Sudeste', temp: '22–30°C', humidity: '70–88%', difficulty: 'Média', issues: 'Areias mal drenadas', recommendation: 'Solo alcalino leve', substrate: 'Areia + perlita + composto orgânico' },
    { sigla: 'CE', regiao: 'Nordeste', temp: '25–35°C', humidity: '45–70%', difficulty: 'Baixa', issues: 'Seca extrema', recommendation: 'Irrigação controlada', substrate: 'Solo mineral + perlita + pedras' },
    { sigla: 'BA', regiao: 'Nordeste', temp: '24–33°C', humidity: '60–75%', difficulty: 'Baixa', issues: 'Variação entre seco e chuva', recommendation: 'Drenagem reforçada', substrate: 'Areia média + serragem' },
    { sigla: 'PI', regiao: 'Nordeste', temp: '26–34°C', humidity: '50–72%', difficulty: 'Baixa', issues: 'Sol forte', recommendation: 'Sombria parcial', substrate: 'Mistura arenosa' },
    { sigla: 'RN', regiao: 'Nordeste', temp: '25–33°C', humidity: '55–75%', difficulty: 'Baixa', issues: 'Calor extremo', recommendation: 'Mantenha solo úmido', substrate: 'Areia + vermiculita' },
    { sigla: 'MT', regiao: 'Centro-Oeste', temp: '24–34°C', humidity: '60–75%', difficulty: 'Baixa', issues: 'Seca no inverno', recommendation: 'Irrigação por gotejamento', substrate: 'Areia grossa + fibra' },
    { sigla: 'MS', regiao: 'Centro-Oeste', temp: '23–33°C', humidity: '58–72%', difficulty: 'Baixa', issues: 'Ventos secos', recommendation: 'Mulching e irrigação', substrate: 'Solo leve + perlita' },
    { sigla: 'GO', regiao: 'Centro-Oeste', temp: '22–32°C', humidity: '55–72%', difficulty: 'Baixa', issues: 'Seca prolongada', recommendation: 'Água otimizada', substrate: 'Areia+substrato orgânico 40/60' }
  ];

  function renderMapStates() {
    if (!mapGrid || !mapInfo) return;
    mapGrid.innerHTML = '';
    estados.forEach((estado) => {
      const btn = document.createElement('button');
      btn.className = `map-state dificuldade-${estado.difficulty.toLowerCase()}`;
      btn.textContent = estado.sigla;
      btn.addEventListener('click', () => setMapInfo(estado, btn));
      mapGrid.appendChild(btn);
    });
  }

  function setMapInfo(estado, target) {
    if (!mapGrid || !mapInfo) return;
    const elements = mapGrid.querySelectorAll('.map-state');
    elements.forEach((el) => el.classList.remove('active'));
    target.classList.add('active');

    mapInfo.innerHTML = `
      <h3>${estado.sigla} (${estado.regiao}) - Dificuldade ${estado.difficulty}</h3>
      <p><strong>Temperatura média:</strong> ${estado.temp}</p>
      <p><strong>Umidade:</strong> ${estado.humidity}</p>
      <p><strong>Principais desafios:</strong> ${estado.issues}</p>
      <p><strong>Recomendações:</strong> ${estado.recommendation}</p>
      <p><strong>Substrato recomendado:</strong> ${estado.substrate}</p>
    `;

    const sugestao = document.createElement('p');
    sugestao.innerHTML = `<em>Precisa de ajuda para ajustar o substrato ao clima exato da sua cidade? Pergunte sobre o solo e a umidade local!</em>`;
    mapInfo.appendChild(sugestao);
  }

  if (mapGrid && mapInfo) {
    renderMapStates();
  }

  window.addEventListener('scroll', function () {
    const heroes = document.querySelector('.hero');
    if (!heroes) return;

    const scroll = window.scrollY / 200;
    heroes.style.transform = `scale(${1 + scroll * 0.02})`;
  });

  // Functionality for plantio.html
  const etapas = document.querySelectorAll('.etapa');
  const etapaDetalhes = document.getElementById('etapaDetalhes');

  if (etapas.length > 0) {
    const detalhesData = {
      plantio: { desc: 'Iniciar o processo de plantio.', tempo: 'Imediato', riscos: 'Escolha errada de substrato.', dicas: 'Use solo drenante.' },
      mudas: { desc: 'Cuidar das mudas jovens.', tempo: '1-2 meses', riscos: 'Doenças fúngicas.', dicas: 'Ventilação adequada.' },
      caudex: { desc: 'Formação do caudex.', tempo: '3-6 meses', riscos: 'Excesso de água.', dicas: 'Solo seco entre regas.' },
      enxerto: { desc: 'Enxertia para variedades.', tempo: '2-4 semanas', riscos: 'Rejeição.', dicas: 'Use ferramentas limpas.' },
      podas: { desc: 'Podas para forma.', tempo: 'Periódico', riscos: 'Podas excessivas.', dicas: 'Pode na primavera.' },
      polinizacao: { desc: 'Polinização para sementes.', tempo: 'Temporada de flor', riscos: 'Falta de polinizadores.', dicas: 'Manual se necessário.' },
      crescimento: { desc: 'Monitorar crescimento.', tempo: 'Contínuo', riscos: 'Nutrientes insuficientes.', dicas: 'Fertilizante balanceado.' },
      estoque: { desc: 'Gerenciar estoque.', tempo: 'Diário', riscos: 'Perda de plantas.', dicas: 'Rotação de estoque.' },
      venda: { desc: 'Vender produtos.', tempo: 'Sob demanda', riscos: 'Preços baixos.', dicas: 'Mercado competitivo.' },
      entrega: { desc: 'Entregar aos clientes.', tempo: '1-3 dias', riscos: 'Danos no transporte.', dicas: 'Embalagem segura.' }
    };

    etapas.forEach(etapa => {
      etapa.addEventListener('click', () => {
        const key = etapa.dataset.etapa;
        const data = detalhesData[key];
        etapaDetalhes.innerHTML = `
          <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
          <p><strong>Descrição:</strong> ${data.desc}</p>
          <p><strong>Tempo médio:</strong> ${data.tempo}</p>
          <p><strong>Riscos:</strong> ${data.riscos}</p>
          <p><strong>Dicas:</strong> ${data.dicas}</p>
        `;
      });
    });
  }

  const metodoSimulador = document.getElementById('metodoSimulador');
  const resultadoSimulador = document.getElementById('resultadoSimulador');

  if (metodoSimulador) {
    const tempos = {
      Semente: '12–24 meses',
      Estaca: '6–12 meses',
      Enxerto: '3–6 meses',
      Alporquia: '6–12 meses'
    };

    metodoSimulador.addEventListener('change', () => {
      resultadoSimulador.textContent = `Tempo estimado: ${tempos[metodoSimulador.value]}`;
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Tooltips
  const tooltips = {
    'caudex': 'Base grossa da planta, característica do Adenium.',
    'enxertia': 'Técnica de unir partes de plantas diferentes.',
    'alporquia': 'Método de propagação vegetativa.'
  };

  document.querySelectorAll('*').forEach(el => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      const text = el.textContent;
      Object.keys(tooltips).forEach(term => {
        if (text.includes(term)) {
          el.innerHTML = text.replace(new RegExp(`\\b${term}\\b`, 'gi'), `<span class="tooltip" data-tooltip="${tooltips[term]}">$&</span>`);
        }
      });
    }
  });

  document.addEventListener('mouseover', e => {
    if (e.target.classList.contains('tooltip')) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip-popup';
      tooltip.textContent = e.target.dataset.tooltip;
      document.body.appendChild(tooltip);
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = e.pageY - 30 + 'px';
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.classList.contains('tooltip')) {
      const popup = document.querySelector('.tooltip-popup');
      if (popup) popup.remove();
    }
  });
  const barChartCanvas = document.getElementById('barChart');
  if (barChartCanvas) {
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: ['Semente', 'Estaca', 'Enxerto', 'Alporquia'],
        datasets: [{
          label: 'Tempo (meses)',
          data: [18, 9, 4.5, 9],
          backgroundColor: ['#2e7d32', '#6a1b9a', '#f57c00', '#1976d2']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparação de Tempo entre Métodos'
          }
        }
      }
    });
  }

  const lineChartCanvas = document.getElementById('lineChart');
  if (lineChartCanvas) {
    new Chart(lineChartCanvas, {
      type: 'line',
      data: {
        labels: ['Mês 1', 'Mês 3', 'Mês 6', 'Mês 12', 'Mês 18', 'Mês 24'],
        datasets: [{
          label: 'Crescimento (cm)',
          data: [1, 5, 10, 20, 30, 40],
          borderColor: '#2e7d32',
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Crescimento ao Longo do Tempo'
          }
        }
      }
    });
  }

  const radarChartCanvas = document.getElementById('radarChart');
  if (radarChartCanvas) {
    new Chart(radarChartCanvas, {
      type: 'radar',
      data: {
        labels: ['Tempo', 'Custo', 'Estética', 'Facilidade', 'Sucesso'],
        datasets: [
          {
            label: 'Semente',
            data: [2, 8, 7, 6, 8],
            borderColor: '#2e7d32',
            backgroundColor: 'rgba(46, 125, 50, 0.2)'
          },
          {
            label: 'Estaca',
            data: [5, 6, 6, 8, 9],
            borderColor: '#6a1b9a',
            backgroundColor: 'rgba(106, 27, 154, 0.2)'
          },
          {
            label: 'Enxerto',
            data: [8, 3, 9, 5, 9],
            borderColor: '#f57c00',
            backgroundColor: 'rgba(245, 124, 0, 0.2)'
          },
          {
            label: 'Alporquia',
            data: [5, 6, 8, 6, 8],
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.2)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Desempenho dos Métodos'
          }
        }
      }
    });
  }

  const podasTempoChart = document.getElementById('podasTempoChart');
  if (podasTempoChart) {
    new Chart(podasTempoChart, {
      type: 'bar',
      data: {
        labels: ['Formação', 'Estrutural', 'Floração', 'Limpeza', 'Renovação'],
        datasets: [{
          label: 'Recuperação (dias)',
          data: [12, 14, 10, 8, 18],
          backgroundColor: ['#2e7d32', '#1976d2', '#f57c00', '#8e24aa', '#b71c1c']
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Tempo Médio de Recuperação por Tipo de Poda' } }
      }
    });
  }

  const podasRiscoChart = document.getElementById('podasRiscoChart');
  if (podasRiscoChart) {
    new Chart(podasRiscoChart, {
      type: 'radar',
      data: {
        labels: ['Fungo', 'Apodrecimento', 'Falha de broto', 'Perda de estética', 'Rejeição enxerto'],
        datasets: [{
          label: 'Risco sem protocolo',
          data: [85, 82, 65, 54, 72],
          borderColor: '#c62828',
          backgroundColor: 'rgba(198, 40, 40, 0.20)'
        }, {
          label: 'Risco com protocolo',
          data: [22, 18, 24, 20, 19],
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.20)'
        }]
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 100 } },
        plugins: { title: { display: true, text: 'Impacto da Padronização no Risco Operacional' } }
      }
    });
  }

  const podasEspecieChart = document.getElementById('podasEspecieChart');
  if (podasEspecieChart) {
    new Chart(podasEspecieChart, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'A. obesum (brotos)',
          data: [1, 3, 4, 5],
          borderColor: '#2e7d32',
          fill: false
        }, {
          label: 'A. arabicum (brotos)',
          data: [0, 1, 2, 3],
          borderColor: '#8d6e63',
          fill: false
        }, {
          label: 'A. multiflorum (brotos)',
          data: [1, 2, 2, 3],
          borderColor: '#f57c00',
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Resposta de Brotação por Espécie' } }
      }
    });
  }

  const objetivoPoda = document.getElementById('objetivoPoda');
  const estagioPoda = document.getElementById('estagioPoda');
  const calcularPoda = document.getElementById('calcularPoda');
  const resultadoPoda = document.getElementById('resultadoPoda');

  if (objetivoPoda && estagioPoda && calcularPoda && resultadoPoda) {
    const recomendacoes = {
      formacao: { tipo: 'Poda de Formação', janela: 'Primavera', risco: 'Baixo' },
      estrutura: { tipo: 'Poda Estrutural', janela: 'Primavera/Verão', risco: 'Médio' },
      renovacao: { tipo: 'Poda de Renovação', janela: 'Início da primavera', risco: 'Médio/Alto' },
      floracao: { tipo: 'Poda para Floração', janela: 'Fim da primavera', risco: 'Baixo' },
      saude: { tipo: 'Poda de Limpeza', janela: 'Durante ciclo ativo', risco: 'Baixo' }
    };

    calcularPoda.addEventListener('click', function () {
      const base = recomendacoes[objetivoPoda.value];
      let ajuste = 'Manter planta seca por 3 a 7 dias e evitar chuva.';
      if (estagioPoda.value === 'enxertada') {
        ajuste = 'Nunca cortar abaixo do enxerto; manter 10 cm acima do cavaleiro.';
      }
      if (estagioPoda.value === 'jovem' && objetivoPoda.value === 'renovacao') {
        ajuste = 'Evitar drástica em planta jovem; priorize formação.';
      }

      resultadoPoda.innerHTML = `
        <p><strong>Tipo recomendado:</strong> ${base.tipo}</p>
        <p><strong>Janela ideal:</strong> ${base.janela}</p>
        <p><strong>Risco:</strong> ${base.risco}</p>
        <p><strong>Orientação crítica:</strong> ${ajuste}</p>
      `;
    });
  }

  const poliHorarioChart = document.getElementById('poliHorarioChart');
  if (poliHorarioChart) {
    new Chart(poliHorarioChart, {
      type: 'bar',
      data: {
        labels: ['8h-11h', '11h-14h', 'Após 14h'],
        datasets: [{
          label: 'Taxa de sucesso (%)',
          data: [88, 72, 54],
          backgroundColor: ['#2e7d32', '#f9a825', '#c62828']
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Sucesso por Janela Horária' } }
      }
    });
  }

  const poliEvolucaoChart = document.getElementById('poliEvolucaoChart');
  if (poliEvolucaoChart) {
    new Chart(poliEvolucaoChart, {
      type: 'line',
      data: {
        labels: ['Dia 1', 'Dia 5', 'Dia 7', 'Dia 15', 'Dia 30', 'Dia 45'],
        datasets: [{
          label: 'Evolução da vagem (escala)',
          data: [5, 15, 30, 55, 82, 100],
          borderColor: '#2e7d32',
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Linha do Tempo da Formação de Vagens' } }
      }
    });
  }

  const poliRiscoChart = document.getElementById('poliRiscoChart');
  if (poliRiscoChart) {
    new Chart(poliRiscoChart, {
      type: 'radar',
      data: {
        labels: ['Perda de pólen', 'Falha de pegamento', 'Queda floral', 'Perda de semente', 'Contaminação'],
        datasets: [{
          label: 'Sem protocolo',
          data: [70, 68, 64, 80, 52],
          borderColor: '#c62828',
          backgroundColor: 'rgba(198, 40, 40, 0.2)'
        }, {
          label: 'Com protocolo',
          data: [25, 22, 20, 28, 18],
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 100 } },
        plugins: { title: { display: true, text: 'Riscos Operacionais na Polinização' } }
      }
    });
  }

  const idadeFlorPoli = document.getElementById('idadeFlorPoli');
  const horarioPoli = document.getElementById('horarioPoli');
  const amarrouVagem = document.getElementById('amarrouVagem');
  const calcularPoli = document.getElementById('calcularPoli');
  const resultadoPoli = document.getElementById('resultadoPoli');

  if (idadeFlorPoli && horarioPoli && amarrouVagem && calcularPoli && resultadoPoli) {
    calcularPoli.addEventListener('click', function () {
      let chance = 85;
      if (idadeFlorPoli.value === 'cedo') chance -= 15;
      if (idadeFlorPoli.value === 'tarde') chance -= 20;
      if (horarioPoli.value === 'medio') chance -= 10;
      if (horarioPoli.value === 'baixo') chance -= 20;
      chance = Math.max(25, chance);

      const riscoSemente = amarrouVagem.checked ? 'Baixo' : 'Alto';
      const acao = amarrouVagem.checked
        ? 'Monitorar vagem no D+7 e D+30 até pré-abertura.'
        : 'Amarrar vagem com elástico/barbante antes de rachar.';

      resultadoPoli.innerHTML = `
        <p><strong>Chance estimada de pegamento:</strong> ${chance}%</p>
        <p><strong>Risco de perda de sementes:</strong> ${riscoSemente}</p>
        <p><strong>Ação crítica:</strong> ${acao}</p>
      `;
    });
  }

  const crescimentoPilarChart = document.getElementById('crescimentoPilarChart');
  if (crescimentoPilarChart) {
    new Chart(crescimentoPilarChart, {
      type: 'radar',
      data: {
        labels: ['Luz', 'Rega', 'Substrato', 'Nutrição', 'Temperatura'],
        datasets: [{
          label: 'Desempenho ideal',
          data: [95, 88, 92, 85, 90],
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 100 } },
        plugins: { title: { display: true, text: 'Pilares de Alta Performance na Fase Adulta' } }
      }
    });
  }

  const crescimentoFloracaoChart = document.getElementById('crescimentoFloracaoChart');
  if (crescimentoFloracaoChart) {
    new Chart(crescimentoFloracaoChart, {
      type: 'line',
      data: {
        labels: ['Jan', 'Mar', 'Mai', 'Jul', 'Set', 'Nov'],
        datasets: [{
          label: 'Intensidade de floração (0-10)',
          data: [6, 7, 8, 6, 9, 8],
          borderColor: '#c37a35',
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Ciclos de Floração ao Longo do Ano' } }
      }
    });
  }

  const crescimentoRiscoChart = document.getElementById('crescimentoRiscoChart');
  if (crescimentoRiscoChart) {
    new Chart(crescimentoRiscoChart, {
      type: 'bar',
      data: {
        labels: ['Excesso de umidade', 'Baixa luz', 'Pragas', 'Deficiência B/Ca', 'Frio intenso'],
        datasets: [{
          label: 'Risco relativo (%)',
          data: [90, 75, 65, 55, 70],
          backgroundColor: ['#b71c1c', '#ef6c00', '#6a1b9a', '#1976d2', '#455a64']
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Principais Riscos da Fase Adulta' } }
      }
    });
  }

  const solCrescimento = document.getElementById('solCrescimento');
  const regaCrescimento = document.getElementById('regaCrescimento');
  const temperaturaCrescimento = document.getElementById('temperaturaCrescimento');
  const calcularCrescimento = document.getElementById('calcularCrescimento');
  const resultadoCrescimento = document.getElementById('resultadoCrescimento');

  if (solCrescimento && regaCrescimento && temperaturaCrescimento && calcularCrescimento && resultadoCrescimento) {
    calcularCrescimento.addEventListener('click', function () {
      let score = 100;

      if (solCrescimento.value === 'baixo') score -= 25;
      if (regaCrescimento.value === 'excesso') score -= 35;
      if (regaCrescimento.value === 'deficit') score -= 15;
      if (temperaturaCrescimento.value === 'frio') score -= 30;
      if (temperaturaCrescimento.value === 'intermediaria') score -= 10;

      score = Math.max(20, score);

      let status = 'Estável e produtiva';
      let risco = 'Baixo';
      let acao = 'Manter adubação rica em P e K + inspeção quinzenal.';

      if (score < 80) {
        status = 'Atenção ao manejo';
        risco = 'Médio';
        acao = 'Corrigir luz/rega e revisar drenagem do substrato.';
      }
      if (score < 55) {
        status = 'Risco de queda de performance';
        risco = 'Alto';
        acao = 'Plano de recuperação: reduzir umidade, aumentar luz e estabilizar temperatura.';
      }

      resultadoCrescimento.innerHTML = `
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Risco:</strong> ${risco}</p>
        <p><strong>Ação prioritária:</strong> ${acao}</p>
      `;
    });
  }

  const logPrecoChart = document.getElementById('logPrecoChart');
  if (logPrecoChart) {
    new Chart(logPrecoChart, {
      type: 'bar',
      data: {
        labels: ['Mudas', 'Mudas formadas', 'Enxertadas', 'Linha rara'],
        datasets: [{
          label: 'Preço médio de faixa (R$)',
          data: [52, 98, 194, 437],
          backgroundColor: ['#8d6e63', '#6a1b9a', '#f57c00', '#2e7d32']
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Média de Preço por Categoria' } }
      }
    });
  }

  const logMargemChart = document.getElementById('logMargemChart');
  if (logMargemChart) {
    new Chart(logMargemChart, {
      type: 'line',
      data: {
        labels: ['Mudas', 'Formadas', 'Enxertadas', 'Raras', 'Leilão'],
        datasets: [{
          label: 'Índice de margem (0-100)',
          data: [35, 52, 72, 88, 95],
          borderColor: '#2e7d32',
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Evolução de Margem por Linha' } }
      }
    });
  }

  const logRiscoChart = document.getElementById('logRiscoChart');
  if (logRiscoChart) {
    new Chart(logRiscoChart, {
      type: 'radar',
      data: {
        labels: ['Transporte', 'Embalagem', 'Quebra térmica', 'Atraso', 'Devolução'],
        datasets: [{
          label: 'Risco atual',
          data: [32, 28, 22, 40, 19],
          borderColor: '#c62828',
          backgroundColor: 'rgba(198, 40, 40, 0.2)'
        }, {
          label: 'Risco alvo',
          data: [18, 16, 12, 22, 10],
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 100 } },
        plugins: { title: { display: true, text: 'Risco Logístico (Atual x Alvo)' } }
      }
    });
  }

  const estagioPreco = document.getElementById('estagioPreco');
  const florPreco = document.getElementById('florPreco');
  const raridadePreco = document.getElementById('raridadePreco');
  const calcularPreco = document.getElementById('calcularPreco');
  const resultadoPreco = document.getElementById('resultadoPreco');

  if (estagioPreco && florPreco && raridadePreco && calcularPreco && resultadoPreco) {
    const baseRanges = {
      muda: {
        simples: [29.9, 39.9],
        bicolor: [39.9, 59.9],
        dobrada: [49.9, 79.9],
        tripla: [49.9, 79.9],
        multicolor: [49.9, 79.9],
        hibrida: [49.9, 79.9]
      },
      formada: {
        simples: [59.9, 79.9],
        bicolor: [79.9, 119.9],
        dobrada: [99.9, 149.9],
        tripla: [99.9, 149.9],
        multicolor: [99.9, 149.9],
        hibrida: [99.9, 149.9]
      },
      enxertada: {
        simples: [99.9, 129.9],
        bicolor: [129.9, 199.9],
        dobrada: [129.9, 199.9],
        tripla: [179.9, 279.9],
        multicolor: [199.9, 349.9],
        hibrida: [199.9, 349.9]
      },
      rara: {
        simples: [249.9, 399.9],
        bicolor: [299.9, 499.9],
        dobrada: [249.9, 399.9],
        tripla: [299.9, 499.9],
        multicolor: [299.9, 499.9],
        hibrida: [399.9, 800]
      }
    };

    const rarityFactor = {
      comum: 1,
      diferenciada: 1.12,
      rara: 1.25,
      premium: 1.4
    };

    function brl(v) {
      return `R$ ${v.toFixed(2).replace('.', ',')}`;
    }

    calcularPreco.addEventListener('click', function () {
      const stage = estagioPreco.value;
      const flower = florPreco.value;
      const rarity = raridadePreco.value;

      const range = baseRanges[stage][flower] || baseRanges[stage].simples;
      const min = range[0] * rarityFactor[rarity];
      const max = range[1] * rarityFactor[rarity];
      const rec = (min + max) / 2;

      let canal = 'E-commerce padrão';
      if (stage === 'enxertada' || rarity === 'rara') canal = 'Catálogo premium + atendimento consultivo';
      if (stage === 'rara' || rarity === 'premium') canal = 'Leilão e lista VIP de colecionadores';

      resultadoPreco.innerHTML = `
        <p><strong>Faixa sugerida:</strong> ${brl(min)} - ${brl(max)}</p>
        <p><strong>Preço recomendado:</strong> ${brl(rec)}</p>
        <p><strong>Canal ideal:</strong> ${canal}</p>
      `;
    });
  }
});