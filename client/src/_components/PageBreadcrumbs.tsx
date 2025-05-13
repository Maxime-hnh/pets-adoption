"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/_components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface PageBreadcrumbsProps {
  excludedPath: string[];
  pathNameLabelMap: Record<string, string>;
}

export default function PageBreadcrumbs({ excludedPath, pathNameLabelMap }: PageBreadcrumbsProps) {

  const pathname = usePathname();
  const pathSegments = pathname.split('/')
  const cleaned = pathSegments.filter(segment => !excludedPath.includes(segment));


  return (
    <Breadcrumb>
      <BreadcrumbList>
        {cleaned.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index !== cleaned.length - 1
                ? <BreadcrumbLink  href={`/fr/admin/${item}`}>{pathNameLabelMap[item]}</BreadcrumbLink>

                : <BreadcrumbPage>{pathNameLabelMap[item]}</BreadcrumbPage>
              }
            </BreadcrumbItem>
            {index
              !== cleaned.length - 1
              && <BreadcrumbSeparator />
            }
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
};