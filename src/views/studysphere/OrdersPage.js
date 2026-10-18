import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 8;

const STATUS_STYLES = {
  PAID: { bg: "#dcfce7", color: "#15803d" },
  PENDING: { bg: "#fef3c7", color: "#b45309" },
  DEFAULT: { bg: "#f3f4f6", color: "#6b7280" }
};

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
    <div className="op-pagination">
      <span className="op-pagination-info">Showing {from}–{to} of {totalItems}</span>
      <div className="op-pagination-controls">
        <button className="op-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`gap-${i}`} className="op-page-gap">…</span>
          ) : (
            <button
              key={p}
              className={`op-page-btn ${p === page ? "op-page-active" : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button className="op-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.orderId?.toLowerCase().includes(q) ||
      o.shippingAddress?.name?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const formatOrderDate = (dateVal) => {
    if (!dateVal) return "N/A";

    if (typeof dateVal === 'object' && dateVal.seconds) {
      return new Date(dateVal.seconds * 1000).toLocaleDateString();
    }

    return new Date(dateVal).toLocaleDateString();
  };

  return (
    <>
      <style>{`
        .op-page { padding:40px; font-family:Inter, sans-serif; background:#f6f8fb; min-height:100vh; color:#334155; }
        .op-page *, .op-page *::before, .op-page *::after { box-sizing:border-box; }
        .op-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; background:transparent; padding:0; border:0; }
        .op-title { font-size:28px; font-weight:700; color:#1e293b; }
        .op-subtitle { color:#64748b; font-size:14px; margin-top:4px; }
        .op-search { width:280px; padding:10px 14px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#1e293b; outline:none; }
        .op-search::placeholder { color:#94a3b8; }
        .op-search:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.15); }
        .op-card { background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.05); overflow:hidden; color:#334155; }
        .op-card-header { padding:20px 24px; border-bottom:1px solid #f1f5f9; font-weight:600; font-size:15px; color:#1e293b; }
        .op-table { width:100%; border-collapse:collapse; background:#ffffff; }
        .op-table thead { background:#f8fafc; }
        .op-table th { text-align:left; padding:14px 24px; font-size:12px; color:#64748b; text-transform:uppercase; border:0; }
        .op-table td { padding:16px 24px; border-top:1px solid #f1f5f9; font-size:14px; vertical-align:top; color:#334155; background:#ffffff; }
        .op-order-id { font-weight:700; color:#3b82f6; display:block; }
        .op-customer-name { font-weight:600; color:#1e293b; }
        .op-item-list { font-size:12px; color:#475569; margin:0; padding:0; list-style:none; }
        .op-status-badge { padding:5px 10px; border-radius:6px; font-size:12px; font-weight:600; display:inline-block; }
        .op-price { font-weight:700; color:#0f172a; }
        .op-loading { padding:40px; text-align:center; color:#64748b; }
        .op-empty { padding:40px; text-align:center; color:#94a3b8; }
        .op-pagination { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:16px 24px; border-top:1px solid #f1f5f9; background:#ffffff; }
        .op-pagination-info { font-size:13px; color:#64748b; }
        .op-pagination-controls { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .op-page-btn { min-width:36px; height:36px; padding:0 12px; border-radius:8px; border:1px solid #e2e8f0; background:#ffffff; color:#334155; font-size:13px; font-weight:500; cursor:pointer; }
        .op-page-btn:hover:not(:disabled) { border-color:#3b82f6; color:#3b82f6; }
        .op-page-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .op-page-btn.op-page-active { background:#3b82f6; border-color:#3b82f6; color:#ffffff; }
        .op-page-gap { padding:0 4px; color:#94a3b8; }
      `}</style>

      <div className="op-page" data-coreui-theme="light">
        <div className="op-header">
          <div>
            <div className="op-title">Orders</div>
            <div className="op-subtitle">Manage marketplace orders and transactions</div>
          </div>
          <input
            className="op-search"
            placeholder="Search Order ID or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="op-card">
          <div className="op-card-header">Orders List ({filtered.length})</div>

          {loading ? (
            <div className="op-loading">Loading orders...</div>
          ) : (
            <>
              <table className="op-table">
                <thead>
                  <tr>
                    <th>Order Info</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((order) => {
                    const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.DEFAULT;

                    return (
                      <tr key={order.id}>
                        <td>
                          <span className="op-order-id">#{order.orderId}</span>
                          <div style={{fontSize: '12px', color: '#94a3b8'}}>
                            {formatOrderDate(order.orderDate)}
                          </div>
                        </td>

                        <td>
                          {order.shippingAddress ? (
                            <>
                              <div className="op-customer-name">{order.shippingAddress.name}</div>
                              <div style={{fontSize:'12px', color:'#64748b'}}>{order.shippingAddress.email}</div>
                            </>
                          ) : (
                            <span style={{color: '#cbd5e1'}}>No Address Info</span>
                          )}
                        </td>

                        <td>
                          <ul className="op-item-list">
                            {order.orderItems?.map((item, idx) => (
                              <li key={idx}>
                                • ID: {item.productId?.substring(0,8)}... (x{item.quantity})
                              </li>
                            ))}
                          </ul>
                        </td>

                        <td className="op-price">
                          LKR {Number(order.totalAmount).toLocaleString()}
                        </td>

                        <td>
                          <span
                            className="op-status-badge"
                            style={{ background: statusStyle.bg, color: statusStyle.color }}
                          >
                            {order.status || 'N/A'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr><td colSpan="5" className="op-empty">No orders found.</td></tr>
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

export default OrdersPage;