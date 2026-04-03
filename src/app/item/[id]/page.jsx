import Image from 'next/image';
import Link from 'next/link';
import netData from '@/data/primeumdata.json';
import PackageSelector from '@/componets/layouts/packageselector/PackageSelector';

const PremiumDetails = async ({ params }) => {
  const { id } = await params;

 const premium = netData.find((p) => p.id.toString() === id);
  // Related Products
  const relatedPremium = netData
    .filter((p) => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Main Section */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2 relative aspect-video lg:aspect-auto">
            <Image src={premium?.image} alt={premium.title} fill className="object-cover" priority />
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{premium?.title}</h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-400 mt-3">{premium?.subTitle}</p>

            {/* Price Range */}
            <div className="mt-6">
              <span className="text-pink-500 text-2xl font-semibold">৳ {premium?.price}</span>
            </div>

            {/* Package Selector */}
            <div className="mt-10">
              <PackageSelector packages={premium?.reRecharge} type='premium' />
            </div>

            {/* Rules */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-white mb-4">Rules</h3>
              <ul className="space-y-3 text-gray-300">
                {premium?.Rules.map((rule, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-pink-500">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Section */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">You May Also Like</h2>

          <Link
            href="/game"
            className="text-pink-500 hover:text-pink-400 font-medium flex items-center gap-2"
          >
            Browse All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {relatedPremium.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="group bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Price */}
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                  ৳ {item.price}
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-pink-400">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.subTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
