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