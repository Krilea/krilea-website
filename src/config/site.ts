// Централна конфигурация на сайта — смени тук връзки, контакти и навигация.
// Празен низ ('') за социална мрежа я скрива автоматично от футъра.

export const SITE = {
  name: 'KRILEA',
  tagline: 'Maison de Beauté Naturelle',
  brandEssence:
    'KRILEA е премиум бранд за натурална грижа за коса, вдъхновен от дивата природа. Съчетава чистотата на билките, мъдростта на традицията и силата на съвременната наука.',
  url: 'https://krilea.eu',
  email: 'hello@krilea.eu',
  locale: 'bg',
};

export const NAV = [
  { label: 'Начало', href: '/' },
  { label: 'Журнал', href: '/zhurnal/' },
  { label: 'За бранда', href: '/za-branda/' },
  { label: 'Контакти', href: '/kontakti/' },
];

export const LEGAL_LINKS = [
  { label: 'Политика за поверителност', href: '/politika-za-poveritelnost/' },
  { label: 'Политика за бисквитки', href: '/politika-za-biskvitki/' },
  { label: 'Общи условия', href: '/obshti-usloviya/' },
];

// Постави истинските адреси, когато профилите са готови.
// TikTok, Pinterest и YouTube остават скрити, докато полето е празен низ.
export const SOCIAL = {
  instagram: 'https://www.instagram.com/krilea.eu',
  facebook: 'https://www.facebook.com/krilea.eu',
  tiktok: '',
  pinterest: '',
  youtube: '',
};
