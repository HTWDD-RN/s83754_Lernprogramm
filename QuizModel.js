// =======================
// QuizModel: Datenlogik
// =======================
class QuizModel {
    constructor() {
        // Quiz-Daten
        this.quizzes = [];

        // Aktuelle Position im Quiz
        this.currentQuizIndex = 0;

        // Zähler für richtige/falsche Antworten
        this.correctAnswers = 0;
        this.wrongAnswers = 0;

        // Modus: lokal oder extern (Server)
        this.useExternal = false;
    }

    // =======================
    // Quizdaten laden
    // =======================
    async fetchQuizzes(category) {
        if (this.useExternal) {
            // Nur Mathefragen sind extern erlaubt
            if (category !== 'math') {
                alert("Im Online-Modus sind nur Mathe-Fragen verfügbar.");
                this.quizzes = [];
                return;
            }

            const quizzes = [];
            const maxTries = 200;
            let tries = 0;

            // Versuche, bis zu 10 passende externe Fragen zu laden
            while (quizzes.length < 10 && tries < maxTries) {
                const randomId = this.generateRandomIds(2, 222, 1)[0];
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
                        console.log(`Versuch ${tries + 1}: Frage geladen ->`, quiz.text);
                        console.log("Kategorie passt:", matches);

                        if (matches) {
                            quiz.category = category;
                            this.shuffleOptions(quiz);
                            quizzes.push(quiz);
                        }
                    }
                } catch (e) {
                    console.error('Fehler beim Laden:', e);
                }
                tries++;
            }

            this.quizzes = quizzes;

            if (this.quizzes.length === 0) {
                alert("Es konnten keine passenden Mathe-Fragen vom Server geladen werden.");
                console.warn("Keine passenden Online-Fragen zur Kategorie 'math' gefunden.");
            }
        } else {
            // Lokaler Modus: lade aus local_quizzes.json
            const response = await fetch('./local_quizzes.json');
            const data = await response.json();
            const raw = data[category] || [];
            this.quizzes = this.shuffleArray(raw);
            this.quizzes.forEach(quiz => {
                this.shuffleOptions(quiz);
            });
        }

        // Quiz zurücksetzen
        this.reset();
    }

    // =======================
    // Kategorietest (für extern geladene Fragen)
    // =======================
    isMatchingCategory(quiz, category) {
        const text = quiz.text.toLowerCase();
        if (category === 'math') {
            return /integral|ableitung|wurzel|funktion|x|pi|fakultät|grenzwert|dreieck|quadratwurzel/i.test(text);
        }
        return false;
    }

    // =======================
    // Antwortoptionen mischen
    // =======================
    shuffleOptions(quiz) {
        const correctAnswer = quiz.options[quiz.correctIndex];
        quiz.options = quiz.options.slice().sort(() => Math.random() - 0.5);
        quiz.correctIndex = quiz.options.indexOf(correctAnswer);
    }

    // =======================
    // Allgemeines Array-Mischen
    // =======================
    shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    // =======================
    // Zufällige IDs erzeugen
    // =======================
    generateRandomIds(min, max, count) {
        const ids = new Set();
        while (ids.size < count) {
            ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(ids);
    }

    // =======================
    // Quizzustand zurücksetzen
    // =======================
    reset() {
        this.currentQuizIndex = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
    }

    // =======================
    // Aktuelle Frage zurückgeben
    // =======================
    getCurrentQuiz() {
        return this.quizzes[this.currentQuizIndex];
    }

    // =======================
    // Antwort auswerten
    // =======================
    submitAnswer(selectedOptionIndex) {
        const currentQuiz = this.getCurrentQuiz();
        if (!currentQuiz || !currentQuiz.options) {
            console.error('Quiz data is incomplete:', currentQuiz);
            return false;
        }
        const isCorrect = selectedOptionIndex === currentQuiz.correctIndex;
        if (isCorrect) {
            this.correctAnswers++;
        } else {
            this.wrongAnswers++;
        }
        this.currentQuizIndex++;
        return isCorrect;
    }

    // =======================
    // Fortschritt des Nutzers abrufen
    // =======================
    getProgress() {
        return {
            correct: this.correctAnswers,
            wrong: this.wrongAnswers,
            current: this.currentQuizIndex,
            total: this.quizzes.length
        };
    }
}
