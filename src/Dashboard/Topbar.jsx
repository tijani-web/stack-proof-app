const TopBar = ({ username, xp }) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Hello, {username || 'user'}</h2>
        <p>Keep grinding — you’ve earned ⚡{xp ?? 0} XP!</p>
      </div>
      <div className="topbar-right">
        <div className="xp-badge">⚡{xp ?? 0}</div>
        <div className="avatar" style={{ background: '#444', color: '#fff', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{username?.[0]?.toUpperCase() || "User"}</div>
      </div>
    </div>
  );
};

export default TopBar;