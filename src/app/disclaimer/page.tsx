/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';

export default function Disclaimer() {
 return (
   <div className="min-h-screen bg-blue-50 text-gray-800 py-12">
     <div className="container mx-auto px-4 max-w-2xl">
       <h1 className="text-4xl font-bold mb-8 text-blue-800">Disclaimer</h1>
       <div className="bg-white shadow-md rounded-lg p-6">
         <p className="mb-4">
           {`"Spend Bill Gates' Money" is a simulation game created for entertainment and educational purposes only.
           The financial data and purchasing options presented in this game are fictional and do not reflect real-world
           availability, prices, or Bill Gates' actual net worth.`}
         </p>
         <p className="mb-4">
           {`This game is not affiliated with, endorsed by, or in any way officially connected with Bill Gates or any of his businesses or philanthropic endeavors.`}
         </p>
         <p className="mb-4">
           {`The creators of this game do not encourage or endorse any particular spending habits or financial decisions.
           Users should always consult with qualified financial advisors for real-world financial decisions.`}
         </p>
         <p className="mb-8">
           {`By using this website, you acknowledge that the information provided is for entertainment purposes only and
           should not be considered as financial advice.`}
         </p>
         <h2 className="text-2xl font-semibold mb-2">Contact</h2>
         <p>
           For any inquiries or concerns, please contact us at:{' '}
           <a href="mailto:techjits.com@gmail.com" className="text-blue-600 hover:underline">
             techjits.com@gmail.com
           </a>
         </p>
       </div>
       <div className="mt-8 text-center">
         <Link href="/" className="text-blue-600 hover:underline">
           Return to Spend Bill Gates' Money
         </Link>
       </div>
     </div>
   </div>
 );
}