import { useEffect, useState } from "react";

export default function Dashboard() {

  const [history, setHistory] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [tomorrowEvents, setTomorrowEvents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("scheduleHistory")) || [];
    setHistory(data);

    const today = new Date().toISOString().split("T")[0];

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    setTodayEvents(data.filter(d => d.date === today));
    setTomorrowEvents(data.filter(d => d.date === tomorrow));

  }, []);

  return (
    <div className="flex-1 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 HR Dashboard</h1>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-lg text-sm">
          + New Drive
        </button>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <StatCard title="Total Applications" value="248" sub="+34 this month" />
        <StatCard title="Selected" value="86" sub="35%" green />
        <StatCard title="Rejected" value="120" sub="48%" red />
        <StatCard title="Schedules" value={history.length} sub="Active" />

      </div>

      {/* 🔥 LIVE TRACKING */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <LiveCard title="🔥 Today Events" data={todayEvents} color="green" />
        <LiveCard title="⏳ Tomorrow Events" data={tomorrowEvents} color="yellow" />

      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid grid-cols-3 gap-4">

        {/* DOMAIN VACANCIES */}
        <div className="card">
          <h3 className="title mb-3">Domain Vacancies</h3>

          <Vacancy title="ML Engineer" tech="Python, ML" status="Open" color="green" />
          <Vacancy title="Web Dev" tech="React, Node" status="Open" color="green" />
          <Vacancy title="Data Analyst" tech="SQL" status="Closed" color="red" />
        </div>

        {/* 📊 FUNNEL GRAPH */}
        <div className="card">
          <h3 className="title mb-3">Recruitment Funnel</h3>

          <Bar label="Applications" value={100} />
          <Bar label="Screened" value={70} />
          <Bar label="Aptitude" value={50} />
          <Bar label="Technical" value={30} />
          <Bar label="Coding" value={20} />
          <Bar label="HR" value={10} />
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-4">

          <div className="card">
            <h3 className="title mb-2">Upcoming</h3>

            {history.slice(0, 3).map((e, i) => (
              <p key={i} className="text-sm text-blue-400">
                {e.domain} — {e.round}
              </p>
            ))}

          </div>

          <div className="card">
            <h3 className="title mb-2">Mail Activity</h3>
            <p className="text-green-400">● Selected mails</p>
            <p className="text-red-400">● Rejections</p>
            <p className="text-blue-400">● Test links</p>
          </div>

        </div>
      </div>

      {/* 📊 DOMAIN PROGRESS */}
      <div className="mt-6 card">
        <h3 className="title mb-4">Domain Progress</h3>

        <table className="w-full text-left">

          <thead className="text-gray-400">
            <tr>
              <th>Domain</th>
              <th>Aptitude</th>
              <th>Technical</th>
              <th>Coding</th>
              <th>HR</th>
            </tr>
          </thead>

          <tbody>
            <Row domain="ML" apt="Done" tech="In Progress" code="Pending" hr="Pending" />
            <Row domain="Web" apt="Done" tech="Done" code="In Progress" hr="Pending" />
            <Row domain="Data Science" apt="Done" tech="Pending" code="Pending" hr="Pending" />
          </tbody>

        </table>
      </div>

    </div>
  );
}

/* 🔹 COMPONENTS */

function StatCard({ title, value, sub, green, red }) {
  return (
    <div className="card">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className={`text-sm ${green ? "text-green-400" : red ? "text-red-400" : ""}`}>
        {sub}
      </p>
    </div>
  );
}

function LiveCard({ title, data, color }) {
  return (
    <div className={`card border ${color === "green" ? "border-green-500" : "border-yellow-500"}`}>
      <h3 className="title mb-3">{title}</h3>

      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No events</p>
      ) : (
        data.map((e, i) => (
          <div key={i} className="flex justify-between text-sm mb-2">
            <span>{e.domain} — {e.round}</span>
            <span>{e.time}</span>
          </div>
        ))
      )}
    </div>
  );
}

function Vacancy({ title, tech, status, color }) {
  return (
    <div className="flex justify-between items-center mb-3 p-3 bg-[#0f172a] rounded-lg">
      <div>
        <p>{title}</p>
        <p className="text-gray-400 text-sm">{tech}</p>
      </div>

      <span className={`px-2 py-1 text-xs rounded
        ${color === "green" ? "bg-green-700" : "bg-red-700"}
      `}>
        {status}
      </span>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-sm mb-1">{label}</p>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className="bg-blue-400 h-2 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function Row({ domain, apt, tech, code, hr }) {
  return (
    <tr className="border-t border-gray-700">
      <td className="py-2">{domain}</td>
      <td><Status s={apt} /></td>
      <td><Status s={tech} /></td>
      <td><Status s={code} /></td>
      <td><Status s={hr} /></td>
    </tr>
  );
}

function Status({ s }) {
  let color = "bg-gray-600";
  if (s === "Done") color = "bg-green-600";
  if (s === "In Progress") color = "bg-yellow-500";

  return (
    <span className={`px-2 py-1 text-xs rounded ${color}`}>
      {s}
    </span>
  );
}