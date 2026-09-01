    const WHATSAPP_NUMBER = "237652944054"; // Numéro LUCARN
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8o_xqLws7Q_a03Ktroh8sqWMV2loLv7J3GDiTIy7nu2Z2lQU9PT6OpZE3HaeG1KLfyg/exec";

    let currentStep = 1;

    // Mise à jour du Prix en direct
    const serviceSelect = document.getElementById('service');
    const totalPriceDisplay = document.getElementById('totalPrice');

    serviceSelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const price = selectedOption.getAttribute('data-price') || 0;
        totalPriceDisplay.textContent = `${Number(price).toLocaleString('fr-FR')} FCFA`;
    });

    // Passage à l'étape suivante avec contrôle de saisie obligatoire
    function nextStep(step) {
        if (currentStep === 1) {
            if (!serviceSelect.value) {
                alert("Veuillez sélectionner une prestation avant de continuer.");
                return;
            }
        }
        if (currentStep === 2) {
            const location = document.getElementById('location').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            if (!location || !date || !time) {
                alert("Veuillez remplir le quartier, la date et l'heure.");
                return;
            }
            // Générer le petit récapitulatif pour l'étape 3
            updateSummary();
        }

        // Cacher l'étape actuelle, afficher la nouvelle
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        document.getElementById(`step-${step}`).classList.remove('hidden');

        currentStep = step;
        updateUI();
    }

    // Retour à l'étape précédente
    function prevStep(step) {
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        document.getElementById(`step-${step}`).classList.remove('hidden');
        currentStep = step;
        updateUI();
    }

    // Mise à jour de la barre de progression
    function updateUI() {
        const progressBar = document.getElementById('progressBar');
        if (currentStep === 1) progressBar.style.width = '33%';
        if (currentStep === 2) progressBar.style.width = '66%';
        if (currentStep === 3) progressBar.style.width = '100%';

        // Mettre en gras l'étape actuelle dans la légende
        [1, 2, 3].forEach(i => {
            const label = document.getElementById(`label-step-${i}`);
            if (i <= currentStep) {
                label.classList.add('text-green-600', 'font-bold');
            } else {
                label.classList.remove('text-green-600', 'font-bold');
            }
        });
    }

    function updateSummary() {
        const service = serviceSelect.value;
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        document.getElementById('summaryText').innerHTML = 
            `<b>Prestation :</b> ${service}<br><b>Lieu :</b> ${location}<br><b>Rendez-vous :</b> ${date} à ${time}`;
    }

    async function saveBookingToSheets(data) {
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement Sheets :", err);
    }
}

    // Envoi final vers WhatsApp
    async function sendToWhatsApp() {
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;

        if (!fullname || !phone) {
            alert("Veuillez renseigner votre nom et votre numéro de téléphone.");
            return;
        }

        const service = serviceSelect.value;
        const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const bookingId = "LUC" + Math.floor(1000 + Math.random() * 9000);

        const bookingData = {
        id: bookingId,
        vehicleType: "Berline",
        service,
        price,
        location,
        date,
        time,
        fullname,
        phone
            };

    // Envoi silencieux vers Google Sheets
        await saveBookingToSheets(bookingData);

        const message = `Bonjour LUCARN SERVICES SARL !\n\n` +
            `Je souhaite valider ma réservation *#${bookingId}* :\n\n` +
            ` *Prestation :* ${service}\n` +
            ` *Montant estimé :* ${Number(price).toLocaleString('fr-FR')} FCFA\n` +
            ` *Client :* ${fullname} (${phone})\n` +
            ` *Lieu / Repère :* ${location}\n` +
            ` *Date & Heure :* ${date} à ${time}\n\n` +
            `Merci de me transmettre le numéro Mobile Money (OM / MoMo) pour régler l'acompte.`;

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

///------------------------------------------------------------------------------

    let currentStep2 = 1;

    const serviceSelect2 = document.getElementById('service2');
    const totalPriceDisplay2 = document.getElementById('totalPrice2');
    console.log(serviceSelect2, totalPriceDisplay2);
    
    serviceSelect2.addEventListener('change', (e) => {
        const selectedOption2 = e.target.options[e.target.selectedIndex];
        const price2 = selectedOption2.getAttribute('data-price2') || 0;
        totalPriceDisplay2.textContent = `${Number(price2).toLocaleString('fr-FR')} FCFA`;
    });

    // Passage à l'étape suivante avec contrôle de saisie obligatoire
    function nextStep2(step2) {
        if (currentStep2 === 1) {
            if (!serviceSelect2.value) {
                alert("Veuillez sélectionner une prestation avant de continuer.");
                console.log(serviceSelect2.value);
                
                return;
            }
        }
        if (currentStep2 === 2) {
            const location2 = document.getElementById('location2').value;
            const date2 = document.getElementById('date2').value;
            const time2 = document.getElementById('time2').value;
            console.log("choix : " + location2, date2, time2);
            

            if (!location2 || !date2 || !time2) {
                alert("Veuillez remplir le quartier, la date et l'heure.");
                return;
            }
            // Générer le petit récapitulatif pour l'étape 3
            updateSummary2();
        }

        // Cacher l'étape actuelle, afficher la nouvelle
        document.getElementById(`step2-${currentStep2}`).classList.add('hidden');
        document.getElementById(`step2-${step2}`).classList.remove('hidden');

        currentStep2 = step2;
        updateUI2();
    }

    // Retour à l'étape précédente
    function prevStep2(step2) {
        document.getElementById(`step2-${currentStep2}`).classList.add('hidden');
        document.getElementById(`step2-${step2}`).classList.remove('hidden');
        currentStep2 = step2;
        updateUI2();
    }

    // Mise à jour de la barre de progression
    function updateUI2() {
        const progressBar2 = document.getElementById('progressBar2');
        if (currentStep2 === 1) progressBar2.style.width = '33%';
        if (currentStep2 === 2) progressBar2.style.width = '66%';
        if (currentStep2 === 3) progressBar2.style.width = '100%';

        // Mettre en gras l'étape actuelle dans la légende
        [1, 2, 3].forEach(i => {
            const label2 = document.getElementById(`label-step-${i}`);
            if (i <= currentStep2) {
                label2.classList.add('text-green-600', 'font-bold');
            } else {
                label2.classList.remove('text-green-600', 'font-bold');
            }
        });
    }

    function updateSummary2() {
        const service2 = serviceSelect2.value;
        const location2 = document.getElementById('location2').value;
        const date2 = document.getElementById('date2').value;
        const time2 = document.getElementById('time2').value;
        
        document.getElementById('summaryText2').innerHTML = 
            `<b>Prestation :</b> ${service2}<br><b>Lieu :</b> ${location2}<br><b>Rendez-vous :</b> ${date2} à ${time2}`;
    }

    // Envoi final vers WhatsApp
    async function sendToWhatsApp2() {
        const fullname2 = document.getElementById('fullname2').value;
        const phone2 = document.getElementById('phone2').value;

        if (!fullname2 || !phone2) {
            alert("Veuillez renseigner votre nom et votre numéro de téléphone.");
            return;
        }

        const service2 = serviceSelect2.value;
        const selectedOption2 = serviceSelect2.options[serviceSelect2.selectedIndex];
        const price2 = selectedOption2.getAttribute('data-price2');
        const location2 = document.getElementById('location2').value;
        const date2 = document.getElementById('date2').value;
        const time2 = document.getElementById('time2').value;

        const bookingId = "LUC" + Math.floor(1000 + Math.random() * 9000);

        const bookingData = {
        id: bookingId,
        vehicleType: "SUV / 4 x 4",
        service,
        price,
        location,
        date,
        time,
        fullname,
        phone
            };

    // Envoi silencieux vers Google Sheets
         await saveBookingToSheets(bookingData);

        const message2 = `Bonjour LUCARN SERVICES SARL !\n\n` +
            `Je souhaite valider ma réservation *#${bookingId2}* :\n\n` +
            ` *Prestation :* ${service2}\n` +
            ` *Montant estimé :* ${Number(price2).toLocaleString('fr-FR')} FCFA\n` +
            ` *Client :* ${fullname2} (${phone})\n` +
            ` *Lieu / Repère :* ${location2}\n` +
            ` *Date & Heure :* ${date2} à ${time2}\n\n` +
            `Merci de me transmettre le numéro Mobile Money (OM / MoMo) pour régler l'acompte.`;

        const whatsappUrl2 = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message2)}`;
        window.open(whatsappUrl2, '_blank');
    }


 function sendToWhatsApp3() {

        const message3 = `Bonjour LUCARN SERVICES SARL !\n\n` +
            `Je souhaite souscrire a un abonnement mensuel` 

        const whatsappUrl3 = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message3)}`;
        window.open(whatsappUrl3, '_blank');
    }





    document.addEventListener(
    'DOMContentLoaded', () =>{
        const links = document.querySelectorAll(".menu-link1")
        const sections = document.querySelectorAll(".tab_content")

        links.forEach(link =>{
            link.addEventListener("click", (event) =>{
                event.preventDefault();

                const targetId = link.getAttribute("data_target")
                console.log(targetId);
                console.log(document.getElementById(targetId))
                

                links.forEach(l => l.classList.remove("active"))
                sections.forEach(section => section.classList.remove("active"))
                

                link.classList.add("active");
                const targetSection = document.getElementById(targetId)
                console.log(targetSection);
                
                if (targetSection) {
                    targetSection.classList.add("active");
                }
            })
        })
    }
)