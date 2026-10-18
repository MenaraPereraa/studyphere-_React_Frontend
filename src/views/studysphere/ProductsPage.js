import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 8;

const CATEGORY_STYLES = {
  Mathematics: { bg: "#e0f2fe", color: "#0369a1" },
  Chemistry: { bg: "#fff7ed", color: "#c2410c" },
  "Computer Science": { bg: "#f3e8ff", color: "#7c3aed" },
  Economics: { bg: "#dcfce7", color: "#15803d" },
  History: { bg: "#fee2e2", color: "#b91c1c" },
  Biology: { bg: "#ecfdf5", color: "#047857" },
  Physics: { bg: "#e0f2fe", color: "#0284c7" },
  "Guide Books": { bg: "#f3f4f6", color: "#1e293b" }
};

const DEFAULT_CAT = { bg: "#f3f4f6", color: "#6b7280" };

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
    <div className="pp-pagination">
      <span className="pp-pagination-info">Showing {from}–{to} of {totalItems}</span>
      <div className="pp-pagination-controls">
        <button className="pp-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`gap-${i}`} className="pp-page-gap">…</span>
          ) : (
            <button
              key={p}
              className={`pp-page-btn ${p === page ? "pp-page-active" : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button className="pp-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.sellerId?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <style>{`
        .pp-page { padding:40px; font-family:Inter, sans-serif; background:#f6f8fb; min-height:100vh; color:#334155; }
        .pp-page *, .pp-page *::before, .pp-page *::after { box-sizing:border-box; }
        .pp-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; background:transparent; padding:0; border:0; }
        .pp-title { font-size:28px; font-weight:700; color:#1e293b; }
        .pp-subtitle { color:#64748b; font-size:14px; margin-top:4px; }
        .pp-search { width:280px; padding:10px 14px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#1e293b; outline:none; transition:0.2s; }
        .pp-search::placeholder { color:#94a3b8; }
        .pp-search:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.15); }
        .pp-card { background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.05); overflow:hidden; color:#334155; }
        .pp-card-header { padding:20px 24px; border-bottom:1px solid #f1f5f9; font-weight:600; font-size:15px; color:#1e293b; }
        .pp-table { width:100%; border-collapse:collapse; background:#ffffff; }
        .pp-table thead { background:#f8fafc; }
        .pp-table th { text-align:left; padding:14px 24px; font-size:12px; letter-spacing:.05em; text-transform:uppercase; color:#64748b; border:0; }
        .pp-table td { padding:16px 24px; border-top:1px solid #f1f5f9; font-size:14px; color:#334155; background:#ffffff; }
        .pp-table tbody tr:hover td { background:#f9fafb; }
        .pp-product-title { font-weight:600; color:#0f172a; }
        .pp-seller { font-size:12px; color:#64748b; }
        .pp-category { padding:5px 10px; border-radius:6px; font-size:12px; font-weight:600; display:inline-block; }
        .pp-price { font-weight:600; color:#0f172a; }
        .pp-date { color:#64748b; font-size:13px; }
        .pp-loading { padding:24px; text-align:center; color:#64748b; }
        .pp-pagination { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:16px 24px; border-top:1px solid #f1f5f9; background:#ffffff; }
        .pp-pagination-info { font-size:13px; color:#64748b; }
        .pp-pagination-controls { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .pp-page-btn { min-width:36px; height:36px; padding:0 12px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#334155; font-size:13px; font-weight:500; cursor:pointer; }
        .pp-page-btn:hover:not(:disabled) { border-color:#3b82f6; color:#3b82f6; }
        .pp-page-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .pp-page-btn.pp-page-active { background:#3b82f6; border-color:#3b82f6; color:#ffffff; }
        .pp-page-gap { padding:0 4px; color:#94a3b8; }
      `}</style>

      <div className="pp-page" data-coreui-theme="light">
        <div className="pp-header">
          <div>
            <div className="pp-title">Products</div>
            <div className="pp-subtitle">Manage and review academic resources</div>
          </div>
          <input
            className="pp-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="pp-card">
          <div className="pp-card-header">
            Product List ({filtered.length})
          </div>

          {loading ? (
            <div className="pp-loading">Loading...</div>
          ) : (
            <>
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Date Listed</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((product) => {
                    const catStyle = CATEGORY_STYLES[product.category] || DEFAULT_CAT;

                    const formattedDate = product.updatedAt
                      ? new Date(product.updatedAt).toLocaleDateString()
                      : "N/A";

                    return (
                      <tr key={product.id}>
                        <td>
                          <div className="product-info">
                            <div className="pp-product-title">{product.name}</div>
                            <div className="pp-seller">by {product.sellerId}</div>
                          </div>
                        </td>
                        <td>
                          <span className="pp-category" style={{ background: catStyle.bg, color: catStyle.color }}>
                            {product.category}
                          </span>
                        </td>
                        <td>
                          <span className="pp-price">
                            LKR {Number(product.price).toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <span className="pp-date">{formattedDate}</span>
                        </td>
                      </tr>
                    );
                  })}
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

export default ProductsPage;