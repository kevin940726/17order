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
        <h1 className="title">
          {menu.name}
          {isEditable && (
            <span>
              <a onClick={handleEdit}>
                <span className="icon">
                  <i className="fa fa-pencil"></i>
                </span>
              </a>
              <a onClick={this.handleOpenModal}>
                <span className="icon">
                  <i className="fa fa-times"></i>
                </span>
              </a>
            </span>
          )}
        </h1>

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
