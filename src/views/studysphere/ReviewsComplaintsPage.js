import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PAGE_SIZE = 8;

const Stars = ({ rating }) => (
  <span style={{ display: 'inline-flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : '#e2e8f0'}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </span>
);

const getPageNumbers = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('...');
  pages.push(total);
  return pages;
};

const Pagination = ({ page, totalPages, totalItems, onChange }) => {
  if (totalItems <= PAGE_SIZE) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalItems);

  return (
    <div className="rp-pagination">
      <span className="rp-pagination-info">Showing {from}–{to} of {totalItems}</span>
      <div className="rp-pagination-controls">
        <button className="rp-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === '...' ? (
            <span key={`gap-${i}`} className="rp-page-gap">…</span>
          ) : (
            <button
              key={p}
              className={`rp-page-btn ${p === page ? 'rp-page-active' : ''}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button className="rp-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = reviews.filter(r =>
    r.userName?.toLowerCase().includes(search.toLowerCase()) ||
    r.comment?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <style>{`
        .rp-page { padding:40px; font-family:Inter, sans-serif; background:#f6f8fb; min-height:100vh; color:#334155; }
        .rp-page *, .rp-page *::before, .rp-page *::after { box-sizing:border-box; }
        .rp-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; background:transparent; padding:0; border:0; }
        .rp-title { font-size:28px; font-weight:700; color:#1e293b; }
        .rp-subtitle { color:#64748b; font-size:14px; margin-top:4px; }
        .rp-search { width:280px; padding:10px 14px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#1e293b; outline:none; }
        .rp-search::placeholder { color:#94a3b8; }
        .rp-search:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.15); }
        .rv-card { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.05); overflow: hidden; color:#334155; }
        .rv-card-header { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .rv-card-label { font-size: 14px; font-weight: 600; color: #1a202c; }
        .rv-tbl { width: 100%; border-collapse: collapse; background:#ffffff; }
        .rv-tbl thead th { padding: 12px 24px; font-size: 10px; font-weight: 600; letter-spacing: 1.4px; text-transform: uppercase; color: #94a3b8; text-align: left; background: #f8fafc; border:0; }
        .rv-tbl td { padding: 15px 24px; vertical-align: middle; border-bottom: 1px solid #f8fafc; color:#334155; background:#ffffff; }
        .rv-name { font-size: 14px; font-weight: 600; color: #1a202c; }
        .rv-date { font-size: 12px; color: #94a3b8; }
        .rv-comment { font-size: 13px; color: #475569; line-height: 1.5; max-width: 400px; }
        .rv-empty { text-align: center; padding: 50px; color: #94a3b8; }
        .rp-loading { padding: 40px; text-align: center; color: #64748b; }
        .rp-pagination { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:16px 24px; border-top:1px solid #f1f5f9; background:#ffffff; }
        .rp-pagination-info { font-size:13px; color:#64748b; }
        .rp-pagination-controls { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .rp-page-btn { min-width:36px; height:36px; padding:0 12px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#334155; font-size:13px; font-weight:500; cursor:pointer; }
        .rp-page-btn:hover:not(:disabled) { border-color:#3b82f6; color:#3b82f6; }
        .rp-page-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .rp-page-btn.rp-page-active { background:#3b82f6; border-color:#3b82f6; color:#ffffff; }
        .rp-page-gap { padding:0 4px; color:#94a3b8; }
      `}</style>

      <div className="rp-page" data-coreui-theme="light">
        <div className="rp-header">
          <div>
            <div className="rp-title">Product Reviews</div>
            <div className="rp-subtitle">Moderate and manage product reviews across StudySphere</div>
          </div>
          <input
            className="rp-search"
            placeholder="Search by user or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rv-card">
          <div className="rv-card-header">
            <span className="rv-card-label">Reviews List ({filtered.length})</span>
          </div>

          {loading ? (
            <div className="rp-loading">Fetching reviews from products...</div>
          ) : (
            <>
              <table className="rv-tbl">
                <thead>
                  <tr>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="4" className="rv-empty">No reviews found.</td></tr>
                  ) : paginated.map((r, index) => (
                    <tr key={r.id || index}>
                      <td>
                        <div className="rv-name">{r.userName || 'Anonymous'}</div>
                      </td>
                      <td><Stars rating={r.rating} /></td>
                      <td><div className="rv-comment">{r.comment}</div></td>
                      <td>
                        <div className="rv-date">
                          {typeof r.date === 'object' ? new Date(r.date.seconds * 1000).toLocaleDateString() : r.date}
                        </div>
                      </td>
                    </tr>
                  ))}
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

export default ReviewsPage;