// ============================
// ÉLÉMENTS HTML
// ============================
const bouton = document.getElementById("bonjour");
const message = document.getElementById("message");
const resultatElement = document.getElementById("resultat");
const nombre1 = document.getElementById("nombre1");
const nombre2 = document.getElementById("nombre2");
const boutonCalculer = document.getElementById("calculer");
const boutonEffacer = document.getElementById("effacer");
const modeSombre = document.getElementById("modeSombre");
const operation = document.getElementById("operation");
const historique = document.getElementById("historique");
const viderHistorique = document.getElementById("viderHistorique");
const titreHistorique = document.getElementById("titreHistorique");

// ============================
// VARIABLES
// ============================

let clique = 0;
let listeCalculs = JSON.parse(localStorage.getItem("historiqueCalculs")) || [];
// ============================
// FONCTIONS
// ============================

function afficherMessage() {
    if (clique === 1) {
        message.textContent = "Bonjour Aymard !";
    } else if (clique === 2) {
        message.textContent = "Bienvenue sur mon site !";
    } else {
        message.textContent = "Merci de ta visite !";
        clique = 0;
    }
}

function saluer(nom) {
    message.textContent = "Bienvenue, " + nom + " !";
}

function additionner(a, b) {
    return a + b;
}
function soustraire(a, b) {
    return a - b;
}

function multiplier(a, b) {
    return a * b;
}

function diviser(a, b) {
    if (b === 0) {
        return null;
    }

    return a / b;
}
function effectuerCalcul(a, b, operation) {

    if (operation === "addition") {
        return additionner(a, b);

    } else if (operation === "soustraction") {
        return soustraire(a, b);

    } else if (operation === "multiplication") {
        return multiplier(a, b);

    } else if (operation === "division") {
        return diviser(a, b);
    }
}
function afficherHistorique() {
    historique.innerHTML = "";

    listeCalculs.forEach(function(calcul, index) {
        if (index === listeCalculs.length - 1) {
            historique.innerHTML += '<p class="dernier-calcul">' + calcul.nombre1 + " " + calcul.operation + " " + calcul.nombre2 + " = " + calcul.resultat + '</p>';
        } else {
            historique.innerHTML += "<p>" + calcul.nombre1 + " " + calcul.operation + " " + calcul.nombre2 + " = " + calcul.resultat + "</p>";
        }
    });

    if (listeCalculs.length <= 1) {
        titreHistorique.textContent = "Historique (" + listeCalculs.length + " calcul)";
    } else {
        titreHistorique.textContent = "Historique (" + listeCalculs.length + " calculs)";
    }
}

// ============================
// BOUTON MESSAGE
// ============================

bouton.addEventListener("click", function() {
    clique = clique + 1;

    bouton.classList.toggle("bouton-actif");

    if (bouton.classList.contains("bouton-actif")) {
        bouton.textContent = "Activé ✓";
    } else {
        bouton.textContent = "Clique ici";
    }

    afficherMessage();

    message.style.color = "red";
});

// ============================
// CALCULATRICE
// ============================
boutonCalculer.addEventListener("click", function() {

    if (nombre1.value === "" || nombre2.value === "") {
    resultatElement.textContent = "Veuillez entrer les deux nombres.";
    resultatElement.classList.add("erreur");
    return;
}

    let premierNombre = Number(nombre1.value);
    let deuxiemeNombre = Number(nombre2.value);
if (isNaN(premierNombre) || isNaN(deuxiemeNombre)) {
    resultatElement.textContent = "Veuillez entrer des nombres valides.";
    return;
}

    let choix = operation.value;
let symbole;

if (choix === "addition") {
    symbole = "+";
} else if (choix === "soustraction") {
    symbole = "−";
} else if (choix === "multiplication") {
    symbole = "×";
} else if (choix === "division") {
    symbole = "÷";
}

    nouveauResultat = effectuerCalcul(
    premierNombre,
    deuxiemeNombre,
    choix
);

if (nouveauResultat === null) {
    resultatElement.textContent = "Impossible de diviser par zéro.";
    return;
}

    resultatElement.textContent = "Le résultat est : " + nouveauResultat;

    let calcul = {
    nombre1: premierNombre,
    nombre2: deuxiemeNombre,
    operation: choix,
    resultat: nouveauResultat
};

listeCalculs.push(calcul);
localStorage.setItem("historiqueCalculs", JSON.stringify(listeCalculs));

    afficherHistorique();

if (listeCalculs.length <= 1) {
    titreHistorique.textContent = "Historique (" + listeCalculs.length + " calcul)";
} else {
    titreHistorique.textContent = "Historique (" + listeCalculs.length + " calculs)";
}

});

// ============================
// BOUTON EFFACER
// ==========================
bouton.addEventListener("click", () => {
    nombre1.value = "";
    nombre2.value = "";
    resultatElement.textContent = "";
    operation.value = "addition";
});

// ============================
// MODE SOMBRE
// ============================

modeSombre.addEventListener("click", function() {
    document.body.classList.toggle("mode-sombre");
});

// ============================
// VIDER L'HISTORIQUE
// ============================

viderHistorique.addEventListener("click", function() {

    let confirmation = confirm("Voulez-vous vraiment supprimer l'historique ?");

    if (confirmation) {
        listeCalculs = [];
     localStorage.removeItem("historiqueCalculs");
        historique.innerHTML = "";
titreHistorique.textContent = "Historique (0 calcul)";
    }

});

console.log("SCRIPT CHARGÉ");

afficherHistorique();

const projetsTest = [
    { nom: "Mon premier site web", termine: true },
    { nom: "Ma page GitHub", termine: true },
    { nom: "Ma calculatrice", termine: false }
];

console.log(projetsTest);

const projetsTermines = projetsTest.filter(projet => projet.termine);

console.log(projetsTermines);