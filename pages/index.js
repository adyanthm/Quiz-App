import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (router.query.error === "duplicate") {
      toast.error(
        "This nickname is already taken. Please choose another one.",
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "16px",
            color: "#e11d48",
            fontSize: "16px",
            fontWeight: "500",
          },
        }
      );
      router.replace("/", undefined, { shallow: true });
    }

    const correctSound = new Audio("/correct.mp3");
    const incorrectSound = new Audio("/incorrect.mp3");

    window.playCorrectSound = () => correctSound.play();
    window.playIncorrectSound = () => incorrectSound.play();

    return () => {
      correctSound.remove();
      incorrectSound.remove();
    };
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      router.push(`/quiz?nickname=${encodeURIComponent(nickname.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Head>
        <title>Aaradhya's Quiz</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Toaster />

      {/* Decorative Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top section shapes */}
        <div className="shape square" style={{ top: "5%", left: "10%" }}></div>
        <div
          className="shape circle"
          style={{ top: "15%", right: "15%" }}
        ></div>
        <div
          className="shape triangle"
          style={{ top: "25%", left: "20%" }}
        ></div>
        <div className="shape star" style={{ top: "10%", right: "25%" }}></div>
        <div
          className="shape rectangle"
          style={{ top: "30%", left: "40%" }}
        ></div>

        {/* Middle section shapes */}
        <div className="shape square" style={{ top: "45%", left: "5%" }}></div>
        <div className="shape circle" style={{ top: "50%", right: "8%" }}></div>
        <div
          className="shape triangle"
          style={{ top: "40%", right: "30%" }}
        ></div>
        <div className="shape star" style={{ top: "55%", left: "25%" }}></div>
        <div
          className="shape rectangle"
          style={{ top: "35%", right: "45%" }}
        ></div>

        {/* Bottom section shapes */}
        <div
          className="shape square"
          style={{ bottom: "15%", left: "15%" }}
        ></div>
        <div
          className="shape circle"
          style={{ bottom: "20%", right: "20%" }}
        ></div>
        <div
          className="shape triangle"
          style={{ bottom: "10%", left: "30%" }}
        ></div>
        <div
          className="shape star"
          style={{ bottom: "25%", right: "10%" }}
        ></div>
        <div
          className="shape rectangle"
          style={{ bottom: "30%", left: "45%" }}
        ></div>
      </div>

      {/* Logo */}
      <div className="mb-12 text-white text-5xl font-bold text-center z-10">
        Aaradhya's Quiz
      </div>

      {/* Name input form */}
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl z-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nickname"
            className="kahoot-input mb-4"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit" className="kahoot-button">
            Enter
          </button>
        </form>
      </div>

      {/* Add credit text */}
      <div className="mt-8 z-10">
        <p className="text-white/80 font-medium bg-white/10 backdrop-blur-md inline-block px-6 py-3 rounded-full shadow-lg border border-white/10">
          Designed by{" "}
          <span className="text-purple-300 font-bold">Adyanth of 8A1</span>
          <span className="text-white/60">, </span>
          <span className="text-purple-300 font-bold">Aaradhya's brother</span>
        </p>
      </div>
    </div>
  );
}
