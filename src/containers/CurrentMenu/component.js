import React, { PureComponent } from 'react';
import Confirm from './components/Confirm';

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

        <div>
          {(menu.menu || []).map(img => (
            <img src={img.thumb_360} key={img.id} alt={img.name} />
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
