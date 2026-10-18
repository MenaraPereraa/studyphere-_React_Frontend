import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 8;

const getPageNumbers = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
};

const Pagination = ({ page, totalPages, totalItems, onChange }) => {
  if (totalItems <= PAGE_SIZE) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalItems);

  return (
    <div className="up-pagination">
      <span className="up-pagination-info">Showing {from}–{to} of {totalItems}</span>
      <div className="up-pagination-controls">
        <button className="up-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`gap-${i}`} className="up-page-gap">…</span>
          ) : (
            <button
              key={p}
              className={`up-page-btn ${p === page ? "up-page-active" : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button className="up-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const THEME_COLOR = "#006A67";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/users');

      console.log("Fetched Users:", response.data);

      const formattedData = response.data.map((u) => ({
        id: u.id,
        name: u.name || "Unknown User",
        email: u.email || "No Email",
        role: u.role || "buyer",
        status: u.status || "pending",
        sellerApproved: u.status === "approved"
      }));

      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, filterRole]);

  const filtered = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      filterRole === "All" || u.role.toLowerCase() === filterRole.toLowerCase();

    return matchSearch && matchRole;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <style>{`
        .up-page { padding:40px; font-family:'Inter', sans-serif; background:#f6f8fb; min-height:100vh; color:#334155; }
        .up-page *, .up-page *::before, .up-page *::after { box-sizing:border-box; }
        .up-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; background:transparent; padding:0; border:0; }
        .up-title { font-size:28px; font-weight:700; color:#1e293b; margin:0; }
        .up-subtitle { color:#64748b; font-size:14px; margin:4px 0 0 0; }
        .up-toolbar { display:flex; gap:10px; align-items:center; }
        .up-search { width:260px; padding:10px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#1e293b; outline:none; }
        .up-search::placeholder { color:#94a3b8; }
        .up-search:focus { border-color:${THEME_COLOR}; box-shadow:0 0 0 3px rgba(0,106,103,0.12); }
        .up-filter { padding:8px 16px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#334155; cursor:pointer; font-weight:500; }
        .up-filter.up-active { background:${THEME_COLOR}; color:#ffffff; border-color:${THEME_COLOR}; }
        .up-card { background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.05); overflow:hidden; color:#334155; }
        .up-table { width:100%; border-collapse:collapse; background:#ffffff; }
        .up-table th { text-align:left; padding:15px 24px; background:#f8fafc; color:#64748b; font-size:12px; text-transform:uppercase; border:0; }
        .up-table td { padding:16px 24px; border-top:1px solid #f1f5f9; font-size:14px; color:#334155; background:#ffffff; }
        .up-name { font-weight:600; color:#0f172a; }
        .up-badge { display:inline-block; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:600; text-transform:capitalize; }
        .up-buyer { background:#e0f2fe; color:#0369a1; }
        .up-seller { background:#fff7ed; color:#c2410c; }
        .up-status { text-transform:capitalize; color:#475569; }
        .up-empty { padding:40px; text-align:center; color:#64748b; }
        .up-pagination { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:16px 24px; border-top:1px solid #f1f5f9; background:#ffffff; }
        .up-pagination-info { font-size:13px; color:#64748b; }
        .up-pagination-controls { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .up-page-btn { min-width:36px; height:36px; padding:0 12px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#334155; font-size:13px; font-weight:500; cursor:pointer; }
        .up-page-btn:hover:not(:disabled) { border-color:${THEME_COLOR}; color:${THEME_COLOR}; }
        .up-page-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .up-page-btn.up-page-active { background:${THEME_COLOR}; border-color:${THEME_COLOR}; color:#ffffff; }
        .up-page-gap { padding:0 4px; color:#94a3b8; }
      `}</style>

      <div className="up-page" data-coreui-theme="light">
        <div className="up-header">
          <div>
            <div className="up-title">Users</div>
            <p className="up-subtitle">Manage all registered buyers and sellers</p>
          </div>
          <div className="up-toolbar">
            <input
              className="up-search"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {["All", "Buyer", "Seller"].map(role => (
              <button
                key={role}
                className={`up-filter ${filterRole === role ? "up-active" : ""}`}
                onClick={() => setFilterRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="up-card">
          {loading ? (
            <div className="up-empty">Loading Users...</div>
          ) : (
            <>
              <table className="up-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user) => (
                    <tr key={user.id}>
                      <td className="up-name">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`up-badge up-${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="up-status">{user.status}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="4" className="up-empty">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                totalItems={filtered.length}
                onChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersPage;