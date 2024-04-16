import Image from 'next/image'
 
export function Avatar() {
  return <Image src={`/avatar.png`} alt="Avatar" width="64" height="64" className='rounded-full border-2 border-slate-400'/>
}