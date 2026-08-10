'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Upload, Download, ShieldCheck, CheckCircle2 } from 'lucide-react'
import '../globals.css'
import './admin.css'

const TEMPLATE=[['Bulan','Peminjam','Pengunjung','View MyFoto'],['Jan',128,420,980],['Feb',146,468,1120],['Mac',162,512,1290],['Apr',151,486,1210],['Mei',178,555,1450],['Jun',194,603,1680],['Jul',216,648,1890],['Ogos',231,702,2140]]

export default function Admin(){
 const [status,setStatus]=useState('')
 const [preview,setPreview]=useState<any[]>([])
 const [fileName,setFileName]=useState('')
 const downloadTemplate=()=>{const ws=XLSX.utils.aoa_to_sheet(TEMPLATE);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Statistik');XLSX.writeFile(wb,'template-statistik-psf.xlsx')}
 const handleFile=(file:File)=>{setFileName(file.name);const reader=new FileReader();reader.onload=e=>{const wb=XLSX.read(e.target?.result,{type:'array'});const ws=wb.Sheets[wb.SheetNames[0]];const rows=XLSX.utils.sheet_to_json(ws,{defval:''}) as any[];setPreview(rows);setStatus('Semakan berjaya. Klik Simpan Data untuk menggunakan data ini pada dashboard.')};reader.readAsArrayBuffer(file)}
 const save=()=>{if(!preview.length)return;localStorage.setItem('psf-dashboard-data',JSON.stringify(preview));localStorage.setItem('psf-dashboard-updated',new Date().toISOString());setStatus('✓ Data berjaya disimpan pada pelayar ini. Buka dashboard untuk melihat perubahan.')}
 return <main><div className="shell admin"><header className="topbar"><div><div className="eyebrow">PUSAT SUMBER & FOTOGRAFI</div><h1>Admin • Import Data</h1><p>Kemas kini statistik dashboard menggunakan fail Excel.</p></div><div className="adminbadge"><ShieldCheck size={17}/> ADMIN</div></header>
 <section className="panel importbox"><div className="importicon"><Upload/></div><h2>Import Excel</h2><p>Gunakan format: <b>Bulan, Peminjam, Pengunjung, View MyFoto</b>.</p><label className="upload"><Upload size={18}/> Pilih fail Excel<input type="file" accept=".xlsx,.xls" onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f)}}/></label>{fileName&&<div className="filename">{fileName}</div>}<div className="actions"><button onClick={downloadTemplate}><Download size={17}/> Muat Turun Template</button><button className="primary" disabled={!preview.length} onClick={save}><CheckCircle2 size={17}/> Simpan Data</button></div>{status&&<div className="status">{status}</div>}</section>
 {preview.length>0&&<section className="panel"><h3>Preview Data</h3><div className="tablewrap"><table><thead><tr>{Object.keys(preview[0]).map(k=><th key={k}>{k}</th>)}</tr></thead><tbody>{preview.slice(0,12).map((r,i)=><tr key={i}>{Object.values(r).map((v:any,j)=><td key={j}>{String(v)}</td>)}</tr>)}</tbody></table></div></section>}
 <section className="panel note"><b>Nota keselamatan:</b> halaman ini ialah modul pentadbiran. Untuk penggunaan rasmi berbilang pegawai, aktifkan authentication dan storan pangkalan data/cloud sebelum digunakan sebagai sistem pengeluaran.</section>
 </div></main>
}