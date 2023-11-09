import React from 'react';

const Test = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900	">
      <div className="bg-zinc-800 text-white relative p-8 rounded-xl shadow-2xl w-96 grid gap-5">
        <div className='relative flex justify-center'>
            <div className='absolute '>
                <h2 className="text-8xl mb-6 text-center relative z-10 -top-24 text-shadow-lg shadow-black font-bold ">LOGIN</h2>
            </div>
        </div>
        <div className="absolute top-0 inset-x-0 flex justify-center -mt-5">
        {/*
          <div className="bg-gray-800 text-white px-4 py-1 rounded-tl rounded-tr">
            LOGIN
          </div>
        */}
        </div>
        <div className='grid gap-4 relative top-4'>
            <div className="mb-4 relative">
            <input type="text" id="username" name="username"  
            className="pl-3 py-2 w-full rounded-lg bg-white text-slate-400 border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 "/>
            <div className="absolute -left-8 -top-6 mb-8 ml-3 ">
                <div className="bg-gradient-to-r from-[#D92B04] to-[#F27405] text-white px-3 py-1 rounded-2xl ">USERNAME</div>
            </div>
            </div>
            <div className="mb-6 relative">
            <input type="password" id="password" name="password" className="pl-3 py-2 w-full border-2 border-orange-500 border-gradient-to-r from-[#D92B04] to-[#F27405]  rounded-lg bg-white text-slate-400	
	 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
            <div className="absolute -left-8 -top-8 mt-2 ml-3">
                <div className="bg-gradient-to-r from-[#D92B04] to-[#F27405] text-white px-3 py-1 rounded-2xl">PASSWORD</div>
            </div>
            </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-white hover:text-orange-500 text-black font-bold py-2 px-4 rounded-lg">New?</button>
          <button className="bg-gradient-to-r from-[#D92B04] to-[#F27405] 
          relative before:absolute 
          hover:before:inset-0 hover:before:h-full hover:before:w-full
          hover:before:bg-gradient-to-r hover:before:from-[#D92B04] before:to-[#F27405]
          before:blur-lg
          text-white font-bold py-2 px-4 rounded-lg ">Login</button>
          <input
          type='checkbox'
          id='admin'
          name='admin'
          className='w-20 h-18 peer hidden'
          checked={isAdmin}
          onChange={(e) => setAdmin(e.target.checked)}
          >
          </input>
          <label
          for="admin"
          htmlFor='admin'
          className=' select-none cursor-pointer rounded-lg border-2 border-white
          py-3 px-6 font-bold text-white transition-colors duration-200 ease-in-out peer-checked:bg-gradient-to-r from-[#D92B04] to-[#F27405]  peer-checked:text-white peer-checked:border-orange-500'>
            ADMIN
          </label>
        </div>
      </div>
    </div>
  );
}

export default Test;
