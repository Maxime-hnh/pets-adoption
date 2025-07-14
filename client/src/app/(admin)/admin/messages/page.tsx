
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { CornerUpLeft, CornerUpRight, Trash2, User } from "lucide-react";
import MessagesList from "./MessagesList";
import SearchBar from "./SearchBar";

export default function MessagesPage() {

  return (

    <section className="w-full overflow-x-hidden h-[calc(100dvh-60px)] flex flex-col">
      {/*Header*/}
      <div className="flex flex-row w-full min-h-[50px] h-[50px]">
        <div className="flex flex-1 justify-between items-center p-2 border-r border-b">
          <h2 className="text-2xl">Boîte de réception</h2>

        </div>
        <div className="flex flex-1 items-center justify-between border-b">
          <Button variant={"ghost"}>
            <Trash2 className="h-4 w-4" strokeWidth={2.5} />
          </Button>
          <div className="flex flex-row items-center">
            <Button variant={"ghost"}>
              <CornerUpLeft className="h-4 w-4" strokeWidth={2.5} />
            </Button>
            <Button variant={"ghost"}>
              <CornerUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>

      {/*Main*/}

      <div className="flex flex-row w-full h-[calc(100dvh-110px)]">

        <div className="flex flex-1 flex-col p-2 gap-2 border-r">
          <SearchBar />
          <div className="flex flex-col gap-2 pb-4 h-[calc(100dvh-146px-1rem)] overflow-y-auto">
            <MessagesList />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="w-full flex flex-row justify-between p-4 border-b">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <Badge className="h-15 min-w-15 rounded-full px-1 bg-gray-200">
                  <User className="h-8 w-8 min-h-8 min-w-8 text-black" strokeWidth={1.5} />
                </Badge>
                <div>
                  <h3 className="flex flex-col text-xl">Jean Dupont</h3>
                  <span className="text-xs font-normal">
                    <span className="font-bold">Répondre à : </span>
                    <a href="mailto:jeandupont@gmail.com" className="!underline">jeandupont@gmail.com</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">il y a 10 minutes</div>
          </div>
          <div className="flex flex-col gap-2">
          </div>

          <div className="py-4 px-6 text-md text-justify">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia veniam atque, ut culpa explicabo laborum voluptatem quia praesentium ab, optio nam enim dolore similique sequi facilis. Quisquam recusandae consequatur nihil, voluptatibus ex ratione rem debitis qui id magnam ipsam incidunt tenetur. Laborum, molestiae, quis eligendi veniam tempore, recusandae ab error fugiat aperiam rerum atque doloribus sequi. Eligendi nostrum deserunt dicta dolorum deleniti ipsa illo cum dignissimos repudiandae rerum maiores neque quidem quae, repellat laboriosam ipsam assumenda nesciunt, ab ducimus a at tempora aut est. Sequi inventore aspernatur illum, dolores, eaque aperiam ullam rerum repudiandae quia labore voluptates iste ea repellendus enim molestias architecto velit deserunt laboriosam deleniti! Autem quod corrupti incidunt, earum ducimus eligendi ad hic beatae, animi pariatur itaque minima neque, dolorum nulla. Consequatur beatae aliquid repellat illo maxime harum quam aspernatur iusto explicabo pariatur, porro temporibus dicta facilis impedit possimus ullam unde cupiditate numquam excepturi eligendi! Culpa, dolores.</p>
          </div>
        </div>
      </div>
    </section>
  );
}