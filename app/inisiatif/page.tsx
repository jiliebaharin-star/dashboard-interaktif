'use client'

import './inisiatif.css'

import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'

type Initiative = { title:string; category:string; description:string; tags:string[]; link:string }
type Question = { text:string; options:string[]; answer:number; explanation:string }

const initiatives: Initiative[] = [
 {title:'Sumbangan Tunai Rahmah (STR)',category:'Keluarga',description:'Bantuan kewangan tunai secara terus kepada golongan yang memenuhi syarat, termasuk isi rumah, warga emas tiada pasangan dan bujang.',tags:['STR','Bantuan Tunai','Kos Sara Hidup'],link:'https://bantuantunai.hasil.gov.my/'},
 {title:'Sumbangan Asas Rahmah (SARA)',category:'Keluarga',description:'Bantuan untuk pembelian barangan keperluan asas melalui MyKad bagi penerima yang memenuhi syarat.',tags:['SARA','MyKad','Keperluan Asas'],link:'https://www.malaysia.gov.my/my/topics/sumbangan-asas-rahmah-sara'},
 {title:'BUDI MADANI Diesel',category:'Pekerja',description:'Subsidi diesel bersasar untuk rakyat yang layak. Mulai 1 September 2026, had kelayakan asas bulanan BUDI MADANI dinaikkan kepada 300 liter, tertakluk kepada kelayakan.',tags:['BUDI','Diesel','Subsidi'],link:'https://budimadani.gov.my/'},
 {title:'BUDI MADANI RON95 (BUDI95)',category:'Pekerja',description:'Mekanisme subsidi RON95 bersasar menggunakan MyKad bagi rakyat Malaysia yang layak.',tags:['BUDI95','RON95','MyKad'],link:'https://budimadani.gov.my/'},
 {title:'Bantuan Awal Persekolahan (BAP)',category:'Pelajar',description:'Bantuan one-off RM150 seorang untuk pelajar Tahun 1 hingga Tingkatan 5 atau setaraf bagi sesi persekolahan semasa.',tags:['BAP','Sekolah','RM150'],link:'https://www.malaysia.gov.my/my/categories/bantuan-kebajikan--kemudahan/bantuan-pendidikan/bantuan-sekolah-rendah'},
 {title:'Portal Ihsan MADANI',category:'Keluarga',description:'Platform sehenti untuk mencari bantuan dan inisiatif mengikut profil serta kategori seperti pendapatan, makanan, kesihatan, pendidikan, perumahan dan pengangkutan.',tags:['Carian Bantuan','Profil','Ihsan MADANI'],link:'https://www.malaysia.gov.my/my/topics/portal-ihsan-madani'},
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

const questions: Question[] = [
 {text:'Apakah tujuan utama Sumbangan Tunai Rahmah (STR)?',options:['Bantuan kewangan tunai kepada golongan yang memenuhi syarat','Subsidi pembelian buku sahaja','Diskaun tiket penerbangan','Bantuan khusus usahawan sahaja'],answer:0,explanation:'STR ialah bantuan kewangan tunai secara terus kepada golongan berpendapatan rendah yang memenuhi syarat.'},
 {text:'Bagaimanakah Sumbangan Asas Rahmah (SARA) digunakan oleh penerima yang layak?',options:['Melalui MyKad untuk membeli barangan keperluan asas','Melalui pasport di lapangan terbang','Dengan menukar kepada wang tunai di semua kedai','Hanya untuk membayar yuran universiti'],answer:0,explanation:'SARA dilaksanakan secara tanpa tunai dan bantuan dikreditkan ke MyKad untuk pembelian barangan yang diluluskan.'},
 {text:'Apakah yang berkaitan dengan BUDI MADANI Diesel?',options:['Subsidi diesel bersasar untuk rakyat yang layak','Bantuan persekolahan RM150','Bantuan tunai untuk pelajar IPT sahaja','Program perumahan negeri'],answer:0,explanation:'BUDI Diesel ialah mekanisme subsidi diesel bersasar bagi pemilik kenderaan diesel persendirian dan kategori lain yang ditetapkan.'},
 {text:'Mulai 1 September 2026, apakah perubahan pada had kelayakan asas bulanan BUDI MADANI?',options:['Dinaikkan kepada 300 liter','Diturunkan kepada 100 liter','Kekal pada 200 liter','Digantikan dengan kupon makanan'],answer:0,explanation:'Kementerian Kewangan memaklumkan had kelayakan asas bulanan BUDI MADANI dinaikkan daripada 200 liter kepada 300 liter mulai 1 September 2026.'},
 {text:'Apakah fungsi MyKad dalam pelaksanaan subsidi BUDI MADANI yang bersesuaian?',options:['Sebagai alat pengesahan kelayakan subsidi','Sebagai kad kredit kerajaan','Sebagai pengganti lesen memandu','Sebagai kad pendaftaran sekolah'],answer:0,explanation:'MyKad digunakan sebagai alat pengesahan kelayakan bagi mekanisme subsidi bersasar tertentu seperti BUDI95 dan BUDI Diesel.'},
 {text:'Berapakah kadar Bantuan Awal Persekolahan (BAP) yang dinyatakan di portal MyGovernment bagi 2026?',options:['RM150 seorang secara one-off','RM50 sebulan','RM300 setiap minggu','RM1,000 setahun untuk setiap keluarga'],answer:0,explanation:'Portal MyGovernment menyatakan BAP sebanyak RM150 seorang secara one-off bagi pelajar yang memenuhi kriteria.'},
 {text:'Jika anda tidak pasti bantuan yang sesuai dengan keadaan diri, apakah fungsi Portal Ihsan MADANI?',options:['Mencari bantuan mengikut profil dan kategori','Membayar bil elektrik sahaja','Membeli tiket kapal terbang','Membuat permohonan pasport sahaja'],answer:0,explanation:'Portal Ihsan MADANI menyediakan carian bantuan mengikut profil dan kategori seperti pendapatan, makanan, kesihatan, pendidikan, perumahan dan pengangkutan.'},
 {text:'Seorang rakyat mahu mengetahui bantuan kerajaan yang mungkin sesuai dengan profil dirinya. Apakah pendekatan paling tepat?',options:['Gunakan carian bantuan mengikut profil dan semak sumber rasmi','Pilih bantuan berdasarkan nama yang paling popular','Bergantung pada mesej WhatsApp tanpa semakan','Anggap semua bantuan terbuka kepada semua orang'],answer:0,explanation:'Kelayakan berbeza mengikut program. Carian mengikut profil dan semakan portal rasmi membantu pengguna mendapatkan maklumat yang lebih tepat.'},
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
