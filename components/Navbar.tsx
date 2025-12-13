import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full py-6 px-4 md:px-12 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-primary"
                    >
                        <path d="M20 6h-4V4c0-1.1-0.9-2-2-2h-4c-1.1 0-2 0.9-2 2v2H4c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V8c0-1.1-0.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">NeoBreath Guard</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                <Link href="#motivation" className="hover:text-white transition-colors">
                    Motivation
                </Link>
                <Link href="#technology" className="hover:text-white transition-colors">
                    Technology
                </Link>
                <Link href="#impact" className="hover:text-white transition-colors">
                    Impact
                </Link>
                <Link
                    href="#support"
                    className="bg-primary hover:bg-green-600 text-black px-5 py-2 rounded-full font-semibold transition-colors"
                >
                    Support Us
                </Link>
            </div>
        </nav>
    );
}
