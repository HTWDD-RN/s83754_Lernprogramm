"use strict";
// main.js: Initialisiert das Quiz und steuert UI-Events
// =======================
document.addEventListener('DOMContentLoaded', function () {
    // ===== Model-View-Presenter initialisieren =====
    const model = new QuizModel();
    const view = new QuizView();
    const presenter = new QuizPresenter(model, view);

    // ===== DOM-Referenzen auf Kategorie- und Modusauswahl =====
    const categoryLinks = document.querySelectorAll('input[name="category"]');
    const modeLinks = document.querySelectorAll('input[name="mode"]');

    // ===== Liest aktuell gewählte Kategorie aus (z. B. math, tech, general) =====
    function getSelectedCategory() {
        return document.querySelector('input[name="category"]:checked').value;
    }

    // ===== Liest den aktuell gewählten Modus aus (offline / online) =====
    function getSelectedMode() {
        return document.querySelector('input[name="mode"]:checked').value;
    }

    // ===== Lädt das Quiz basierend auf aktueller Auswahl neu =====
    function loadSelectedQuiz() {
        const category = getSelectedCategory();
        const mode = getSelectedMode();

        // Nur Mathe darf Online-Modus nutzen
        if (mode === 'online' && category !== 'math') {
            alert("Online-Modus ist nur für die Kategorie 'Mathe' verfügbar.");
            // Setze Modus auf Offline zurück
            document.querySelector('input[name="mode"][value="offline"]').checked = true;
            model.useExternal = false;
        } else {
            model.useExternal = (mode === 'online');
        }

        presenter.loadQuizzes(category);
    }

    // ===== Event Listener für Kategorie-Auswahl =====
    categoryLinks.forEach(link => {
        link.addEventListener('change', loadSelectedQuiz);
    });

    // ===== Event Listener für Modus-Auswahl =====
    modeLinks.forEach(link => {
        link.addEventListener('change', loadSelectedQuiz);
    });

    // ===== Quiz wird beim Start direkt einmal geladen =====
    loadSelectedQuiz();
});
