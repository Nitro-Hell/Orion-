import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'CodeSphere - AI-Powered Coding & Engineering Platform',
  description: 'Think. Code. Debug. Engineer. AI-powered coding workspace, firmware lab, code doctor, and learning arena.',
  openGraph: {
    title: 'CodeSphere - AI-Powered Coding & Engineering Platform',
    description: 'Think. Code. Debug. Engineer. AI-powered coding workspace, firmware lab, code doctor, and learning arena.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeSphere - AI-Powered Coding & Engineering Platform',
    description: 'Think. Code. Debug. Engineer. AI-powered coding workspace, firmware lab, code doctor, and learning arena.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className="bg-[#0b0f19] text-slate-100 font-sans antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
