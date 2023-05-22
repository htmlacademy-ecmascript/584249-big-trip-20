import Presenter from './presenter.js';

/**
 * @extends {Presenter<SortView>}
 */
class SortPresenter extends Presenter {
  /**
   * @override
   * @returns {SortViewState}
   */
  createViewState() {
    /**
     * @type {Array<SortType>}
     */
    const types = ['day', 'event', 'offers', 'price', 'time'];
    const items = types.map((it) => ({
      value: it,
      isSelected: it === 'day',
      isDisabled: it === 'event' || it === 'offers'
    }));

    return {items};
  }
}

export default SortPresenter;
