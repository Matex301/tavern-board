
export default function ErrorMessage({error}: {error: string}) {
    return (
        <p className='flex w-4/5 md:w-3/5 p-2 text-ellipsis overflow-hidden line-clamp-2 bg-red-300 rounded-lg outline outline-red-400 outline-2 text-sm text-gray-500 justify-center'>
            {error}
        </p>
    );
}