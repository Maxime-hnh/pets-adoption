"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/_components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface PageBreadcrumbsProps {
  pathNameLabelMap: Record<string, string>;
  classNameText?: string;
}

export default function PageBreadcrumbs({ pathNameLabelMap, classNameText }: PageBreadcrumbsProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // remove empty

  const fullPaths = pathSegments.map((_, i) => `/${pathSegments.slice(0, i + 1).join('/')}`);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const label = pathNameLabelMap[segment] || decodeURIComponent(segment);
          const href = fullPaths[index];

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className={classNameText}>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className={classNameText} href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}