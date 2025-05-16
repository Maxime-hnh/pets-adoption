import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations('HomePage');

console.log("home page")
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
