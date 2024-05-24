import Image from 'next/image'
 
export function Avatar() {
  return <Image src={`/avatar.png`} alt="Avatar" width="64" height="64" className='rounded-full border-2 border-slate-400'/>
}

export function AvatarSkeleton() {
  return <div className='h-16 w-16 bg-slate-200 rounded-full animate-pulse'></div>
}