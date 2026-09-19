import FeaturedMensWatch from "@/components/FeaturedMensWatch";
import FeaturedThreePiece from "@/components/FeaturedThreePiece";
import FeaturedWomensWatch from "@/components/FeaturedWomensWatch";
import Hero from "@/components/Hero";


export default function Home() {
  return (
    <div className="">
      <Hero/>
      <FeaturedMensWatch/>
      <FeaturedWomensWatch/>
      <FeaturedThreePiece/>
    </div>
  );
}
