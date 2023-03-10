import { Country } from './types';

const allCountries: string[][] = [
  ['Argentina', 'ar', '54','๐ฆ๐ท'],
  ['Australia', 'au', '61','๐ฆ๐บ'],
  ['Bolivia', 'bo', '591','๐ง๐ด'],
  ['Brazil (Brasil)', 'br', '55','๐ง๐ท'],
  ['Canada', 'ca', '1', '๐จ๐ฆ'],
  ['Chile', 'cl', '56','๐จ๐ฑ'],
  ['Colombia', 'co', '57', '๐จ๐ด'],
  ['Costa Rica', 'cr', '506','๐จ๐ท'],
  ['Guatemala', 'gt', '502','๐ฌ๐น'],
  ['Honduras', 'hn', '504','๐ญ๐ณ'],
  ['Mexico (Mรฉxico)', 'mx', '52','๐ฒ๐ฝ'],
  ['Nicaragua', 'ni', '505','๐ณ๐ฎ'],
  ['Panama (Panamรก)', 'pa', '507','๐ต๐ฆ'],
  ['Paraguay', 'py', '595','๐ต๐พ'],
  ['Peru (Perรบ)', 'pe', '51','๐ต๐ช'],
  ['Puerto Rico', 'pr', '1','๐ต๐ท'],
  ['United Kingdom', 'gb', '44','๐ฌ๐ง'],
  ['United States', 'us', '1','๐บ๐ธ'],
  ['Uruguay', 'uy', '598','๐บ๐พ'],
  ['Venezuela', 've', '58','๐ป๐ช'],
];

const all: Country[] = allCountries.map(([name, iso2, dialCode, flag]) => ({
  name,
  iso2: iso2.toUpperCase(),
  dialCode,
  flag
}));

export default all;