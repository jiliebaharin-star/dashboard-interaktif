'use client'

import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Camera, Eye, Users, TrendingUp, CalendarDays, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const logo='https://dmedia.penerangan.gov.my/theme/img/logo/logojapenbig01.png'
const monthly = [
 {month:'Jan', borrowers:128, visitors:420, views:980}, {month:'Feb', borrowers:146, visitors:468, views:1120}, {month:'Mac', borrowers:162, visitors:512, views:1290}, {month:'Apr', borrowers:151, visitors:486, views:1210}, {month:'Mei', borrowers:178, visitors:555, views:1450}, {month:'Jun', borrowers:194, visitors:603, views:1680}, {month:'Jul', borrowers:216, visitors:648, views:1890}, {month:'Ogos', borrowers:231, visitors:702, views:2140}
]
const categories = [{name:'Peminjam',value:31},{name:'Pengunjung',value:42},{name:'MyFoto',value:27}]
const COLORS = ['#f59e0b','#14b8a6','#6366f1']

export default function Home() {
 const [period, setPeriod] = useState('8 Bulan')
 const [liveVisitors,setLiveVisitors]=useState<number|null>(null)
 useEffect(()=>{fetch('/api/live').then(r=>r.json()).then(d=>{if(typeof d.portalVisitors==='number')setLiveVisitors(d.portalVisitors)}).catch(()=>{})},[])
 const total = useMemo(() => ({ borrowers: monthly.at(-1)!.borrowers, visitors: liveVisitors ?? monthly.at(-1)!.visitors, views: monthly.at(-1)!.views }), [liveVisitors])
 return <main>
  <div className="shell">
   <header className="topbar"><div className="brand"><img src={logo} alt="Jabatan Penerangan Malaysia"/><div><div className="eyebrow">PUSAT SUMBER & FOTOGRAFI</div><h1>Dashboard Interaktif</h1><p>Ringkasan penggunaan Pusat Sumber dan koleksi digital MyFoto.</p></div></div><div className="controls"><span><CalendarDays size={16}/> 2026</span><select value={period} onChange={e=>setPeriod(e.target.value)}><option>8 Bulan</option><option>6 Bulan</option><option>3 Bulan</option></select></div></header>
   <section className="hero"><div><span className="pill">● LIVE STATISTIK</span><h2>Sehingga hari ini, <em>ramai yang datang.</em></h2><p>Dashboard awam yang santai untuk melihat capaian Pusat Sumber, pengunjung dan MyFoto.</p></div><div className="hero-mark"><Camera size={54}/><strong>MyFoto</strong><small>Arkib foto digital</small></div></section>
   <section className="cards">
    <Stat icon={<BookOpen/>} label="Peminjam" value={total.borrowers.toLocaleString()} delta="data pusat sumber" note="" />
    <Stat icon={<Users/>} label="Pengunjung" value={total.visitors.toLocaleString()} delta={liveVisitors?'LIVE':'data contoh'} note={liveVisitors?'portal Pusat Sumber':'menunggu data fizikal'} />
    <Stat icon={<Eye/>} label="View MyFoto" value={total.views.toLocaleString()} delta="data MyFoto" note="" />
   </section>
   <section className="grid">
    <div className="panel wide"><div className="panelhead"><div><h3>Trend penggunaan</h3><span>Peminjam, pengunjung & paparan MyFoto</span></div><TrendingUp size={20}/></div><div className="chart"><ResponsiveContainer width="100%" height={300}><LineChart data={monthly}><CartesianGrid vertical={false} strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Line type="monotone" dataKey="borrowers" stroke="#f59e0b" strokeWidth={3} dot={false}/><Line type="monotone" dataKey="visitors" stroke="#14b8a6" strokeWidth={3} dot={false}/><Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></div><div className="legend"><span><i className="amber"/>Peminjam</span><span><i className="teal"/>Pengunjung</span><span><i className="indigo"/>MyFoto</span></div></div>
    <div className="panel"><div className="panelhead"><div><h3>Komposisi aktiviti</h3><span>Agihan keseluruhan</span></div></div><div className="pie"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={categories} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>{categories.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="piecenter"><strong>100%</strong><small>aktiviti</small></div></div><div className="catlist">{categories.map((c,i)=><div key={c.name}><span><i style={{background:COLORS[i]}}/>{c.name}</span><b>{c.value}%</b></div>)}</div></div>
   </section>
   <section className="panel"><div className="panelhead"><div><h3>Perbandingan bulanan</h3><span>Jumlah aktiviti mengikut bulan</span></div><ArrowUpRight size={20}/></div><div className="chart"><ResponsiveContainer width="100%" height={270}><BarChart data={monthly}><CartesianGrid vertical={false} strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="borrowers" name="Peminjam" fill="#f59e0b" radius={[6,6,0,0]}/><Bar dataKey="visitors" name="Pengunjung" fill="#14b8a6" radius={[6,6,0,0]}/><Bar dataKey="views" name="MyFoto" fill="#6366f1" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></section>
   <footer>Jabatan Penerangan Malaysia • Pusat Sumber dan Fotografi • <a href="https://psf.penerangan.gov.my/">Portal Pusat Sumber</a> • <a href="https://myfoto.penerangan.gov.my/">MyFoto</a></footer>
  </div>
 </main>
}
function Stat({icon,label,value,delta,note}:{icon:React.ReactNode,label:string,value:string,delta:string,note:string}) { return <div className="stat"><div className="staticon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small><b>{delta}</b> {note}</small></div></div> }