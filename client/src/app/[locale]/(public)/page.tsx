import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations('HomePage');



  return (
    <div>

      <div className="grid grid-cols-2">
        <div>
        </div>
        <div>{t('title')}</div>
      </div>
    </div>
  );
}
