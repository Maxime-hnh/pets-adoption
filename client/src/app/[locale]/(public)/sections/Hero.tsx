
import { Button } from "@/_components/ui/button";
import { SparklesText } from "@/_components/ui/animaton/sparkles-text";
import { ArrowRight, ChartNoAxesGantt, Heart, MessageCircleHeart, PawPrint, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Counter } from "@/_components/ui/animaton/animated-counter";

export default function Hero() {

  return (
    <section className="relative grid grid-cols-2 lg:px-12 h-[calc(100dvh-120px)]">
      <div className="absolute right-0 bottom-0 not-odd:h-[128px] w-[40%]  scale-[2] rounded-[50%] bg-custom-green blur-[100px] sm:h-[256px]"></div>
      <div
        className="absolute top-1/2 left-1/2 not-odd:h-[210px] w-[40%] rotate-[35deg]  scale-[2] rounded-[50%] bg-custom-orange blur-[35px] sm:h-[256px]"
        style={{ transform: "translate(-35%, -40%)" }}
      />

      {/* Text */}
      <div className="flex items-end absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Counter
          className="text-7xl font-inter font-[900] animate-fade-in-up pb-8 text-amber-500"
          start={0}
          end={42}
          duration={2}
          fontSize={65}
        />
        <p
          className="text-2xl font-inter font-[900] animate-fade-in-up pb-8 bg-no-repeat bg-[length:contain] bg-[position:bottom_center]"
          style={{ backgroundImage: "url('https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/underline.png')" }}
        >

          animaux attendent de trouver un foyer.
        </p>
      </div>


      {/* Left content*/}
      <div className="col-span-1">
        <div className="flex flex-col h-full gap-8 pt-24">
          <h1 className="sr-only">Un refuge temporaire, un amour éternel.</h1>
          <SparklesText text={" Un refuge temporaire, un amour éternel."} className="font-inter animate-fade-in-down" />
          <p className="animate-fade-in-up text-muted-foreground text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia alias soluta id veritatis
            quaerat libero doloremque accusamus aperiam, repellendus maiores animi dolor ad
            delectus eligendi.
          </p>
          <div className="flex gap-4">
            <Button className="bg-indigo-500 animate-fade-in-left hover:bg-indigo-600" size={"3xl"}><PawPrint className="mr-2" /> J'adopte</Button>
            <Button className="bg-amber-500 animate-fade-in-right" size={"3xl"}>Nous Contacter <ArrowRight className="ml-2" /></Button>
          </div>
        </div>

      </div>

      {/* Right content */}
      <div className="col-span-1 pl-8">
        <div className="relative h-2/3 max-w-[40rem]">

          {/* Image 1 */}
          <div className="bg-gray-500 h-[279px] w-[239px] absolute top-0 left-0 translate-y-1/3 translate-x-1/2 aspect-4/5 animate-fade-in-down">
            <Sparkles className="absolute -top-8 -left-8 text-emerald-500" />
            <ChartNoAxesGantt className="absolute -bottom-8 left-0 text-indigo-500" size={30} />
            <Image
              alt=""
              src="/assets/hero_1.jpg"
              width={1920}
              height={1440}
              className="h-full object-cover object-right"
            />
          </div>

          {/* Image 2 */}
          <div className="bg-gray-700 h-[279px] w-[239px] absolute bottom-0 right-8 aspect-4/5 animate-fade-in-left">
            <Heart className="absolute -top-8 -left-2 rotate-25 text-indigo-500" />
            <MessageCircleHeart className="absolute -top-8 -right-8 text-red-500 animate-bounce" />

            <Image
              alt=""
              src="/assets/hero_3.jpg"
              width={1280}
              height={1920}
              className="h-full object-cover object-right"
            />
          </div>

          {/* Image 3 */}
          <div className="bg-gray-300 h-[279px] w-[239px] absolute -bottom-20 left-40 aspect-4/5 animate-fade-in-right">
            <Star className="absolute bottom-1/6 -right-8 text-orange-500 rotate-20" />
            <Image
              alt=""
              src="/assets/hero_2.jpg"
              width={1372}
              height={1920}
              className="h-full object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


