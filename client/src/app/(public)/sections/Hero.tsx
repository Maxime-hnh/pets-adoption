
import { Button } from "@/_components/ui/button";
import { SparklesText } from "@/_components/ui/animaton/sparkles-text";
import { ArrowRight, ChartNoAxesGantt, Heart, MessageCircleHeart, PawPrint, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Counter } from "@/_components/ui/animaton/animated-counter";
import Link from "next/link";

export default function Hero() {
  console.log("hero")
  return (
    <section className="relative grid grid-cols-12 lg:px-12 h-[calc(100dvh-60px)] sm:h-[calc(100dvh-90px)]">
      {/* Background green */}
      <div className="hidden sm:block absolute right-0 bottom-0 not-odd:h-[128px] w-[40%]  scale-[2] rounded-[50%] bg-custom-green blur-[100px] sm:h-[256px]"></div>
      {/* Background orange */}
      <div
        className="hidden sm:block absolute top-1/2 left-1/2 not-odd:h-[210px] w-[40%] rotate-[35deg]  scale-[2] rounded-[50%] bg-custom-orange blur-[35px] sm:h-[256px]"
        style={{ transform: "translate(-35%, -40%)" }}
      />
      {/* Background purple bottom mobile */}
      <div className="z-1 absolute bottom-0 left-0 w-full h-[80px] scale-[2] rounded-[50%] bg-[#6433c6] blur-[35px] sm:hidden"></div>

      {/* Text Bottom Center */}
      <div className="hidden w-max  items-end absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2  sm:flex">
        <Counter
          className="text-7xl font-fredoka font-[700] animate-fade-in-up pb-8 text-amber-500"
          start={0}
          end={42}
          duration={2}
          fontSize={65}
        />
        <p
          className="text-2xl font-fredoka font-[700] animate-fade-in-up pb-8 bg-no-repeat bg-[length:contain] bg-[position:bottom_center]"
          style={{ backgroundImage: "url('https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/underline.png')" }}
        >

          animaux attendent de trouver un foyer.
        </p>
      </div>


      {/* Left content*/}
      <div className="z-10 bg-[url(/assets/hero_mobile.png)] bg-cover bg-center col-span-12 sm:z-auto sm:bg-none lg:col-span-5 2xl:col-span-6">
        <div className="flex flex-col h-full gap-8 justify-between sm:pt-24 lg:pt-12 xl:pt-24 sm:justify-start 2xl:gap-12">

          <h1 className="sr-only">Un refuge temporaire, un amour éternel.</h1>
          <SparklesText text={" Un refuge temporaire, un amour éternel."} className="font-fredoka animate-fade-in-down pl-2 pt-4 sm:pl-0 sm:pt-0" />
          <p className="hidden animate-fade-in-up text-muted-foreground text-xl sm:block lg:text-lg xl:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia alias soluta id veritatis
            quaerat libero doloremque accusamus aperiam, repellendus maiores animi dolor ad
            delectus eligendi.
          </p>

          <div className="flex justify-center sm:justify-start gap-2 sm:gap-4 pb-4 sm:pb-0">
            <Button className="bg-indigo-500 animate-fade-in-left hover:bg-indigo-600" size={"3xl"}><PawPrint className="hidden xs:block xs:mr-2" /> J'adopte</Button>
            <Link href="/contact" className="animate-fade-in-right">
              <Button className="bg-amber-500 animate-fade-in-right hover:bg-amber-600" size={"3xl"}>
                Nous Contacter <ArrowRight className="xs:ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* Right content */}
      <div className="hidden lg:block lg:col-span-7 2xl:col-span-6 pl-8">
        <div className="relative h-2/3 lg:max-w-[31rem] xl:max-w-[40rem]">

          {/* Image 1 */}
          <div className="bg-gray-500 lg:h-[14rem] lg:w-[12rem] xl:h-[17.5rem] xl:w-[15rem] absolute top-0 left-0 translate-y-1/2 translate-x-2/3 lg:translate-y-1/3 xl:translate-x-1/2 aspect-4/5 animate-fade-in-down">
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
          <div className="bg-gray-700 lg:h-[14rem] lg:w-[12rem] xl:h-[17.5rem] xl:w-[15rem] absolute -right-8 bottom-28 xl:bottom-0 xl:right-8 aspect-4/5 animate-fade-in-left">
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
          <div className="bg-gray-300 lg:h-[14rem] lg:w-[12rem] xl:h-[17.5rem] xl:w-[15rem] absolute bottom-10 xl:-bottom-20 left-40 aspect-4/5 animate-fade-in-right">
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
