import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='w-full min-h-[95vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 gap-4'>
        <h2 className='text-center uppercase font-medium text-[38px]'>Not Found</h2>
        <h2 className='text-center uppercase font-medium text-[32px]'>404</h2>
        <p className='text-center'>Could not find requested resource</p>
        <Link href="/" className='p-3 border text-center uppercase hover:bg-slate-100 dark:hover:bg-slate-700'>Return Home</Link>
      </div>
    </main>
  )
}