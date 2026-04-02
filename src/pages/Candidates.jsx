import { useState } from "react";

export default function Candidates() {

  // ✅ CURRENT MONTH
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // ✅ MONTH LIST
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  // ✅ DATA (Demo)
  const [candidates] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", phone: "9876543210", domain: "Web", status: "Selected", month: "April" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com", phone: "9876543211", domain: "Data Science", status: "Rejected", month: "April" },
    { id: 3, name: "Arun", email: "arun@gmail.com", phone: "9876543212", domain: "Web", status: "Selected", month: "March" },
    { id: 4, name: "Kiran", email: "kiran@gmail.com", phone: "9876543213", domain: "Data Science", status: "Selected", month: "February" },
  ]);

  // ✅ FILTER STATES
  const [domainFilter, setDomainFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState(currentMonth);

  // ✅ FILTER LOGIC
  const filtered = candidates.filter(c => {
    return (
      (domainFilter === "All" || c.domain === domainFilter) &&
      (statusFilter === "All" || c.status === statusFilter) &&
      c.month === monthFilter
    );
  });

  // ✅ COUNT BASED ON MONTH + DOMAIN
  const domainData = candidates.filter(c => {
    return (
      (domainFilter === "All" || c.domain === domainFilter) &&
      c.month === monthFilter
    );
  });

  const total = domainData.length;
  const selectedCount = domainData.filter(c => c.status === "Selected").length;
  const rejectedCount = domainData.filter(c => c.status === "Rejected").length;

  return (
    <div className="flex-1 p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-2">Candidates</h1>
      <p className="text-gray-400 mb-6">
        Showing data for:
        <span className="text-blue-400 ml-2">{monthFilter}</span>
      </p>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-[#111827] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400">Total</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-900/20 border border-green-500 p-4 rounded-xl">
          <p className="text-green-400">Selected</p>
          <h2 className="text-2xl font-bold">{selectedCount}</h2>
        </div>

        <div className="bg-red-900/20 border border-red-500 p-4 rounded-xl">
          <p className="text-red-400">Rejected</p>
          <h2 className="text-2xl font-bold">{rejectedCount}</h2>
        </div>

      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">

        {/* DOMAIN */}
        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="bg-[#111827] px-3 py-2 rounded-lg border border-gray-700"
        >
          <option>All</option>
          <option>Web</option>
          <option>Data Science</option>
        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#111827] px-3 py-2 rounded-lg border border-gray-700"
        >
          <option>All</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>

        {/* MONTH (DEFAULT CURRENT) */}
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="bg-[#111827] px-3 py-2 rounded-lg border border-gray-700"
        >
          {months.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">

        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Domain</th>
              <th>Status</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t border-gray-800">
                <td className="p-3">{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.domain}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    c.status === "Selected"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}>
                    {c.status}
                  </span>
                </td>

                <td>
                  <a href="#" className="text-blue-400">View PDF</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">

        {selectedCount > 0 && (
          <button className="bg-green-600 px-5 py-2 rounded-lg">
            Send Selected Mail ({selectedCount})
          </button>
        )}

        {rejectedCount > 0 && (
          <button className="bg-red-600 px-5 py-2 rounded-lg">
            Send Rejection Mail ({rejectedCount})
          </button>
        )}

      </div>

    </div>
  );
}