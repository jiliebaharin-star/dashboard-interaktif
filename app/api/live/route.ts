import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.MYFOTO_STATS_URL
  if (!url) return NextResponse.json({ portalVisitors: null, source: 'not-configured' })
  try {
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) throw new Error('upstream')
    const data = await res.json()
    return NextResponse.json({ portalVisitors: Number(data.portalVisitors ?? data.visitors ?? 0), source: 'configured' })
  } catch {
    return NextResponse.json({ portalVisitors: null, source: 'unavailable' })
  }
}