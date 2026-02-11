// "use client";

// const TITLE_TEXT = `
//  ██████╗ ███████╗████████╗████████╗███████╗██████╗
//  ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
//  ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
//  ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
//  ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
//  ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

//  ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
//  ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
//     ██║       ███████╗   ██║   ███████║██║     █████╔╝
//     ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
//     ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
//     ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
//  `;

// export default function Home() {
// 	return (
// 		<div className="container mx-auto max-w-3xl px-4 py-2">
// 			<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
// 			<div className="grid gap-6">
// 				<section className="rounded-lg border p-4">
// 					<h2 className="mb-2 font-medium font-sans">API Status</h2>
// 				</section>
// 			</div>
// 		</div>
// 	);
// }




import ProductGrid from "@/components/products/product-grid"
import { getProducts } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"

type Params = {
    searchParams: Promise<{
        page?: string
    }>
}

const StorePage = async (props: Params) => {

    const searchParams = await props.searchParams;

    const { page } = searchParams

    const pageNumber = page ? parseInt(page) : 1

    const region = await getRegion("es")

    console.log(region)

    if (!region) {
		console.log("error region")
        return null
    }

    const { products } = await getProducts({ page: pageNumber, region: region })

	console.log(products)

    return (
        <main className="relative flex h-screen w-screen flex-col flex-nowrap overflow-x-hidden overflow-y-auto scroll-smooth">
            <ProductGrid products={products} />
        </main>
    );
}

export default StorePage