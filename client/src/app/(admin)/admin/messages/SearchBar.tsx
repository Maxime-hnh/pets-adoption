"use client"
import { Input } from "@/_components/ui/input";
import { useAdminStore } from "@/_stores/admin.store";
import { Search } from "lucide-react";

export default function SearchBar() {

  const searchValue = useAdminStore((state) => state.searchMessagesValue);
  const setSearchValue = useAdminStore((state) => state.setSearchMessagesValue);

  return (
    <div id="filters-bar-component" className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Rechercher..."
        className="pl-9 !bg-white"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}