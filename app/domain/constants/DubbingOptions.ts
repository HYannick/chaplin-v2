import type {Dubbing} from '~/domain/Dubbing';

export const dubbingOptions: {
  value: Dubbing,
  label: Dubbing,
}[] = [
  { value: 'VF', label: 'VF' },
  { value: 'VO', label: 'VO' },
  { value: 'VOSTFR', label: 'VOSTFR' }
];