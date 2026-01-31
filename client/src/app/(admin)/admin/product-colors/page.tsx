import ProductColorsList from "@/features/Admin/Products/Colors";
import { ArrowBigLeft } from "lucide-react";

export default function ProductColorPage() {
    return (
        <div className="container mx-auto p-4">
            <button>
                <a href="/admin/products" className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <ArrowBigLeft size={23} className="inline-block" />
                </a>
            </button>
            <ProductColorsList />
        </div>
    );
}