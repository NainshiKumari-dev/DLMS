import React from 'react';
export default function StatCard({label,value,icon:Icon,tone='blue',hint}) { return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={21}/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong>{hint&&<small>{hint}</small>}</div></div> }
