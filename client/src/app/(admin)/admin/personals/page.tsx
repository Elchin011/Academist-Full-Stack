import PersonalList from "@/features/Admin/Personals";
import { LibraryBig } from "lucide-react";
import Link from "next/link";



export default function AdminPersonsPage() {
    return (
        <div className="container mx-auto p-4">
            <div>
                <Link href="/admin/personal-specialties">
                    <button className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        <LibraryBig size={18} /> Personal Specialties
                    </button>
                </Link>
            </div>
            <PersonalList />
        </div>
    );
}

