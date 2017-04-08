import React, { Component } from 'react';
import Confirm from './components/Confirm';
import MenuSelect from './components/MenuSelect';

class Menus extends Component {
  state = {
    isConfirmModalOpen: false,
  };

  componentDidMount() {
    this.props.getMenus();
  }

  componentWillReceiveProps(nextProps) {
    const { active, menus, handleChange } = nextProps;

    if (!active && menus.size > 0) {
      handleChange({
        target: {
          value: menus.first().key,
        },
      });
    }
  }

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
    const { menus, value, handleChange, isEditable, handleEdit, currentMenu } = this.props;
    const { isConfirmModalOpen } = this.state;

    if (!value) {
      return (<div>loading...</div>);
    }

    return (
      <div>
        <MenuSelect
          value={value}
          handleChange={handleChange}
          menus={menus}
        />

        {(currentMenu.menu || []).map(img => (
          <img src={img.thumb_360} key={img.id} alt={img.name} />
        ))}

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
