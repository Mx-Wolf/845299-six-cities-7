import { ReactElement } from 'react';
import Header from '../features/header';
import OffersList from '../features/offers-list';
import CitiesList from '../features/cities-list';
import { useCitiesList } from '../../utils/selectors/use-cities-list';
import { useIsEmpty } from '../../utils/selectors/use-is-empty';
import { useParams, Redirect } from 'react-router-dom';
import NotFound from './not-found';
import { AppRoute } from '../../const';
import { getRoute } from '../../utils/common';
import { useCurrentHotels } from '../../utils/selectors/use-current-hotels';
import Spinner from '../features/spinner';

// TODO сделать кастомный хук useListIds(),
// который будет принимать параметры сортировок/фильтров/пагинации
// и возвращать актуальный список id предложений
function Main(): ReactElement {
  const { city } = useParams<{ city:string | undefined }>();
  const isEmpty = useIsEmpty();
  const { activeCity, cities } = useCitiesList(city);

  if ( typeof city === 'undefined' || city === '') {
    return <Redirect to={getRoute(AppRoute.DEFAULT_CITY)} />
  }

  if ( typeof activeCity === 'undefined') {
    return <NotFound/>
  }

  const { hotels, isLoading } = useCurrentHotels(activeCity);

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol>
          <symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol>
        </svg>
      </div>
      <div className="page page--gray page--main">
        <Header />
        <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList activeCity={activeCity} cities={cities} />
          {isLoading && (
            <Spinner />
          )}
          {!isLoading && (
            <OffersList activeCity={activeCity} hotels={hotels} />
          )}
        </main>
      </div>
    </>
  );
}

export default Main;
