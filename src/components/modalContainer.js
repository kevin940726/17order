import React from 'react';

const modalContainer = Component => class extends React.Component {
  static displayName = `modalContainer(${Component.displayName})`;

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <Component
        isOpen={this.state.isOpen}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        {...this.props}
      />
    );
  }
};

export default modalContainer;
