import type {MovieStatusType} from '~/domain/MovieStatusType';

export interface Movie {
  id: string;
  title: string;
  information: string;
  disclaimer: string;
  synopsis: string;
  cover: string;
  language: string;
  duration: string;
  imageSet: {
    values: string[];
  };
  actors: string[];
  genres: string[];
  description: string;
  shows: MovieShow[];
  releaseDate: string;
  authors: string[];
  trailer: string;
  status: MovieStatusType;
}

export interface MovieShow {
  id: string;
  date: string;
  dubbing: string;
}

export type MovieShowView = {
  id: string;
  date: string;
  time: string;
  dubbing: string;
}

export const toMovieShowView = (show: MovieShow): MovieShowView => {
  const date = new Date(show.date);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const dateString = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(date)
  const time = date.toLocaleTimeString('fr-FR', options).replace(':', 'h');
  return {
    id: show.id,
    date: dateString,
    time,
    dubbing: show.dubbing,
  };
}
