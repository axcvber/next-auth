'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, locales, usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'
import React, { Fragment } from 'react'

const LocaleMenu = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  //   const handleChange = e => {
  //     router.push(pathname, { locale: e.target.value });
  //   };
  //   return <div className='absolute top-0 right-0'>
  //   <select value={locale} onChange={handleChange}>
  //   <option value="en">English</option>
  //   <option value="de">Deutsch</option>
  //   <option value="es">Español</option>
  //   <option value="ja">日本語</option>
  // </select></div>

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className='absolute top-6 right-6'>
        <Button variant='outline' className='gap-2'>
          {/* <Image priority src={currentLocale.image} width={22} height={22} alt={currentLocale.label} /> */}
          {/* {currentLocale.locale.charAt(0).toUpperCase() + currentLocale.locale.slice(1)} */}
          {locale.charAt(0).toUpperCase() + locale.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='divide-y' sideOffset={5}>
        <DropdownMenuGroup className='space-y-1'>
          {locales
            .filter((item) => item !== locale)
            .map((item, inx) => (
              <Fragment key={item}>
                {inx !== 0 && <DropdownMenuSeparator />}
                <DropdownMenuItem asChild>
                  <Link href={pathname} locale={item} className='px-3 py-2'>
                    <div className='flex items-center gap-2'>
                      {/* <Image width={22} height={22} src={item.image} alt={item.label} /> */}
                      <span>{item}</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </Fragment>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleMenu
