'use client'

import './inisiatif.css'

import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'

type Initiative = { title:string; category:string; description:string; tags:string[]; link:string }
type Question = { text:string; options:string[]; answer:number; explanation:string }

const initiatives: Initiative[] = [
 {title:'Latihan & Peningkatan Kemahiran',category:'Pekerja',description:'Cari program latihan, peningkatan kemahiran dan pembangunan kerjaya yang bersesuaian dengan keadaan anda.',tags:['Latihan','Kemahiran','Kerjaya'],link:'https://www.malaysia.gov.my/'},
 {title:'Sokongan Pendidikan',category:'Pelajar',description:'Semak maklumat dan saluran rasmi berkaitan pendidikan, bantuan dan peluang pembelajaran.',tags:['Pendidikan','Pelajar'],link:'https://www.malaysia.gov.my/'},
 {title:'Sokongan Usahawan & PKS',category:'Usahawan',description:'Kenali saluran rasmi untuk mendapatkan maklumat berkaitan pembiayaan, latihan dan sokongan perniagaan.',tags:['Perniagaan','PKS','Usahawan'],link:'https://www.malaysia.gov.my/'},
 {title:'Bantuan Mengikut Situasi Kehidupan',category:'Keluarga',description:'Gunakan carian situasi untuk mengenal pasti perkhidmatan kerajaan yang mungkin berkaitan dengan keperluan anda.',tags:['Keluarga','Bantuan','Perkhidmatan'],link:'https://www.malaysia.gov.my/'},
]

const questions: Question[] = [
 {text:'Anda ingin meningkatkan kemahiran untuk peluang pekerjaan yang lebih baik. Apakah kategori yang paling sesuai diterokai?',options:['Latihan dan kemahiran','Pelancongan sahaja','Sukan kompetitif','Pengangkutan awam'],answer:0,explanation:'Program latihan dan peningkatan kemahiran berkait terus dengan pembangunan kompetensi dan kerjaya.'},
 {text:'Anda seorang pelajar yang mahu mencari maklumat rasmi berkaitan peluang pendidikan. Di mana patut anda bermula?',options:['Sumber rasmi kerajaan','Komen rawak media sosial','Iklan tanpa sumber','Mesej berantai'],answer:0,explanation:'Sumber rasmi membantu memastikan maklumat, syarat dan saluran permohonan datang daripada pihak berautoriti.'},
 {text:'Seorang usahawan kecil mahu mengetahui sokongan yang mungkin tersedia untuk perniagaan. Apakah pendekatan paling sesuai?',options:['Cari mengikut kategori usahawan/PKS','Hanya bertanya kepada rakan','Terus percaya poster tanpa pautan','Tidak perlu semak syarat'],answer:0,explanation:'Carian mengikut kategori dan semakan sumber rasmi memudahkan pengguna mengenal pasti program yang relevan.'},
 {text:'Apakah cara paling selamat untuk mengesahkan dakwaan tentang sesuatu inisiatif kerajaan?',options:['Semak portal atau agensi rasmi','Kongsi dahulu dan semak kemudian','Bergantung pada jumlah likes','Percaya mesej WhatsApp semata-mata'],answer:0,explanation:'Maklumat rasmi daripada portal atau agensi berkaitan ialah rujukan utama untuk mengesahkan butiran sesuatu inisiatif.'},
 {text:'Jika anda tidak tahu nama sesuatu bantuan tetapi tahu keperluan anda, apakah ciri aplikasi yang paling membantu?',options:['Carian berasaskan situasi','Senarai nama sahaja','Animasi tanpa maklumat','Skor tanpa penerangan'],answer:0,explanation:'Carian berasaskan situasi membolehkan pengguna bermula dengan keperluan, bukan perlu mengetahui nama program terlebih dahulu.'},
]

const profiles=['Semua','Pelajar','Keluarga','Pekerja','Usahawan']

export default function InisiatifApp(){
 const [screen,setScreen]=useState<'home'|'quiz'|'result'|'discover'|'achievement'>('home')
 const [profile,setProfile]=useState('Semua')
 const [q,setQ]=useState(0)
 const [score,setScore]=useState(0)
 const [selected,setSelected]=useState<number|null>(null)
 const [search,setSearch]=useState('')

 const filtered=useMemo(()=>initiatives.filter(x=>(profile==='Semua'||x.category===profile)&&((x.title+' '+x.description+' '+x.tags.join(' ')).toLowerCase().includes(search.toLowerCase()))),[profile,search])
 const badge=score>=5?'Penjelajah Inisiatif':score>=3?'Warganegara Aktif':'Pencari Maklumat'

 function startQuiz(){setQ(0);setScore(0);setSelected(null);setScreen('quiz')}
 function choose(i:number){if(selected!==null)return;setSelected(i);if(i===questions[q].answer)setScore(s=>s+1)}
 function next(){if(selected===null)return;if(q===questions.length-1){setScreen('result');return}setQ(v=>v+1);setSelected(null)}

 return <main className="initiative-app">
   <div className="mobile-frame">
    {screen==='home' && <Home profile={profile} setProfile={setProfile} startQuiz={startQuiz} discover={()=>setScreen('discover')}/>}
    {screen==='quiz' && <Quiz q={q} score={score} selected={selected} choose={choose} next={next}/>}
    {screen==='result' && <Result score={score} badge={badge} restart={startQuiz} discover={()=>setScreen('discover')}/>}
    {screen==='discover' && <Discover profile={profile} setProfile={setProfile} search={search} setSearch={setSearch} items={filtered} back={()=>setScreen('home')}/>}
    {screen==='achievement' && <Achievement score={score} badge={badge} startQuiz={startQuiz}/>} 
    <BottomNav screen={screen} go={(s)=>setScreen(s)} startQuiz={startQuiz}/>
   </div>
 </main>
}

function Home({profile,setProfile,startQuiz,discover}:{profile:string;setProfile:(x:string)=>void;startQuiz:()=>void;discover:()=>void}){
 return <div className="ia-page">
  <div className="ia-hero">
   <div className="ia-brand"><span className="ia-logo">MY</span><span>KENALI INISIATIF<br/><b>KERAJAAN</b></span></div>
   <span className="ia-spark">✨</span>
   <p className="ia-kicker">MAKLUMAT • SEMAK • FAHAM</p>
   <h1>Apa yang anda<br/><em>perlukan?</em></h1>
   <p className="ia-lead">Temui inisiatif kerajaan melalui soalan ringkas dan carian mengikut situasi kehidupan anda.</p>
  </div>
  <section className="ia-section"><h2>Pilih kategori anda</h2><div className="profile-grid">{profiles.map(p=><button key={p} className={profile===p?'profile active':'profile'} onClick={()=>setProfile(p)}>{p==='Semua'?'🇲🇾':p==='Pelajar'?'🎓':p==='Keluarga'?'👨‍👩‍👧':p==='Pekerja'?'💼':'🏪'}<span>{p}</span></button>)}</div></section>
  <section className="ia-actions"><button className="primary-btn" onClick={startQuiz}><span>🎯 Mula Quiz</span><ChevronRight/></button><button className="secondary-btn" onClick={discover}>🔎 Cari Inisiatif</button></section>
  <div className="ia-trust">🇲🇾 Direka untuk memudahkan rakyat mencari maklumat yang relevan</div>
 </div>
}

function Quiz({q,score,selected,choose,next}:{q:number;score:number;selected:number|null;choose:(i:number)=>void;next:()=>void}){
 const item=questions[q]
 return <div className="ia-page quiz-page">
  <div className="quiz-top"><button className="back-btn" onClick={()=>location.reload()}>←</button><div><b>Kenali Inisiatif</b><small>Soalan {q+1} daripada {questions.length}</small></div><span className="score-pill">⭐ {score}</span></div>
  <div className="progress"><span style={{width:`${((q+1)/questions.length)*100}%`}}/></div>
  <div className="question-card"><span className="question-no">0{q+1}</span><h2>{item.text}</h2><div className="answers">{item.options.map((o,i)=><button key={o} className={selected===i?`answer ${i===item.answer?'correct':'wrong'}`:'answer'} onClick={()=>choose(i)}>{o}<span>{selected!==null&&i===item.answer?'✅':selected===i?'❌':''}</span></button>)}</div></div>
  {selected!==null&&<div className="feedback"><span>💡</span><div><b>{selected===item.answer?'Tepat!':'Teruskan belajar.'}</b><p>{item.explanation}</p></div></div>}
  <button className="primary-btn next-btn" disabled={selected===null} onClick={next}><span>{q===questions.length-1?'🏆 Lihat Keputusan':'➡️ Soalan Seterusnya'}</span></button>
 </div>
}

