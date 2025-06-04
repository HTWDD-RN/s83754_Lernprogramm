// =======================
// QuizView: Steuert die Anzeige im Browser
// =======================
class QuizView {
    constructor() {
        // Referenzen auf relevante DOM-Elemente
        this.questionElement = document.getElementById('question');
        this.optionsElement = document.getElementById('options');
        this.feedbackElement = document.getElementById('feedback');
        this.completionElement = document.getElementById('completion');
        this.submitButton = document.getElementById('submit-answer');
        this.progressBar = document.getElementById('progress-bar');

        // Überprüfung: wurden alle Elemente korrekt gefunden?
        if (!this.questionElement || !this.optionsElement || !this.submitButton || !this.feedbackElement || !this.completionElement || !this.progressBar) {
            console.error('Fehlende DOM-Elemente!');
        }
    }

    // =======================
    // Zeigt eine Quizfrage mit Optionen an
    // =======================
    render(quiz) {
        if (!quiz || !quiz.text || !quiz.options) {
            console.error('Ungültige Quizdaten:', quiz);
            this.questionElement.innerHTML = 'Keine Frage verfügbar';
            return;
        }

        // Vorherige Feedbacks löschen
        this.feedbackElement.innerHTML = '';
        this.completionElement.innerHTML = '';
        this.questionElement.innerHTML = '';

        // Frage anzeigen (ggf. mit KaTeX)
        this.renderQuizText(quiz.text, quiz.category, null, this.questionElement);

        // Antwortmöglichkeiten anzeigen
        this.optionsElement.innerHTML = '';
        quiz.options.forEach((option, index) => {
            let optionElement = document.createElement('li');
            let radioInput = document.createElement('input');
            radioInput.type = "radio";
            radioInput.name = "option";
            radioInput.value = index;

            let optionText = document.createElement('span');
            this.renderQuizText(option, quiz.category, null, optionText);

            optionElement.appendChild(radioInput);
            optionElement.appendChild(optionText);
            this.optionsElement.appendChild(optionElement);
        });
    }

    // =======================
    // Stellt Text im Quiz dar (ggf. KaTeX für Mathe)
    // =======================
    renderQuizText(text, category, source, element) {
        if (category === 'math') {
            try {
                element.innerHTML = katex.renderToString(text, { throwOnError: false });
            } catch (error) {
                console.error('KaTeX Fehler:', error);
                element.innerHTML = text;
            }
        } else {
            element.innerHTML = text;
        }
    }

    // =======================
    // Gibt den Index der gewählten Option zurück
    // =======================
    getSelectedOption() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        return selectedOption ? parseInt(selectedOption.value) : null;
    }

    // =======================
    // Zeigt ein Feedback (z. B. "Richtig!" oder "Falsch!")
    // =======================
    displayFeedback(message) {
        this.feedbackElement.innerHTML = message;
    }

    // =======================
    // Verbindet den Submit-Button mit einer Funktion
    // =======================
    bindSubmitButton(handler) {
        this.submitButton.addEventListener('click', handler);
    }

    // =======================
    // Zeigt Abschlussmeldung und beendet das Quiz-UI
    // =======================
    showCompletion(message) {
        this.completionElement.innerHTML = message;
        this.questionElement.innerHTML = '';
        this.optionsElement.innerHTML = '';
        this.submitButton.style.display = 'none';
    }

    // =======================
    // Aktualisiert den Fortschrittsbalken
    // =======================
    updateProgress(currentIndex, total) {
        if (this.progressBar) {
            this.progressBar.max = total;
            this.progressBar.value = currentIndex;
        }
    }

    // =======================
    // Setzt das UI zurück für neue Kategorie oder Quizstart
    // =======================
    resetUI() {
        this.feedbackElement.innerHTML = '';
        this.completionElement.innerHTML = '';
        this.submitButton.style.display = 'inline-block';
        if (this.progressBar) {
            this.progressBar.value = 0;
        }
    }
}
