import Image from 'next/image';
import Link from 'next/link';
import gameData from '@/data/freefire.json';
import PackageSelector from '@/componets/packageselector/PackageSelector';

const GameDetails = async ({ params }) => {
  const { id } = await params;
  const game = gameData.find((g) => g.id === id);

  // Related Games
  const relatedGames = gameData
    .filter((g) => g.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Game*/}
          <div className="lg:w-1/2 relative aspect-video lg:aspect-auto">
            <Image src={game.image} alt={game.title} fill className="object-cover" priority />
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {game.title}
            </h1>
            <p className="text-xl text-gray-400 mt-3">{game.subTitle}</p>

            <div className="mt-8">
              <span className="text-pink-500 text-3xl font-semibold">৳ {game.price}</span>
            </div>

            {/* Package Selector */}
            <div className="mt-10">
              <PackageSelector packages={game?.reRecharge} type="game" />
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-white mb-5">Rules</h3>
              <ul className="space-y-3 text-gray-300 text-[17px]">
                {game.Rules?.slice(0, 5).map((rule, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-pink-500 mt-1">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Games Section  */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">You May Also Like</h2>
          <Link
            href="/game"
            className="text-pink-500 hover:text-pink-400 font-medium flex items-center gap-2 text-lg"
          >
            Browse All Games <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {relatedGames.map((item) => (
            <Link
              key={item.id}
              href={`/game/${item.id}`}
              className="group bg-gray-800 rounded-2xl overflow-hidden hover:scale-[1.04] transition-all duration-300 shadow-lg hover:shadow-pink-600/30"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/80 text-white text-sm font-medium px-3 py-1 rounded-lg">
                  ৳ {item.price}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white line-clamp-2 group-hover:text-pink-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-1">{item.subTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
