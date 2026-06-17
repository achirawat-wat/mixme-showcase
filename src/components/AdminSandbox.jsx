import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  Users, 
  Activity,
  Search,
  Bell
} from 'lucide-react';

const AdminSandbox = () => {
  return (
    <div className="sandbox-wrapper">
      
      {/* =========================================
          SQL POPUPS (แสดงเฉพาะตอนเปิด Dev Mode)
          ========================================= */}
      
      {/* SQL 1: Table Ingredients */}
      <div className="sql-popup sql-1">
        <code>{`> SELECT id, name, stock\n> FROM ingredients;`}</code>
        <div className="sql-result">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>stock</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>A1</td><td>Vodka Base</td><td><span className="text-safe">45%</span></td></tr>
              <tr><td>M1</td><td>Cola</td><td><span className="text-danger">12%</span></td></tr>
              <tr><td>M2</td><td>Soda Water</td><td><span className="text-safe">68%</span></td></tr>
              <tr><td>M4</td><td>Orange Juice</td><td><span className="text-danger">08%</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SQL 2: Table Orders */}
      <div className="sql-popup sql-2">
        <code>{`> SELECT order_id, menu, status\n> FROM orders\n> ORDER BY id DESC LIMIT 3;`}</code>
        <div className="sql-result">
          <table>
            <thead>
              <tr>
                <th>order_id</th>
                <th>menu</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>MX-103</td><td>Classic Cola</td><td>Queued</td></tr>
              <tr><td>MX-102</td><td>Custom Mix</td><td>Pending</td></tr>
              <tr><td>MX-101</td><td>Orange Soda</td><td>Done</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================
          MACBOOK WINDOW
          ========================================= */}
      <div className="mac-window">
        <div className="mac-titlebar">
          <div className="mac-traffic-lights">
            <span className="light close"></span>
            <span className="light minimize"></span>
            <span className="light maximize"></span>
          </div>
          <div className="mac-window-title">MixMe Admin Workspace</div>
        </div>

        <div className="fake-dashboard">
          <div className="mac-sidebar">
            <div className="sidebar-top">
              <div className="sidebar-icon active"><LayoutDashboard size={20} /></div>
              <div className="sidebar-icon"><Database size={20} /></div>
              <div className="sidebar-icon"><Users size={20} /></div>
              <div className="sidebar-icon"><Activity size={20} /></div>
            </div>
            <div className="sidebar-bottom">
              <div className="sidebar-icon"><Settings size={20} /></div>
            </div>
          </div>
          
          <div className="mac-main-content">
            <div className="mac-topnav">
              <div className="greeting">
                <h2>Overview</h2>
                <p>Welcome back, Admin.</p>
              </div>
              <div className="top-actions">
                <div className="search-bar">
                  <Search size={16} />
                  <span>Search orders...</span>
                </div>
                <div className="icon-btn">
                  <Bell size={18} />
                  <span className="notification-dot"></span>
                </div>
                <div className="profile-pic">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin" />
                </div>
              </div>
            </div>

            <div className="card-row">
              <div className="dash-card">
                <div className="card-label">Total Orders</div>
                <div className="card-value">142</div>
                <div className="card-trend positive">+12% from yesterday</div>
              </div>
              <div className="dash-card">
                <div className="card-label">Revenue</div>
                <div className="card-value">฿2,840</div>
                <div className="card-trend positive">+8.5% from yesterday</div>
              </div>
              <div className="dash-card">
                <div className="card-label">Low Stock Alerts</div>
                <div className="card-value critical">2</div>
                <div className="card-trend negative">Cola, Orange Juice</div>
              </div>
            </div>

            <div className="split-layout">
              <div className="chart-container">
                <div className="table-header-title">Weekly Revenue</div>
                <div className="bar-chart">
                  <div className="bar-col"><div className="bar-fill" style={{height: '40%'}}></div><span className="bar-label">M</span></div>
                  <div className="bar-col"><div className="bar-fill" style={{height: '65%'}}></div><span className="bar-label">T</span></div>
                  <div className="bar-col"><div className="bar-fill" style={{height: '50%'}}></div><span className="bar-label">W</span></div>
                  <div className="bar-col"><div className="bar-fill" style={{height: '80%'}}></div><span className="bar-label">T</span></div>
                  <div className="bar-col"><div className="bar-fill highlight" style={{height: '100%'}}></div><span className="bar-label">F</span></div>
                  <div className="bar-col"><div className="bar-fill" style={{height: '30%'}}></div><span className="bar-label">S</span></div>
                  <div className="bar-col"><div className="bar-fill" style={{height: '45%'}}></div><span className="bar-label">S</span></div>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header-title">Recent Transactions</div>
                <div className="table-mock">
                  <div className="t-row header">
                    <span>Order ID</span>
                    <span>Menu</span>
                    <span>Status</span>
                  </div>
                  <div className="t-row">
                    <span className="order-id">#MX-101</span>
                    <span className="menu-name">Orange Soda</span>
                    <span><span className="status-badge done">Completed</span></span>
                  </div>
                  <div className="t-row">
                    <span className="order-id">#MX-102</span>
                    <span className="menu-name">Custom Mix</span>
                    <span><span className="status-badge pending">Mixing</span></span>
                  </div>
                  <div className="t-row">
                    <span className="order-id">#MX-103</span>
                    <span className="menu-name">Classic Cola</span>
                    <span><span className="status-badge waiting">Queued</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sandbox-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* =========================
           SQL POPUPS (DEV MODE)
           ========================= */
        .sql-popup {
          display: none;
          position: absolute;
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid #374151;
          padding: 14px 18px;
          border-radius: 10px;
          z-index: 50;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          pointer-events: none;
          width: 280px; 
        }

        .sql-popup code {
          color: #4ade80;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          white-space: pre-line;
          line-height: 1.5;
        }

        /* ผลลัพธ์ตาราง SQL */
        .sql-result {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px dashed #4b5563;
        }

        .sql-result table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          text-align: left;
        }

        .sql-result th {
          color: #f8fafc;
          padding-bottom: 6px;
          border-bottom: 1px solid #374151;
        }

        .sql-result td {
          color: #94a3b8;
          padding: 6px 0;
        }

        .text-danger { color: #ff3b30; font-weight: bold; }
        .text-safe { color: #4ade80; }

        .sql-1 { top: 10%; left: -320px; }
        .sql-2 { bottom: 10%; right: -320px; }

        .dev-mode-active .sql-popup {
          display: block;
          animation: floatIn 0.5s ease-out forwards;
        }

        @keyframes floatIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* =========================
           APPLE STYLE DASHBOARD
           ========================= */
        .mac-window {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #f5f5f7; 
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          color: #1d1d1f;
          border-radius: 8px 8px 0 0; 
          overflow: hidden; 
        }

        .mac-titlebar {
          height: 38px; background: #e8e8ed; display: flex; align-items: center;
          padding: 0 16px; border-bottom: 1px solid #d1d1d6; position: relative;
        }

        .mac-traffic-lights { display: flex; gap: 8px; }
        .light { width: 12px; height: 12px; border-radius: 50%; }
        .light.close { background: #ff5f56; border: 1px solid #e0443e; }
        .light.minimize { background: #ffbd2e; border: 1px solid #dea123; }
        .light.maximize { background: #27c93f; border: 1px solid #1aab29; }

        .mac-window-title {
          position: absolute; left: 50%; transform: translateX(-50%);
          font-size: 13px; font-weight: 600; color: #4b4b4b;
        }

        .fake-dashboard { display: flex; flex: 1; height: calc(100% - 38px); overflow: hidden; }

        .mac-sidebar {
          width: 72px; background: rgba(232, 232, 237, 0.6); backdrop-filter: blur(20px);
          border-right: 1px solid rgba(0, 0, 0, 0.05); display: flex; flex-direction: column;
          align-items: center; justify-content: space-between; padding: 24px 0;
        }

        .sidebar-top, .sidebar-bottom { display: flex; flex-direction: column; gap: 16px; align-items: center; }
        .sidebar-icon {
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          border-radius: 10px; color: #86868b; cursor: pointer; transition: 0.2s;
        }
        .sidebar-icon:hover { background: rgba(0, 0, 0, 0.04); color: #1d1d1f; }
        .sidebar-icon.active { background: #ffffff; color: #0066cc; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }

        /* เปลี่ยนจาก overflow-y: auto เป็น hidden เพื่อเอา Scroll bar ออก และลด padding */
        .mac-main-content {
  flex: 1;
  padding: 20px 32px;
  overflow-y: auto; /* เปลี่ยนจาก hidden */
  overflow-x: hidden;
}

        /* ลด margin-bottom เพื่อขยับเนื้อหาให้ชิดกันขึ้น */
        .mac-topnav { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
        .greeting h2 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
        .greeting p { color: #86868b; font-size: 13px; }

        .top-actions { display: flex; align-items: center; gap: 16px; }
        .search-bar {
          display: flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px;
          border-radius: 100px; color: #86868b; font-size: 13px; border: 1px solid rgba(0,0,0,0.03); width: 200px;
        }
        .icon-btn {
          width: 36px; height: 36px; background: #ffffff; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #1d1d1f;
          border: 1px solid rgba(0,0,0,0.03); position: relative;
        }
        .notification-dot {
          position: absolute; top: 8px; right: 10px; width: 6px; height: 6px; background: #ff3b30; border-radius: 50%;
        }
        .profile-pic img { width: 36px; height: 36px; border-radius: 50%; }

        /* ลด margin-bottom เพื่อขยับเนื้อหาให้ชิดกันขึ้น */
        .card-row { display: flex; gap: 16px; margin-bottom: 16px; }
        .dash-card {
          flex: 1; background: #ffffff; padding: 18px 20px; border-radius: 16px; /* ลด padding */
          border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 8px;
        }
        .card-label { font-size: 13px; font-weight: 600; color: #86868b; }
        .card-value { font-size: 26px; font-weight: 700; color: #1d1d1f; } /* ลดขนาดฟอนต์นิดนึง */
        .card-value.critical { color: #ff3b30; }
        .card-trend { font-size: 12px; font-weight: 500; }
        .card-trend.positive { color: #34c759; }
        .card-trend.negative { color: #ff3b30; }

        .split-layout { display: flex; gap: 16px; align-items: stretch; }
        .chart-container, .table-container {
          flex: 1; background: #ffffff; border-radius: 16px; padding: 16px 20px; border: 1px solid rgba(0,0,0,0.03);
        }
        .table-header-title { font-size: 15px; font-weight: 600; margin-bottom: 16px; color: #1d1d1f; }

        .bar-chart { display: flex; align-items: flex-end; justify-content: space-between; height: 120px; padding-top: 10px; }
        .bar-col { display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; width: 30px; }
        .bar-fill { width: 100%; background: #e5e5ea; border-radius: 6px; transition: 0.3s; }
        .bar-fill.highlight { background: #0066cc; }
        .bar-label { font-size: 12px; color: #86868b; font-weight: 600; }

        .t-row { display: grid; grid-template-columns: 1fr 1.5fr 1fr; padding: 10px 8px; border-bottom: 1px solid #f2f2f7; align-items: center; font-size: 13px; }
        .t-row:last-child { border-bottom: none; padding-bottom: 4px; }
        .t-row.header { color: #86868b; font-weight: 600; font-size: 11px; text-transform: uppercase; padding-top: 4px; }
        .order-id { font-weight: 600; color: #1d1d1f; }
        .menu-name { color: #4b4b4b; }

        .status-badge { padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; }
        .status-badge.done { background: #e1f5e8; color: #248a3d; }
        .status-badge.pending { background: #e5f0ff; color: #0066cc; }
        .status-badge.waiting { background: #f2f2f7; color: #86868b; }

        /* =========================
           DEV MODE OVERRIDE
           ========================= */
        .dev-mode-active .mac-window { background: #000000; color: #f5f5f7; }
        .dev-mode-active .mac-titlebar { background: #1c1c1e; border-bottom: 1px solid #38383a; }
        .dev-mode-active .mac-window-title { color: #a1a1a6; }
        .dev-mode-active .mac-sidebar { background: rgba(28, 28, 30, 0.6); border-right: 1px solid #38383a; }
        .dev-mode-active .sidebar-icon:hover { background: rgba(255, 255, 255, 0.1); color: #f5f5f7; }
        .dev-mode-active .sidebar-icon.active { background: #2c2c2e; color: #0a84ff; }
        .dev-mode-active .mac-main-content { background: #000000; }
        
        .dev-mode-active .greeting h2, .dev-mode-active .card-value, 
        .dev-mode-active .table-header-title, .dev-mode-active .order-id { color: #f5f5f7; }
        .dev-mode-active .greeting p, .dev-mode-active .card-label, .dev-mode-active .menu-name { color: #86868b; }

        .dev-mode-active .search-bar, .dev-mode-active .icon-btn, .dev-mode-active .dash-card, 
        .dev-mode-active .chart-container, .dev-mode-active .table-container {
          background: #1c1c1e; border: 1px solid #2c2c2e;
        }

        .dev-mode-active .icon-btn { color: #f5f5f7; }
        .dev-mode-active .bar-fill { background: #2c2c2e; }
        .dev-mode-active .bar-fill.highlight { background: #0a84ff; }

        .dev-mode-active .t-row { border-bottom: 1px solid #2c2c2e; }
        .dev-mode-active .status-badge.done { background: rgba(52, 199, 89, 0.15); color: #32d74b; }
        .dev-mode-active .status-badge.pending { background: rgba(10, 132, 255, 0.15); color: #64d2ff; }
        .dev-mode-active .status-badge.waiting { background: #2c2c2e; color: #a1a1a6; }

        /* =====================================
   RESPONSIVE
   ===================================== */

/* MacBook Air / Pro */
@media (max-width: 1440px) {
  .mac-main-content {
    padding: 18px 24px;
  }

  .greeting h2 {
    font-size: 22px;
  }

  .card-value {
    font-size: 22px;
  }

  .search-bar {
    width: 160px;
  }

  .dash-card {
    padding: 16px;
  }

  .chart-container,
  .table-container {
    padding: 14px 16px;
  }
}

/* Small MacBook */
@media (max-width: 1280px) {
  .mac-main-content {
    padding: 16px 20px;
  }

  .card-row {
    gap: 12px;
  }

  .split-layout {
    gap: 12px;
  }

  .card-value {
    font-size: 20px;
  }

  .card-label {
    font-size: 12px;
  }

  .card-trend {
    font-size: 11px;
  }

  .search-bar {
    width: 140px;
    font-size: 12px;
  }

  .table-header-title {
    font-size: 14px;
  }

  .t-row {
    font-size: 12px;
  }
}

/* Tablet / Small Window */
@media (max-width: 1024px) {
  .mac-topnav {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .top-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .card-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .split-layout {
    flex-direction: column;
  }

  .chart-container,
  .table-container {
    width: 100%;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .mac-sidebar {
    display: none;
  }

  .mac-main-content {
    padding: 16px;
  }

  .card-row {
    grid-template-columns: 1fr;
  }

  .top-actions {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .search-bar {
    width: 100%;
  }

  .greeting h2 {
    font-size: 20px;
  }

  .card-value {
    font-size: 24px;
  }

  .table-mock {
    overflow-x: auto;
  }
}
      `}</style>
    </div>
  );
};

export default AdminSandbox;
