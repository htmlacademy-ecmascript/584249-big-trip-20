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
    *@type {UrlParams}
    */
    const {sort = 'day'} = this.getUrlParams();

    /**
     * @type {Array<SortType>}
     */
    const types = ['day', 'event', 'offers', 'price', 'time'];
    const items = types.map((it) => ({
      value: it,
      isSelected: it === sort,
      isDisabled: it === 'event' || it === 'offers'
    }));

    return {items};
  }

  /**
   * @override
   */
  addEventListeners() {
    /**
     * @param {event & {target: {value: SortType}}} event
     */
    const handleViewChange = (event) => {
      /**
       *@type {UrlParams}
       */
      const urlParams = this.getUrlParams();

      urlParams.sort = event.target.value;
      delete urlParams.edit;
      this.setUrlParams(urlParams);
    };

    this.view.addEventListener('change', handleViewChange);
  }
}

export default SortPresenter;
