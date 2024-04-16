import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type BreadCrumbsProps = {
  links: {
    link: string;
    value: string;
  }[];
};

export default function BreadCrumbs({ links }: BreadCrumbsProps) {
  return (
    <div className='flex items-center gap-2 px-5 py-1 my-5 text-sm glassEffect text-primary-color '>
      {links.length > 0
        ? links.map((link, i) => (
            <>
              <div
                key={link.link}
                className={clsx('', {
                  'overflow-hidden text-ellipsis': i === 2,
                })}
              >
                <Link href={link.link} className=''>
                  {link.value}
                </Link>
              </div>
              {links[i + 1] ? <span>/</span> : null}
            </>
          ))
        : null}
    </div>
  );
}
