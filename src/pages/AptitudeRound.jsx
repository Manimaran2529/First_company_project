import { useState, useEffect } from "react";

export default function AptitudeRound() {

  const [domain, setDomain] = useState("Data Science");
  const [cutoff, setCutoff] = useState(60);
  const [candidates, setCandidates] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [nextRound, setNextRound] = useState("Technical");
  const [nextDate, setNextDate] = useState("");
  const [nextTime, setNextTime] = useState("");

  // LOAD DATA
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("candidates")) || [];

    const filtered = data
      .filter(c => c.status === "Selected" && c.domain === domain)
      .map(c => ({
        ...c,
        score: Math.floor(Math.random() * 100)
      }));

    setCandidates(filtered);
  }, [domain]);

  const passed = candidates.filter(c => c.score >= cutoff);
  const failed = candidates.filter(c => c.score < cutoff);

  const sendNextRoundMail = () => {
    if (!nextDate || !nextTime) {
      alert("Enter date & time");
      return;
    }

    passed.forEach(c => {
      console.log(`Mail sent to ${c.email}`);
    });

    alert("Next round mail sent!");
    setShowModal(false);
  };

  const sendRejectionMail = () => {
    failed.forEach(c => {
      console.log(`Rejected mail sent to ${c.email}`);
    });

    alert("Rejection mail sent!");
  };

  return (
    <div className="flex-1 p-10">

      <h1 className="text-3xl font-semibold mb-6">Aptitude Round</h1>

      {/* TOP CONTROLS */}
      <div className="flex gap-6 mb-6">

        <div className="bg-[#111827] p-4 rounded-xl w-[250px]">
          <label>Domain</label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full mt-2 p-2 bg-gray-800 rounded"
          >
            <option>Web</option>
            <option>ML</option>
            <option>Data Science</option>
          </select>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl w-[200px]">
          <label>Cutoff</label>
          <input
            type="number"
            value={cutoff}
            onChange={(e) => setCutoff(e.target.value)}
            className="w-full mt-2 p-2 bg-gray-800 rounded"
          />
        </div>

      </div>

      {/* PASSED TABLE */}
      <div className="mb-8 bg-[#111827] p-6 rounded-xl border border-green-500">

        <h2 className="text-green-400 mb-4 text-lg">
          Passed Candidates ({passed.length})
        </h2>

        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="text-left">Name</th>
              <th>Email</th>
              <th>Marks</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {passed.map((c, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td className="text-green-400 font-semibold">{c.score}</td>
                <td>
                  <a
                    href={c.resume}
                    target="_blank"
                    className="text-blue-400"
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-green-500 px-4 py-2 rounded"
        >
          Send Next Round Mail ({passed.length})
        </button>
      </div>

      {/* FAILED TABLE */}
      <div className="bg-[#111827] p-6 rounded-xl border border-red-500">

        <h2 className="text-red-400 mb-4 text-lg">
          Rejected Candidates ({failed.length})
        </h2>

        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="text-left">Name</th>
              <th>Email</th>
              <th>Marks</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {failed.map((c, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td className="text-red-400 font-semibold">{c.score}</td>
                <td>
                  <a
                    href={c.resume}
                    target="_blank"
                    className="text-blue-400"
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={sendRejectionMail}
          className="mt-4 bg-red-500 px-4 py-2 rounded"
        >
          Send Rejection Mail ({failed.length})
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">

          <div className="bg-[#111827] p-6 rounded-xl w-[350px]">

            <h2 className="mb-4">Next Round Details</h2>

            <select
              value={nextRound}
              onChange={(e) => setNextRound(e.target.value)}
              className="w-full mb-3 p-2 bg-gray-800 rounded"
            >
              <option>Technical</option>
              <option>Coding</option>
              <option>HR</option>
            </select>

            <input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              className="w-full mb-3 p-2 bg-gray-800 rounded"
            />

            <input
              type="time"
              value={nextTime}
              onChange={(e) => setNextTime(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 rounded"
            />

            <div className="flex gap-3">
              <button
                onClick={sendNextRoundMail}
                className="flex-1 bg-green-500 py-2 rounded"
              >
                Send
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-600 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}