"use strict";

// QuizModel: verwaltet die Datenlogik und das Laden/Verarbeiten von Fragen
class QuizModel {
    constructor() {
        this.quizzes = [];             // Array aller geladenen Quizfragen
        this.currentQuizIndex = 0;     // Index der aktuellen Frage
        this.correctAnswers = 0;       // Anzahl richtiger Antworten
        this.wrongAnswers = 0;         // Anzahl falscher Antworten
        this.useExternal = false;      // Legt fest, ob der externe Server genutzt wird
    }

    // Holt Fragen abhängig von der gewählten Kategorie
    async fetchQuizzes(category) {
        if (this.useExternal) {
            // === Online-Modus ===
            const maxTries = 200;
            let tries = 0;
            const quizzes = [];
            const seenIds = new Set();     // Vermeidet doppelte IDs
            const seenTexts = new Set();   // Vermeidet doppelte Texte

            // Versuche bis zu 200 mal, 10 unterschiedliche Mathefragen zu laden
            while (quizzes.length < 10 && tries < maxTries) {
                const randomId = this.generateRandomIds(2, 220, 1)[0];

                if (seenIds.has(randomId)) {
                    tries++;
                    continue;
                }

                seenIds.add(randomId);
                const url = `https://idefix.informatik.htw-dresden.de:8888/api/quizzes/${randomId}`;

                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ' + btoa('test@gmail.com:secret')
                        }
                    });

                    if (response.ok) {
                        const quiz = await response.json();

                        // Nur "maths"-Fragen akzeptieren
                        if (quiz.title?.toLowerCase() === 'maths') {
                            const normalizedText = quiz.text?.trim().toLowerCase();

                            // Vermeide doppelte Fragetexte
                            if (!seenTexts.has(normalizedText)) {
                                seenTexts.add(normalizedText);
                                quiz.category = 'math';

                                // Bestimme die korrekte Antwort
                                quiz.correctIndex = quiz.answer?.[0] ?? 0;

                                // Mische die Antwortoptionen
                                this.shuffleOptions(quiz);

                                quizzes.push(quiz);
                            } else {
                                console.log(`⚠️ Duplikat erkannt (Text):`, quiz.text);
                            }
                        }
                    }
                } catch (e) {
                    console.error(`❌ Fehler bei ID ${randomId}:`, e);
                }

                tries++;
            }

            this.quizzes = quizzes;
            console.log("🧾 Fertig. Anzahl eindeutiger Mathefragen:", quizzes.length);

            if (this.quizzes.length === 0) {
                alert("Es konnten keine Mathefragen vom Server geladen werden.");
            }

        } else {
            // === Offline-Modus ===
            const response = await fetch('./local_quizzes.json');
            const data = await response.json();
            const raw = data[category] || [];

            // Mische Fragen und deren Antwortoptionen
            this.quizzes = this.shuffleArray(raw);
            this.quizzes.forEach(quiz => {
                this.shuffleOptions(quiz);
            });
        }

        // Zurücksetzen des Quiz-Zustands
        this.reset();
    }

    // Mischt die Antwortoptionen einer Frage und aktualisiert den korrekten Index
    shuffleOptions(quiz) {
        const correctAnswer = quiz.options[quiz.correctIndex];
        quiz.options = quiz.options.slice().sort(() => Math.random() - 0.5);
        quiz.correctIndex = quiz.options.indexOf(correctAnswer);
    }

    // Hilfsfunktion zum Mischen eines Arrays
    shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    // Erzeugt eine Menge zufälliger IDs im Bereich [min, max]
    generateRandomIds(min, max, count) {
        const ids = new Set();
        while (ids.size < count) {
            ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(ids);
    }

    // Setzt den Quizstatus zurück
    reset() {
        this.currentQuizIndex = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
    }

    // Gibt die aktuelle Frage zurück
    getCurrentQuiz() {
        return this.quizzes[this.currentQuizIndex];
    }

    // Bewertet die gegebene Antwort
    submitAnswer(selectedOptionIndex) {
        const currentQuiz = this.getCurrentQuiz();
        if (!currentQuiz || !currentQuiz.options) {
            console.error('Quiz data is incomplete:', currentQuiz);
            return false;
        }

        const isCorrect = selectedOptionIndex === currentQuiz.correctIndex;

        // Statistiken aktualisieren
        if (isCorrect) {
            this.correctAnswers++;
        } else {
            this.wrongAnswers++;
        }

        // Zum nächsten Quiz wechseln
        this.currentQuizIndex++;
        return isCorrect;
    }

    // Gibt den Fortschritt des Quizzes zurück
    getProgress() {
        return {
            correct: this.correctAnswers,
            wrong: this.wrongAnswers,
            current: this.currentQuizIndex,
            total: this.quizzes.length
        };
    }
}
