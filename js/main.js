import anime from 'animejs/lib/anime.es.js'

document.addEventListener('DOMContentLoaded', () => {
    
  const slides = document.querySelectorAll('#bg-slider .slide-bg');
  let currentSlideIndex = 0;
  const slideInterval = 4000; // 4 secondes d'affichage

  if (slides.length === 0) return; // Sécurité si pas d'images

  function playSlider() {
    // Calcul des indices
    const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
    
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[nextSlideIndex];

    // Création de la Timeline de transition (Fade Out / Fade In)
    const tl = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 800
    });

    tl
    // Cacher l'image actuelle (Fade Out)
    .add({
      targets: currentSlide,
      opacity: [1, 0],
    })
    // Afficher l'image suivante (Fade In)
    .add({
      targets: nextSlide,
      opacity: [0, 1],
    }, '-=800'); // Démarre en même temps (overlap)

    // Mise à jour de l'indice
    currentSlideIndex = nextSlideIndex;
  }

  // Lancer la boucle automatique
  setInterval(playSlider, slideInterval);
});


document.addEventListener(
    'DOMContentLoaded', () =>{
        const links = document.querySelectorAll(".menu-link")
        const sections = document.querySelectorAll(".tab_content")

        links.forEach(link =>{
            link.addEventListener("click", (event) =>{
                event.preventDefault();

                const targetId = link.getAttribute("data_target")
                

                links.forEach(l => l.classList.remove("active"))
                sections.forEach(section => section.classList.remove("active"))
                

                link.classList.add("active");
                const targetSection = document.getElementById(targetId)
                
                if (targetSection) {
                    targetSection.classList.add("active");
                }
            })
        })
    }
)


    document.addEventListener('DOMContentLoaded', () => {
      const buttons = document.querySelectorAll('.tab-btn');
      const contents = document.querySelectorAll('.content-block');

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          // 1. Récupérer l'ID du bloc à afficher via l'attribut data-target
          const targetId = button.getAttribute('data-target');

          // 2. Masquer TOUS les blocs de contenu
          contents.forEach(content => content.classList.add('hidden'));

          // 3. Afficher uniquement le bloc ciblé
          const activeContent = document.getElementById(targetId);
          if (activeContent) {
            activeContent.classList.remove('hidden');
          }

          // 4. Mettre à jour le style visuel des boutons (optionnel)
          buttons.forEach(btn => btn.classList.remove('btn-active'));
          button.classList.add('btn-active');
        });
      });
    });





document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const items = document.querySelectorAll('.carousel-item-card');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!track || items.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoPlayDelay = 3500; // 3.5 secondes entre chaque défilement

  // Calcul de la distance de déplacement (Largeur d'une carte + le gap de 24px)
  function getStepWidth() {
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = 24; // correspond à gap-6 (6 * 4px)
    return itemWidth + gap;
  }

  // Fonction d'animation de la piste
  function moveTrack(index) {
    const stepWidth = getStepWidth();
    
    anime({
      targets: track,
      translateX: -(index * stepWidth),
      easing: 'easeOutCubic',
      duration: 600
    });
  }

  function nextSlide() {
    // Si on arrive à la fin, on boucle au début
    if (currentIndex >= items.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    moveTrack(currentIndex);
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      currentIndex = items.length - 1;
    } else {
      currentIndex--;
    }
    moveTrack(currentIndex);
  }

  // Gestion du défilement automatique
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // Événements des boutons
  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoplay(); // Réinitialise le timer au clic
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  // Pause au survol de la souris
  track.parentElement.addEventListener('mouseenter', stopAutoplay);
  track.parentElement.addEventListener('mouseleave', startAutoplay);

  // Lancement automatique au chargement
  startAutoplay();
});





document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.auto-hover-card');
  if (cards.length === 0) return;

  let currentCardIndex = 0;
  let hoverTimer = null;
  const intervalTime = 5000; // 10 secondes par carte

  // Fonction pour activer l'effet hover sur la carte actuelle
  function activateCard(index) {
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('is-active');
        
        // Petite animation subtile avec Anime.js lors de l'activation
        anime({
          targets: card,
          scale: [1, 1.05],
          duration: 400,
          easing: 'easeOutQuad'
        });
      } else {
        card.classList.remove('is-active');
        
        // Remettre les autres cartes à leur taille normale
        anime({
          targets: card,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    });
  }

  // Passer à la carte suivante
  function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    activateCard(currentCardIndex);
  }

  // Démarrer la boucle automatique
  function startAutoHover() {
    stopAutoHover();
    activateCard(currentCardIndex); // Active la 1ère immédiatement
    hoverTimer = setInterval(nextCard, intervalTime);
  }

  // Pauser la boucle
  function stopAutoHover() {
    if (hoverTimer) clearInterval(hoverTimer);
  }

  // Gestion du survol par l'utilisateur (Pause temporaire)
  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      stopAutoHover();
      currentCardIndex = idx;
      activateCard(currentCardIndex);
    });

    card.addEventListener('mouseleave', () => {
      startAutoHover();
    });
  });

  // Lancer l'animation automatique
  startAutoHover();
});