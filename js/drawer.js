// Fonction pour inclure du HTML externe
async function loadComponent(elementId, filePath) {
  const container = document.getElementById(elementId);
  if (!container) return;
  
  const response = await fetch(filePath);
  
  const html = await response.text();
  container.innerHTML = html;
}

// Chargement des composants et initialisation
async function initLayout() {
  // 1. Inserer la navbar et le drawer
  await Promise.all([
    loadComponent('drawer-container', 'drawer.html')
  ]);

  // 2. Attacher les événements une fois le HTML injecté
  const drawer = document.getElementById('drawer');

}

document.addEventListener('DOMContentLoaded', initLayout);