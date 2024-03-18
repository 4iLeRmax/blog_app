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
    <>
      <div className='flex'>
        <div className='flex items-center gap-2 px-5 py-1 my-5 glassEffect'>
          {links.length > 0
            ? links.map((link, i) => (
                <div key={link.link} className='flex items-center gap-2 text-primary-color'>
                  <Link href={link.link}>{link.value}</Link>
                  {links[i + 1] ? <span>/</span> : null}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