function Result({score,badge,restart,discover}:{score:number;badge:string;restart:()=>void;discover:()=>void}){
 return <div className="ia-page result-page"><div className="result-icon">🏆</div><p className="ia-kicker">TAHNIAH!</p><h1>Anda mendapat<br/><em>{score}/{questions.length}</em></h1><div className="badge-card"><span>🏅</span><div><small>BADGE DITERIMA</small><strong>{badge}</strong></div></div><p className="result-copy">Teruskan meneroka. Lagi banyak anda kenal pasti keperluan dan sumber rasmi, lagi mudah anda mencari maklumat yang berkaitan.</p><button className="primary-btn" onClick={discover}><span>🔎 Teroka Inisiatif</span><ChevronRight/></button><button className="text-btn" onClick={restart}>Main semula</button></div>
}

function Achievement({score,badge,startQuiz}:{score:number;badge:string;startQuiz:()=>void}){
 return <div className="ia-page achievement-page"><div className="achievement-hero"><span>🏆</span><p className="ia-kicker">PENCAPAIAN ANDA</p><h1>Teruskan<br/><em>meneroka.</em></h1></div><div className="achievement-card"><div><small>SKOR TERKINI</small><strong>{score}/{questions.length}</strong></div><div><small>BADGE</small><strong>🏅 {badge}</strong></div></div><p className="result-copy">Lengkapkan kuiz dan terokai lebih banyak maklumat untuk membina pengetahuan anda tentang perkhidmatan serta inisiatif kerajaan.</p><button className="primary-btn" onClick={startQuiz}><span>🎯 Cuba Quiz Lagi</span><ChevronRight/></button></div>
}

function BottomNav({screen,go,startQuiz}:{screen:string;go:(s:'home'|'discover'|'achievement')=>void;startQuiz:()=>void}){
 return <nav className="bottom-nav" aria-label="Navigasi utama"><button className={screen==='home'?'nav-item active':'nav-item'} onClick={()=>go('home')}><span>🏠</span><small>Utama</small></button><button className={screen==='discover'?'nav-item active':'nav-item'} onClick={()=>go('discover')}><span>🔎</span><small>Cari</small></button><button className={screen==='quiz'?'nav-item active quiz-nav':'nav-item quiz-nav'} onClick={startQuiz}><span>🎯</span><small>Quiz</small></button><button className={screen==='achievement'||screen==='result'?'nav-item active':'nav-item'} onClick={()=>go('achievement')}><span>🏆</span><small>Pencapaian</small></button></nav>
}

function Discover({profile,setProfile,search,setSearch,items,back}:{profile:string;setProfile:(x:string)=>void;search:string;setSearch:(x:string)=>void;items:Initiative[];back:()=>void}){
 return <div className="ia-page discover-page"><div className="quiz-top"><button className="back-btn" onClick={back}>←</button><div><b>Teroka Inisiatif</b><small>Maklumat untuk anda</small></div></div><div className="search-box">🔎<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Contoh: latihan, pelajar, usahawan..." /></div><div className="chips">{profiles.map(p=><button key={p} className={profile===p?'chip active':'chip'} onClick={()=>setProfile(p)}>{p}</button>)}</div><div className="initiative-list">{items.map(x=><article key={x.title} className="initiative-card"><span className="category">{x.category}</span><h3>{x.title}</h3><p>{x.description}</p><div className="tags">{x.tags.map(t=><span key={t}>{t}</span>)}</div><a href={x.link} target="_blank" rel="noreferrer">🔗 Semak sumber rasmi →</a></article>)}</div>{items.length===0&&<div className="empty">Tiada padanan ditemui. Cuba kata kunci atau kategori lain.</div>}</div>
}
