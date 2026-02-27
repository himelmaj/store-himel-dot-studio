"use client";

import { useParams } from 'next/navigation';
import { Locale, locales } from '@/i18n/routing';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils'

const LocaleSwitcher = () => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = useLocale();

    const handleChange = async (locale: Locale) => {
        // setLocale(locale)
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: locale }
            );
        });
    };

    return (
        <div className='flex gap-2 **:cursor-pointer'>
            {locales.map((locale) => (
                <button key={locale} disabled={isPending} onClick={() => handleChange(locale)} className={cn('flex items-center gap-2', (currentLocale !== locale && 'opacity-50'))}>
                    {locale}
                </button>
            ))}
        </div>
    )
}

export default LocaleSwitcher