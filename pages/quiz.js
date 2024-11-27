import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import quizData from "../quiz.json";
import { FaFire } from "react-icons/fa";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export default function Quiz() {
  const router = useRouter();
  const { nickname } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const totalQuestions = quizData.questions.length;

  useEffect(() => {
    const initializeUser = async () => {
      if (nickname) {
        const userDocRef = doc(db, "leaderboard", nickname);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setError("Nickname already exists");
          router.push("/?error=duplicate");
        } else {
          await setDoc(userDocRef, {
            nickname,
            score: 0,
            accuracy: 0,
            timestamp: new Date(),
          });
          setInitialized(true);
        }
      }
    };

    initializeUser();
  }, [nickname]);

  const colors = {
    red: "#e21b3c",
    blue: "#1368ce",
    yellow: "#d89e00",
    green: "#26890c",
  };

  const handleAnswer = async (isCorrect, selectedIndex) => {
    if (error || !initialized) return;

    setSelectedAnswer(selectedIndex);
    setShowFeedback(true);

    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    const accuracy = ((newScore / totalQuestions) * 100).toFixed(2);

    if (nickname) {
      await updateDoc(doc(db, "leaderboard", nickname), {
        score: newScore,
        accuracy: parseFloat(accuracy),
      });
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push({
          pathname: "/results",
          query: {
            score: newScore,
            nickname,
          },
        });
      }
    }, 2000);
  };

  if (!initialized && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0933] to-[#2d1052] p-8">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a0933] to-[#2d1052] p-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white">
          <p className="text-2xl mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-red-500 px-4 py-2 rounded-full text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0933] to-[#2d1052] p-4 md:p-8">
      <div className="flex justify-center items-center gap-2 mb-8 md:mb-12">
        <div className="bg-[#2a0f4c] p-2 md:p-3 rounded-full">
          <FaFire
            className={`text-xl md:text-2xl ${
              streak > 1 ? "text-orange-500" : "text-white"
            }`}
          />
        </div>
        <span className="bg-[#2a0f4c] px-4 md:px-6 py-1 md:py-2 rounded-full text-white font-bold">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      <div className="max-w-2xl md:max-w-4xl mx-auto bg-[#150628]/90 backdrop-blur-sm rounded-2xl p-6 md:p-10 mb-8 md:mb-12 shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 md:mb-12">
          {quizData.questions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {quizData.questions[currentQuestion].options.map((option, index) => {
            const colorKeys = Object.keys(colors);
            const isCorrect = option.isCorrect;
            const isSelected = selectedAnswer === index;
            const shouldDisplay = showFeedback ? isCorrect || isSelected : true;

            return (
              shouldDisplay && (
                <button
                  key={index}
                  onClick={() => handleAnswer(isCorrect, index)}
                  disabled={showFeedback}
                  className={`
                    h-20 md:h-40 rounded-2xl p-3 md:p-6 text-white text-lg md:text-2xl font-bold
                    transition-all duration-300 ease-in-out
                    flex items-center justify-center text-center
                    shadow-lg hover:shadow-xl relative
                    ${showFeedback ? "col-span-1 md:col-span-2 w-full" : ""}
                  `}
                  style={{
                    backgroundColor: showFeedback
                      ? isCorrect
                        ? "#26890c"
                        : isSelected
                        ? "#e21b3c"
                        : colors[colorKeys[index]]
                      : colors[colorKeys[index]],
                  }}
                >
                  {option.text}
                </button>
              )
            );
          })}
        </div>
      </div>

      {showFeedback &&
        !quizData.questions[currentQuestion].options[selectedAnswer]
          ?.isCorrect && (
          <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-xl md:text-2xl font-bold py-4 md:py-6 text-center transform animate-slide-up">
            Incorrect
          </div>
        )}
    </div>
  );
}
