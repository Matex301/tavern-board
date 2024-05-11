'use server'
 
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function Page() {
    revalidatePath('/main'); // Update cached posts
    redirect('/main'); // Navigate to the new post page
    return (
        <div className="">

        </div>
    );
}