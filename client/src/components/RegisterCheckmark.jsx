export default function RegisterCheckmark({ isAdmin, setAdmin }) {
    return (
            <div className="rounded-xl">
                <div className="flex items-center pt-1">
                <input
                type='checkbox'
                id='admin'
                name='admin'
                className=' peer hidden'
                checked={isAdmin}
                onChange={(e) => setAdmin(e.target.checked)}
                />
                <label
                htmlFor="admin"
                className='select-none cursor-pointer rounded-2xl border-2 border-cyan-500
                p-2 font-bold text-cyan-500 transition-colors duration-200 ease-in-out peer-checked:bg-cyan-500  peer-checked:text-white peer-checked:border-cyan-600'>
                    ADMIN
                </label>
                </div>
            </div>
    );
}
