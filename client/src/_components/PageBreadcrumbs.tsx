"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/_components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface PageBreadcrumbsProps {
  pathNameLabelMap: Record<string, string>;
}

export default function PageBreadcrumbs({ pathNameLabelMap }: PageBreadcrumbsProps) {

  const pathname = usePathname();
  const pathSegments = pathname.split('/')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index !== pathSegments.length - 1
                ? <BreadcrumbLink  href={`/admin/${item}`}>{pathNameLabelMap[item]}</BreadcrumbLink>

                : <BreadcrumbPage>{pathNameLabelMap[item]}</BreadcrumbPage>
              }
            </BreadcrumbItem>
            {index
              !== pathSegments.length - 1
              && <BreadcrumbSeparator />
            }
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
};