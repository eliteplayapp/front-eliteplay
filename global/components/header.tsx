'use client';

import { useSearchParams } from '@/global/lib/libraries';
import { mockData, getLangKey } from '@/global/lib/translations';
import HeaderView from './HeaderView';

export default function Header() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'pt-br';
  const langKey = getLangKey(lang);
  
  const { header } = mockData;

  const navLinks = [
    { label: header.Arenas[langKey], href: header.Arenas.link },
    { label: header.Works[langKey], href: header.Works.link },
    { label: header.App[langKey], href: header.App.link },
  ];

  const partnerLabel = header.Partner[langKey];

  return <HeaderView lang={lang} navLinks={navLinks} partnerLabel={partnerLabel} />;
}
