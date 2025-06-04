
// QuizPresenter: verbindet Model und View
// =======================
class QuizPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Event-Handler für Abgabe-Button registrieren
        this.view.bindSubmitButton(this.handleSubmit.bind(this));
    }

    // Lädt Fragen einer bestimmten Kategorie
    // =======================
    async loadQuizzes(category) {
        await this.model.fetchQuizzes(category);

        // UI zurücksetzen (Frage, Feedback etc. löschen)
        this.view.resetUI();

        // Erste Frage anzeigen
        this.renderQuiz();
    }

    // Verarbeitet die Antwort nach Button-Klick
    // =======================
    handleSubmit() {
        const selectedOption = this.view.getSelectedOption();

        // Keine Auswahl getroffen
        if (selectedOption === null) {
            this.view.displayFeedback('Bitte eine Option auswählen.');
            return;
        }

        // Antwort prüfen & Feedback anzeigen
        const isCorrect = this.model.submitAnswer(selectedOption);
        this.view.displayFeedback(isCorrect ? 'Richtig!' : 'Falsch!');

        // Fortschrittsbalken aktualisieren
        const progress = this.model.getProgress();
        this.view.updateProgress(progress.current, progress.total);

        // Quiz abgeschlossen?
        if (progress.current >= 10) {
            this.view.showCompletion(`Quiz abgeschlossen! Du hast ${progress.correct} von 10 richtig.`);
        } else {
            this.renderQuiz();
        }
    }

    // Zeigt die aktuelle Frage an
    // =======================
    renderQuiz() {
        const currentQuiz = this.model.getCurrentQuiz();

        // Keine Fragen mehr vorhanden
        if (!currentQuiz) {
            this.view.showCompletion("Alle Fragen sind beantwortet. Vielen Dank!");
            return;
        }

        // Quizfrage anzeigen
        this.view.render(currentQuiz);
    }
}
