import Model from './model.js';
import points from '../data/points.json';
import destinations from '../data/destinations.json';
import offerGroup from '../data/offers.json';

class AppModel extends Model {
  #apiService;
  #points = points;
  #destinations = destinations;
  #offerGroup = offerGroup;
  /**
   *@type {Record<FilterType, (it: Point) => boolean>}
  */
  #filterCallBackMap = {
    everything: () => true,
    future: (it) => Date.parse(it.startDateTime) > Date.now(),
    present: (it) => !this.#filterCallBackMap.past(it) && !this.#filterCallBackMap.future(it),
    past: (it) => Date.parse(it.endDateTime) < Date.now()
  };

  /**
   *@type {Record<SortType, (a:Point, b:Point) => Number>}
   */
  #sortCallbackMap = {
    day: (a, b) => Date.parse(a.startDateTime) - Date.parse(b.endDateTime),
    event: () => 0,
    time: (a, b) => AppModel.calcPointDuration(b) - AppModel.calcPointDuration(a),
    price: (a, b) => a.basePrice - b.basePrice,
    offers: () => 0,
  };

  /**
   * @param {ApiService} apiService
   */
  constructor(apiService) {
    super();

    this.#apiService = apiService;
  }

  /**
   * @param {number} point
   */
  static calcPointDuration(point) {
    return Date.parse(point.endDateTime) - Date.parse(point.startDateTime);
  }

  /**
  * @param {{filter?: FilterType, sort?: SortType}} [criteria]
  * @return {Array<Point>}
  */
  getPoints(criteria = {}) {

    const adaptedPoints = this.#points.map(AppModel.adaptPointForClient);
    const callBackSort = this.#sortCallbackMap[criteria.sort] ?? this.#sortCallbackMap.day;
    const filterCallback = this.#filterCallBackMap[criteria.filter] ?? this.#filterCallBackMap.everything;

    return adaptedPoints.filter(filterCallback).sort(callBackSort);
  }

  /**
   * @param {Point} point
   */
  addPoint(point) {
    const adaptedPoint = AppModel.adaptPointForServer(point);

    adaptedPoint.id = crypto.randomUUID();
    this.#points.push(adaptedPoint);
  }

  /**
   * @param {Point} point
   */
  updatePoint(point) {
    const adaptedPoint = AppModel.adaptPointForServer(point);
    const index = this.#points.findIndex((it) => it.id === adaptedPoint.id);

    this.#points.splice(index, 1, adaptedPoint);
  }

  /**
   * @param {string} id
   */
  deletePoint(id) {
    const index = this.#points.findIndex((it) => it.id === id);

    this.#points.splice(index, 1);
  }


  /**
  * @return {Array<Destination>}
  */
  getDestinations() {
    return structuredClone(this.#destinations);
  }

  /**
  * @return {Array<OfferGroup>}
  */
  getOfferGroup() {
    // @ts ignore
    return structuredClone(this.#offerGroup);
  }

  /**
   *
   * @param {PointInSnakeCase} point
   * @return {Point}
   */
  static adaptPointForClient(point) {
    return {
      id: point.id,
      type: point.type,
      destinationId: point.destination,
      startDateTime: point.date_from,
      endDateTime: point.date_to,
      basePrice: point.base_price,
      offerIds: point.offers,
      isFavorite: point.is_favorite,
    };
  }

  /**
   *
   * @param {Point} point
   * @return {PointInSnakeCase}
   */

  static adaptPointForServer(point) {
    return {
      'id': point.id,
      'type': point.type,
      'destination': point.destinationId,
      'date_from': point.startDateTime,
      'date_to': point.endDateTime,
      'base_price': point.basePrice,
      'offers': point.offerIds,
      'is_favorite': point.isFavorite
    };
  }
}

export default AppModel;
