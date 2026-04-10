import Game from '@/componets/game/Game';
import NetFlex from '@/componets/game/NetFlex';
import FeatureSection from '@/componets/herobanner/FeatureSection';
import HeroBanner from '@/componets/herobanner/HeroBanner';

import Video from '@/componets/video/Video';

export default function Home() {
  return (
    <div className="">
      <HeroBanner></HeroBanner>
      <FeatureSection></FeatureSection>
      <Game></Game>
      <Video></Video>
      <NetFlex></NetFlex>
    </div>
  );
}
