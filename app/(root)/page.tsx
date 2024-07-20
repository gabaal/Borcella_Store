import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image
        src="/banner.png"
        alt="Banner"
        width={2000}
        height={1000}
        className="w-screen"
      />
      <Collections />
      <ProductList />
    </>
  );
}
