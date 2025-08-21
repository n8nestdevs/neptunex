// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ItemProps = { to: string; label: string; icon?: React.ReactNode; collapsed: boolean };

const Item: React.FC<ItemProps> = ({ to, label, icon, collapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors ${
        isActive
          ? 'bg-navy-700 border-navy-600 text-slate-200'
          : 'bg-navy-800 border-navy-700 text-slate-300 hover:bg-navy-700'
      }`
    }
  >
    <span aria-hidden="true">{icon}</span>
    {!collapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { user } = useAuth();

  // restore preference
  useEffect(() => {
    const saved = localStorage.getItem('neptuno.sidebar.collapsed');
    if (saved === '1') setCollapsed(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('neptuno.sidebar.collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  const isSuperAdmin = user?.role === 'SuperAdmin';

  return (
    <aside
      className="shrink-0 border-r border-navy-700 bg-navy-800/60 hidden md:flex md:flex-col h-[calc(100vh-56px)]"
      style={{ width: collapsed ? 68 : 240 }}
    >
      {/* sidebar header */}
      <div className="p-3 flex items-center justify-between">
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-slate-300 text-sm px-2 py-1 rounded border border-navy-600 hover:bg-navy-700"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* contenido scrolleable */}
      <div className="flex-1 overflow-auto">
        {/* main nav */}
        <nav className="p-3 flex flex-col gap-2">
          <Item to="/"              label="Home"               icon={<span>🏠</span>} collapsed={collapsed} />
          <Item to="/tracking"      label="Tracking"           icon={<span>🛰️</span>} collapsed={collapsed} />
          <Item to="/shipment-log"  label="Shipment Log"       icon={<span>📦</span>} collapsed={collapsed} />
          <Item to="/checkpoints"   label="Checkpoints Alerts" icon={<span>🔔</span>} collapsed={collapsed} />
        </nav>

        {/* administration */}
        {isSuperAdmin && (
          <div className="mt-4 px-3">
            {!collapsed && (
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                Administration
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Item
                to="/superadmin"
                label="User management"
                icon={<span>🛠️</span>}
                collapsed={collapsed}
              />
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="p-3 text-slate-500 text-xs">
        {!collapsed && <div>Developed by n8nest.ai</div>}
      </div>
    </aside>
  );
};

export default Sidebar;