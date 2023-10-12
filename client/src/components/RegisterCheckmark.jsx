export default function RegisterCheckmark({ isAdmin, setAdmin }) {
    return (
        <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-24 h-10 rounded-xl mt-2">
            <div className="absolute inset-1 bg-white rounded-xl">
                <div className="flex items-center pt-1">
                    <input
                        type="checkbox"
                        id="admin"
                        name="admin"
                        className="ml-2"
                        checked={isAdmin}
                        onChange={(e) => setAdmin(e.target.checked)}
                    />
                    <label htmlFor="admin" className="pl-1 flex self-center">
                        ADMIN
                    </label>
                </div>
            </div>
        </div>
    );
}
