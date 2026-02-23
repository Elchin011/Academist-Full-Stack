"use client";
import { QueryProviders } from "@/Providers/QueryProviders";
import { CartProvider } from "@/Providers/CartProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, ShoppingBag, Calendar, User, LogOut } from "lucide-react";
import "@/app/globals.css";

const items = [
    { title: "My Courses", url: "/my-courses", icon: BookOpen },
    { title: "My Orders", url: "/orders", icon: ShoppingBag },
    { title: "My Appointments", url: "/appointments", icon: Calendar },
    { title: "Profile", url: "/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "null")
            : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
    };

    return (
        <html lang="en">
            <body>
                <QueryProviders>
                    <CartProvider>
                        <div className="flex min-h-screen bg-gray-100">
                            {/* Sidebar */}
                            <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
                                <div>
                                    {/* Header */}
                                    <h2 className="text-[13px] uppercase tracking-widest text-gray-400 font-semibold mb-4">
                                        User Dashboard
                                    </h2>

                                    {/* User info */}
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-8">
                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[16px] font-bold">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-gray-800">
                                                {user?.name || "User"}
                                            </p>
                                            <p className="text-[11px] text-gray-400">
                                                {user?.email || ""}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <ul className="flex flex-col gap-2">
                                        {items.map((item) => (
                                            <li key={item.title}>
                                                <Link
                                                    href={item.url}
                                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-[15px] font-medium transition ${pathname === item.url
                                                        ? "bg-black text-white"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <item.icon size={18} />
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                                <div>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-md hover:bg-gray-100 text-[15px] text-black transition"
                                    >
                                        <Link
                                            href="/"
                                        >
                                            Back to Home
                                        </Link>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[15px] font-medium text-red-500 hover:bg-red-50 transition"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>

                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-8">{children}</div>
                        </div>
                    </CartProvider>
                </QueryProviders>
            </body>
        </html>
    );
}