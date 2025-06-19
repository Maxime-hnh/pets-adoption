"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/_components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface PageBreadcrumbsProps {
  pathNameLabelMap: Record<string, string>;
}

export default function PageBreadcrumbs({ pathNameLabelMap }: PageBreadcrumbsProps) {

  const pathname = usePathname();
  const pathSegments = pathname.split('/').slice(1); // slice cos removing first empty path

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index !== pathSegments.length - 1
                ? <BreadcrumbLink href={`${item === "admin" ? "/admin" : `/admin/${item}`}`}>{pathNameLabelMap[item]}</BreadcrumbLink>

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