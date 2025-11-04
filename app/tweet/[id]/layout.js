
import { Suspense } from 'react';
import '../../globals.css';
export default function TweetLayout({ children }) {
  return (
    <main className={'flex flex-col min-h-screen   ml-[60px] sm:ml-[150px] pt-5 sm:pt-5 p-15 pb-20 sm:p-20'}>
      {/* every page of the web app will be wrapped in this layout */}
      <div className="mb-6 bg-amber-100">Tweet Details Layout</div>
      <Suspense fallback={<div>Loading tweet details...</div>}>

        {children}
      </Suspense>
    </main>
  );
}