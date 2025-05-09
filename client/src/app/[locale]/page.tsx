"use client";

import { useTranslations } from "next-intl";  

export default function Home() {
  const t = useTranslations ('HomePage');



  return (
    <div className="h-[calc(100dvh-60px-1rem)]">  
      {t('title')}
    </div>
  );
}
