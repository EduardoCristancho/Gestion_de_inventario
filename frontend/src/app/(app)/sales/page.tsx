'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import FindClient from "@/components/sale/findClient";
export default function Sales() {
  const [client, setClient] = useState({});
  const [displayFindClient, setDisplayFindClient] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push('/sales/salesRecords'); // Redirección programática
  };
  return (
          <div className="text-globalone flex justify-evenly ">
            <div className="flex justify-evenly gap-8 items-center">
              <h1>sales</h1>
              <button className='rounded-xl w-6/10 p-1 mt-2 self-center bg-[var(--color-success)] text-white font-semibold' onClick={() => setDisplayFindClient(true)}>Select Client</button>
              <button className="rounded-xl w-6/10 p-1 mt-2 self-center bg-[var(--color-success)] text-white font-semibold" onClick={handleClick}> sales Records</button>
            </div>
            {
              displayFindClient && (
                <div className="fixed inset-0 z-100  opacity-100  backdrop-blur-sm   flex items-center justify-center ">
                  <FindClient setClient={setClient} setDisplayFindClient={setDisplayFindClient} />
                </div>
              )
            }
          </div>
  )
}
