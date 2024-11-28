import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Define the total number of questions
const totalQuestions = 12; // Updated from 10 to 12

export default function Results() {
  const router = useRouter();
  const { score, nickname } = router.query;
  const [leaderboard, setLeaderboard] = useState([]);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [userRank, setUserRank] = useState("N/A");
  const [zoom, setZoom] = useState("80%");

  useEffect(() => {
    const handleResize = () => {
      setZoom(window.innerWidth < 768 ? "60%" : "80%");
    };

    // Set initial zoom
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch ALL participants, no limit
        const q = query(
          collection(db, "leaderboard"),
          orderBy("score", "desc") // Just sort by score, no limit
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setLeaderboard(data);

        // Calculate rank
        const rankIndex = data.findIndex(
          (player) => player.nickname === nickname
        );
        setUserRank(rankIndex !== -1 ? rankIndex + 1 : "N/A");

        // Calculate average accuracy
        const totalAccuracy = data.reduce(
          (acc, player) => acc + player.accuracy,
          0
        );
        const avgAccuracy = (totalAccuracy / data.length).toFixed(2);
        setAverageAccuracy(avgAccuracy);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [nickname]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a0933] to-[#2d1052]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: "url('/night-sky-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10" style={{ zoom }}>
        <div className="p-4 md:p-8 max-w-4xl md:max-w-5xl mx-auto">
          {/* Stats Row */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <div className="bg-[#1a0933]/80 backdrop-blur-md rounded-xl p-4 md:p-6 text-center flex-1">
              <div className="text-xl md:text-2xl text-white mb-2">
                Average Accuracy
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {averageAccuracy}%
              </div>
            </div>

            <div className="bg-[#1a0933]/80 backdrop-blur-md rounded-xl p-4 md:p-6 text-center flex-1">
              <div className="text-xl md:text-2xl text-white mb-2">
                Your Score
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {score}
              </div>
            </div>

            <div className="bg-[#1a0933]/80 backdrop-blur-md rounded-xl p-4 md:p-6 text-center flex-1">
              <div className="text-xl md:text-2xl text-white mb-2">
                Your Accuracy
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {((score / totalQuestions) * 100).toFixed(2)}%
              </div>
            </div>

            <div className="bg-[#1a0933]/80 backdrop-blur-md rounded-xl p-4 md:p-6 text-center flex-1">
              <div className="text-xl md:text-2xl text-white mb-2">
                Your Rank
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                #{userRank}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-[#1a0933]/80 backdrop-blur-md rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <span className="text-white/80">
                All Participants ({leaderboard.length})
              </span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-white">
                <thead className="sticky top-0 bg-[#1a0933]">
                  <tr className="text-white/60">
                    <th className="text-left p-4">Rank</th>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Score</th>
                    <th className="text-left p-4">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr
                      key={index}
                      className={`border-b border-white/10 ${
                        player.nickname === nickname ? "bg-white/10" : ""
                      }`}
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{player.nickname}</td>
                      <td className="p-4">{player.score}</td>
                      <td className="p-4">{player.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add the credit text below the leaderboard */}
          <div className="mt-8 text-center">
            <p className="text-white/80 font-medium bg-[#1a0933]/60 backdrop-blur-md inline-block px-6 py-3 rounded-full shadow-lg border border-white/10">
              Designed by{" "}
              <span className="text-purple-300 font-bold">
                Adyanth of 8th A1
              </span>
              <span className="text-white/60">, </span>
              <span className="text-purple-300 font-bold">
                Aaradhya's brother
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
