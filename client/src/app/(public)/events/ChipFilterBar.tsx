'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '@/_components/ui/chip';
import { EventType, EventTypeLabelMap } from '@/_schemas/events.schema';
import { Search, X } from 'lucide-react';
import { Input } from '@/_components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '@/_components/ui/button';

export default function ChipFilterBar() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTypes = searchParams.getAll('type');
  const searchValue = searchParams.get('title') ?? '';
  const [title, setTitle] = useState(searchValue);

  useEffect(() => {
    setTitle(searchValue);
  }, [searchValue]);

  const handleToggle = (type: string) => {
    const allTypes = Object.keys(EventTypeLabelMap);
    const params = new URLSearchParams(searchParams.toString());


    const isSelected = activeTypes.includes(type);
    const newTypes = isSelected
      ? activeTypes.filter((t) => t !== type)
      : [...activeTypes, type];

    params.delete('type');
    if (newTypes.length < allTypes.length) {
      newTypes.forEach((t) => params.append('type', t));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClearTypes = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('type');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClearTitle = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('title');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('title', value);
    } else {
      params.delete('title');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="w-full md:w-auto relative">
        <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un évènement..."
          className="px-8 min-w-72"
          value={title}
          onChange={handleSearchChange}
        />
        {title.length > 0
          && <Button variant="ghost" className="absolute right-0 top-0" onClick={handleClearTitle} size="icon">
            <X className="h-4 w-4" />
          </Button>
        }
      </div>
      <div className="flex flex-wrap gap-2 xl:gap-4">
        <Chip
          onClick={handleClearTypes}
          checked={activeTypes.length === 0}
          className="bg-white text-black"
          color="purple"
          size="lg"
        >
          Tous
        </Chip>
        {Object.keys(EventTypeLabelMap).map((type) => (
          <Chip
            key={type}
            onClick={() => handleToggle(type)}
            checked={activeTypes.includes(type)}
            className="bg-white text-black"
            color="purple"
            size="lg"
          >
            {EventTypeLabelMap[type as EventType]}
          </Chip>
        ))}
      </div>
    </div>
  );
}