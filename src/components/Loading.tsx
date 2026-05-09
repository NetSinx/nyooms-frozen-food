import gsap from "gsap";
import React, { useEffect } from "react";

export const Loading: React.FC = () => {
  useEffect(() => {
    gsap.to(".spinner", {rotate: 360, repeat: -1, duration: 1})
  }, [])

  return (
    <>
      <div className="fixed bg-black opacity-60 z-[99] w-full h-screen"></div>
      <div className="flex justify-center w-full h-screen items-center fixed z-[99]">
        <div className="rounded-lg bg-slate-200 flex w-[30%] h-60 flex-col gap-4 items-center justify-center">
          <p className="text-2xl font-bold">Loading...</p>
          <div className="spinner border-4 border-r-gray-300 border-b-gray-300 w-20 h-20 border-orange-600 rounded-full"></div>
        </div>
      </div>
    </>
  )
}

