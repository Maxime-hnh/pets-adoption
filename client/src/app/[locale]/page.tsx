"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');



  return (
    <div className="h-[calc(100dvh-60px-1rem)]">

      <div className="grid grid-cols-2">
        <div>
        </div>
        <div>{t('title')}</div>
      </div>
    </div>
  );
}
