import ProductList from "@/features/Admin/Products";

export default function AdminShopPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex gap-4 mb-10">
                <button>
                    <a href="/admin/product-sizes" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Product Sizes
                    </a>
                </button>
                <button>
                    <a href="/admin/product-colors" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Product Colors
                    </a>
                </button>
                <button>
                    <a href="/admin/product-categories" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Product Categories
                    </a>
                </button>
            </div>
            <ProductList />

        </div>
    );
}   