export enum AppRoute {
  MAIN = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer', // TODO после получения данных переделать на динамический адрес /offer/:id
}

export enum CardType {
  FAVORITES = 'favorites',
  CITIES = 'cities',
  NEAR_PLACES = 'near-places'
}