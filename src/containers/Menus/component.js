import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Confirm from './components/Confirm';
import MenuSelect from './components/MenuSelect';

class Menus extends Component {
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
    const { menus, value, handleChange, isEditable, handleEdit, match, location } = this.props;
    const { isConfirmModalOpen } = this.state;

    if (!value) {
      return (<div>loading...</div>);
    }

    if (!match.params || !match.params.menuId || match.params.menuId !== value) {
      return (
        <Redirect
          push
          to={{
            pathname: `/${value}`,
            state: location.state,
          }}
        />
      );
    }

    return (
      <div>
        <MenuSelect
          value={value}
          handleChange={handleChange}
          menus={menus}
        />

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

        <Confirm
          isOpen={isConfirmModalOpen}
          handleClose={this.handleCloseModal}
          handleConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default Menus;
