export default function AdminCheckMark() {
    return(        <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-24 h-10 rounded-xl mt-2">
                        <div className="absolute inset-1 bg-white rounded-xl">
                            <div className="flex items-center pt-1">
                                <input type="checkbox" id="ch1" name="admin" className="ml-2" onChange={(e) => setAdmin(e.target.value)}></input>
                                <label htmlFor="admin" className="pl-1 flex self-center">ADMIN</label>
                            </div>

                        </div>
                    </div>);
}