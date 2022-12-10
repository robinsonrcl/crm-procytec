import { Country } from './types';

const allCountries: string[][] = [
  ['Argentina', 'ar', '54','🇦🇷'],
  ['Australia', 'au', '61','🇦🇺'],
  ['Bolivia', 'bo', '591','🇧🇴'],
  ['Brazil (Brasil)', 'br', '55','🇧🇷'],
  ['Canada', 'ca', '1', '🇨🇦'],
  ['Chile', 'cl', '56','🇨🇱'],
  ['Colombia', 'co', '57', '🇨🇴'],
  ['Costa Rica', 'cr', '506','🇨🇷'],
  ['Guatemala', 'gt', '502','🇬🇹'],
  ['Honduras', 'hn', '504','🇭🇳'],
  ['Mexico (México)', 'mx', '52','🇲🇽'],
  ['Nicaragua', 'ni', '505','🇳🇮'],
  ['Panama (Panamá)', 'pa', '507','🇵🇦'],
  ['Paraguay', 'py', '595','🇵🇾'],
  ['Peru (Perú)', 'pe', '51','🇵🇪'],
  ['Puerto Rico', 'pr', '1','🇵🇷'],
  ['United Kingdom', 'gb', '44','🇬🇧'],
  ['United States', 'us', '1','🇺🇸'],
  ['Uruguay', 'uy', '598','🇺🇾'],
  ['Venezuela', 've', '58','🇻🇪'],
];

const all: Country[] = allCountries.map(([name, iso2, dialCode, flag]) => ({
  name,
  iso2: iso2.toUpperCase(),
  dialCode,
  flag
}));

export default all;