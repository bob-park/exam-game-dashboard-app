import { padStart } from 'lodash';

export function toTimeCode(seconds: number): string {
  const sec = Math.floor(seconds % 60);
  const min = Math.floor((seconds / 60) % 60);
  const hours = Math.floor(seconds / 3_600);

  return `${padStart(hours + '', 2, '0')}:${padStart(min + '', 2, '0')}:${padStart(sec + '', 2, '0')}`;
}

export function toTimeCodeMin(seconds: number): string {
  const sec = Math.floor(seconds % 60);
  const min = Math.floor(seconds / 60);

  return `${padStart(min + '', 2, '0')}:${padStart(sec + '', 2, '0')}`;
}
