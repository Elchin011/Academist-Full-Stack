import PersonalSpecialtiesList from "@/features/Admin/Personals/Specialties";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";



export default function PersonsSpecialtiesPage() {
    return (
        <div className="container mx-auto p-4">
            <button>
                <Link href="/admin/personals" className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <ArrowBigLeft size={23} className="inline-block" />
                </Link>
            </button>
            <PersonalSpecialtiesList />
        </div>
    );
}
