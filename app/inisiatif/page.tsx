'use client'

import { useState } from 'react'
import './inisiatif.css'

const data = [
  {name:'STR', cat:'Keluarga', info:'Sumbangan Tunai Rahmah untuk penerima yang memenuhi syarat.', url:'https://bantuantunai.hasil.gov.my/'},
  {name:'SARA', cat:'Keluarga', info:'Bantuan barangan keperluan asas melalui MyKad bagi penerima yang layak.', url:'https://www.malaysia.gov.my/my/topics/sumbangan-asas-rahmah-sara'},
  {name:'BUDI Diesel', cat:'Pekerja', info:'Subsidi diesel bersasar untuk kategori rakyat yang layak.', url:'https://budimadani.gov.my/'},
  {name:'BUDI95', cat:'Pekerja', info:'Subsidi RON95 bersasar menggunakan pengesahan MyKad bagi rakyat yang layak.', url:'https://budimadani.gov.my/'},
  {name:'Bantuan Awal Persekolahan', cat:'Pelajar', info:'Bantuan one-off RM150 seorang bagi pelajar yang memenuhi syarat.', url:'https://www.malaysia.gov.my/'},
  {name:'Portal Ihsan MADANI', cat:'Semua', info:'Carian bantuan kerajaan mengikut profil dan kategori keperluan.', url:'https://www.malaysia.gov.my/my/topics/portal-ihsan-madani'}
]

const questions = [
  ['Apakah tujuan utama STR?',['Bantuan kewangan kepada penerima yang layak','Bantuan tiket penerbangan','Bantuan buku sahaja'],0],
  ['Bagaimanakah SARA digunakan?',['Melalui MyKad untuk barangan asas','Melalui pasport','Untuk tiket bas sahaja'],0],
  ['BUDI Diesel berkaitan dengan apa?',['Subsidi diesel bersasar','Bantuan sekolah','Bantuan perumahan'],0],
  ['Apakah BUDI95?',['Subsidi RON95 bersasar','Bantuan tunai sekolah','Pinjaman perniagaan'],0],
  ['Berapakah Bantuan Awal Persekolahan?',['RM150 one-off','RM50 sebulan','RM1,000 sebulan'],0]
] as const

export default function Page() {
  const [mode,setMode] = useState<'home'|'quiz'|'list'>('home')
  const [cat,setCat] = useState('Semua')
  const [q,setQ] = useState(0)
  const [score,setScore] = useState(0)
  const [picked,setPicked] = useState<number|null>(null)

  const filtered = data.filter(x => cat === 'Semua' || x.cat === cat || (cat === 'Keluarga' && x.cat === 'Semua'))

  function start(){ setQ(0); setScore(0); setPicked(null); setMode('quiz') }
  function answer(i:number){
    if(picked !== null) return
    setPicked(i)
    if(i === questions[q][2]) setScore(s=>s+1)
  }
  function next(){
    if(picked === null) return
    if(q === questions.length-1) { setMode('home'); return }
    setQ(q+1); setPicked(null)
  }

  if(mode === 'quiz'){
    const item=questions[q]
    return <main className="simple-app"><div className="simple-card">
      <button className="simple-back" onClick={()=>setMode('home')}>← Kembali</button>
      <p className="eyebrow">QUIZ INISIATIF KERAJAAN</p>
      <div className="quiz-count">Soalan {q+1} / {questions.length} · ⭐ {score}</div>
      <h1>{item[0]}</h1>
      <div className="answers">{item[1].map((x,i)=><button key={x} onClick={()=>answer(i)} className={picked===i ? (i===item[2]?'right':'wrong') : ''}>{x}</button>)}</div>
      {picked !== null && <p className="feedback">{picked===item[2]?'✅ Jawapan tepat!':'❌ Jawapan kurang tepat.'}</p>}
      <button className="simple-primary" disabled={picked===null} onClick={next}>{q===questions.length-1?'Selesai':'Soalan Seterusnya →'}</button>
    </div></main>
  }

  return <main className="simple-app"><div className="simple-card">
    <p className="eyebrow">🇲🇾 KENALI INISIATIF KERAJAAN</p>
    <h1>Apa yang anda perlukan?</h1>
    <p className="intro">Kenali bantuan utama kerajaan melalui kuiz ringkas dan carian mengikut kategori.</p>
    <div className="category-row">{['Semua','Pelajar','Keluarga','Pekerja'].map(x=><button key={x} onClick={()=>{setCat(x);setMode('list')}} className={cat===x?'selected':''}>{x}</button>)}</div>
    <button className="simple-primary" onClick={start}>🎯 Mula Quiz</button>
    <button className="simple-secondary" onClick={()=>setMode('list')}>🔎 Lihat Inisiatif</button>
    {mode==='list' && <section className="list-section">
      <div className="list-head"><h2>Inisiatif Utama</h2><button onClick={()=>setMode('home')}>Tutup</button></div>
      {filtered.map(x=><article className="initiative" key={x.name}><span>{x.cat}</span><h3>{x.name}</h3><p>{x.info}</p><a href={x.url} target="_blank" rel="noreferrer">Semak sumber rasmi →</a></article>)}
    </section>}
  </div></main>
}
