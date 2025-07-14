import MessagesList from "./MessagesList";
import SearchBar from "./SearchBar";
import SelectedMessage from "./SelectedMessage";

export default function MessagesPage() {

  return (

    <section className="w-full overflow-x-hidden h-[calc(100dvh-60px)] flex flex-row">

      {/*Left side*/}
      <div className="flex flex-col h-full flex-1">

        {/*Header*/}
        <div className="flex flex-row w-full min-h-[50px] h-[50px] border-b border-r">
          <div className="flex flex-1 justify-between items-center p-2">
            <h2 className="text-2xl">Boîte de réception</h2>

          </div>
        </div>

        {/*Main*/}
        <div className="flex flex-1 flex-col p-2 gap-2 border-r h-[calc(100dvh-110px)]">
          <SearchBar />
          <div className="flex flex-col gap-2 pb-4 h-[calc(100dvh-146px-1rem)] overflow-y-auto">
            <MessagesList />
          </div>
        </div>
      </div>

      {/*Right side*/}
      <SelectedMessage />
    </section >
  );
}