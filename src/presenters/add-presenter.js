import Presenter from './presenter.js';

/**
 * @extends {Presenter<AddView>}
 */
class AddPresenter extends Presenter {
  /**
   * @override
   * @return {AddViewState}
   */
  createViewState() {
    // TODO: AddViewState
    return {
      isDisabled: false,
    };
  }
}

export default AddPresenter;
