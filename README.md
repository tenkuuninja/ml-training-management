### Machine Learning System Managament

Setup & run Frontend
- Download nodejs and install: [https://nodejs.org/en/download](https://nodejs.org/en/download)
- `cd end-user`
- `npm install`
- `npm run dev`
- Open http://localhost:3000 on broswer

Setup & run Training service
- Download python and install: [https://www.python.org/downloads](https://www.python.org/downloads)
- `cd training-service`
- `pip install flask scikit-learn numpy pandas`
- `python app.py`

Setup & run Management service
- Download jdk and install: [https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html)
- Download eclipse and install: [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/)
- Import `management-service/MachineLearningAI/` project in to eclipse
- Right click to file `src/main/java/com/example/NQH/MachineLearningAiApplication.java`
- Select `Run as`
- Click `Spring booot`
