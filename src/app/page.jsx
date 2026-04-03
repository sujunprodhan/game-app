
import Game from "@/componets/layouts/game/Game";
import NetFlex from "@/componets/layouts/game/NetFlex";
import FeatureSection from "@/componets/layouts/herobanner/FeatureSection";
import HeroBanner from "@/componets/layouts/herobanner/HeroBanner";
import Video from "@/componets/layouts/video/Video";


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
