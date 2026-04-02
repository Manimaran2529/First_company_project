import { useState, useEffect } from "react";

export default function Schedule() {

  const [domain, setDomain] = useState("ML");
  const [round, setRound] = useState("Aptitude");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [history, setHistory] = useState([]);

  // LOAD HISTORY
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("scheduleHistory")) || [];
    setHistory(saved);
  }, []);

  const handleSchedule = () => {
    if (!date || !time) {
      alert("Enter date & time");
      return;
    }

    const newEntry = {
      domain,
      round,
      date,
      time,
      month: new Date().getMonth()
    };

    const updated = [newEntry, ...history];

    localStorage.setItem("scheduleHistory", JSON.stringify(updated));
    setHistory(updated);

    alert("Schedule Created!");
  };

  const clearHistory = () => {
    localStorage.removeItem("scheduleHistory");
    setHistory([]);
  };

  return (
    <div className="flex-1 p-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        📅 Schedule Test
      </h1>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#111827] to-[#1f2937] p-8 rounded-2xl shadow-lg border border-gray-700">

        <div className="grid grid-cols-2 gap-6">

          <Select label="Domain" value={domain} setValue={setDomain}
            options={["Web", "ML", "Data Science"]} />

          <Select label="Round" value={round} setValue={setRound}
            options={["Aptitude", "Technical", "Coding", "HR"]} />

          <Input label="Date" type="date" value={date} setValue={setDate} />

          <Input label="Time" type="time" value={time} setValue={setTime} />

        </div>

        <p className="text-sm text-gray-400 mt-4">
          📩 Only selected candidates will receive the test mail
        </p>

        <button
          onClick={handleSchedule}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Send Invitation
        </button>
      </div>

      {/* HISTORY */}
      <div className="max-w-3xl mx-auto mt-10">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📜 This Month History</h2>
          <button onClick={clearHistory} className="text-red-400 text-sm">
            Clear
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-400">No schedules yet</p>
        ) : (
          <div className="space-y-3">
            {history.map((h, i) => (
              <div
                key={i}
                className="bg-[#111827] p-4 rounded-xl border border-gray-700 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-blue-400">
                    {h.domain} — {h.round}
                  </p>
                  <p className="text-sm text-gray-400">
                    {h.date} | {h.time}
                  </p>
                </div>

                <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">
                  Scheduled
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

/* REUSABLE COMPONENTS */

function Select({ label, value, setValue, options }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700"
      >
        {options.map((o, i) => (
          <option key={i}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Input({ label, type, value, setValue }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700"
      />
    </div>
  );
}