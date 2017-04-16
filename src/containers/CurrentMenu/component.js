import React, { PureComponent } from 'react';
import Confirm from './components/Confirm';
import Thumb from './components/Thumb';
import { getFitThumb } from '../../utils/thumbs';

class CurrentMenu extends PureComponent {
  state = {
    isConfirmModalOpen: false,
  };

  handleOpenModal = () => {
    this.setState({
      isConfirmModalOpen: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      isConfirmModalOpen: false,
    });
  }

  handleConfirm = () => {
    this.props.handleRemove();
    this.handleCloseModal();
  }

  render() {
    const { menu, isEditable, handleEdit } = this.props;
    const { isConfirmModalOpen } = this.state;

    return (
      <div className="box">
        <h1 className="title is-1">
          {menu.name}
        </h1>

        <h4 className="subtitle is-4">
          {menu.date}
        </h4>

        {isEditable && (
          <div className="field is-grouped is-pulled-right">
            <p className="control">
              <button className="button is-info is-outlined" onClick={handleEdit}>
                <span className="icon is-small">
                  <i className="fa fa-pencil"></i>
                </span>
                <span>Edit</span>
              </button>
            </p>
            <p className="control">
              <button className="button is-danger is-outlined" onClick={this.handleOpenModal}>
                <span className="icon is-small">
                  <i className="fa fa-times"></i>
                </span>
                <span>Delete</span>
              </button>
            </p>
          </div>
        )}

        {menu.notes ? (
          <p>{menu.notes}</p>
        ): null}

        <div className="has-text-centered">
          {(menu.menu || []).map(img => (
            <Thumb key={img.id} href={img.permalink_public} target="_blank" rel="noopener noreferrer">
              <img src={(getFitThumb(img) || {}).value} alt={img.name} />
            </Thumb>
          ))}
        </div>

        <Confirm
          isOpen={isConfirmModalOpen}
          handleClose={this.handleCloseModal}
          handleConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default CurrentMenu;
