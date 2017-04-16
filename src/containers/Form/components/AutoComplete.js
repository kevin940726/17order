import React, { Component } from 'react';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import uniqBy from '../../../utils/uniqBy';

const List = styled.nav`
  position: absolute;
  display: ${props => props.isShow ? 'block' : 'none'};
  width: 100%;
  z-index: 1;
  background-color: #FFF;
  max-height: ${props => props.maxHeight}px;
  overflow: scroll;
`;

const Item = styled.a`
  height: ${props => props.height}px;
  border-top: 0;
`;

class AutoComplete extends Component {
  static defaultProps = {
    windowSize: 5,
  };

  state = {
    value: '',
    isShow: false,
    suggestList: [],
    cur: -1,
    windowTop: 0,
    itemHeight: 0,
  };

  componentWillReceiveProps(nextProps) {
    this.fuse = new Fuse(nextProps.orders, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['order'],
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.windowTop !== this.state.windowTop) {
      // scroll to desired position
      this.autoCompleteRef.scrollTop = nextState.windowTop * nextState.itemHeight;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if alreay set itemHeight then don't update
    if (this.state.itemHeight && nextState.itemHeight !== this.state.itemHeight) {
      return false;
    }

    return true;
  }

  handleOpenDropDown = () => {
    this.setState({
      isShow: true,
    });
  }

  handleCloseDropDown = () => {
    this.setState({
      isShow: false,
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      value,
      // generate search suggestion list and de-duplicate it
      suggestList: uniqBy(this.fuse.search(value), 'order'),
      // reset cur cursor
      cur: -1,
    });
    this.props.handleChange(e);
  }

  handleSelect = (value) => (e) => {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      value,
      // clear all suggestions
      suggestList: [],
      // reset cur cursor
      cur: -1,
    });
    this.props.handleChange({
      target: {
        name: 'order',
        value,
      },
    });
  }

  handleKeyDown = (e) => {
    // no need to continue if suggest list is empty
    if (!this.state.suggestList.length) {
      return;
    }

    if (e.key === 'ArrowDown') {
      // click arrow down button, add up cur
      e.preventDefault();

      this.setState(state => ({
        cur: state.cur + 1 > state.suggestList.length - 1 ?
          state.suggestList.length - 1 :
          state.cur + 1,
      }), this.setWindow);
    } else if (e.key === 'ArrowUp') {
      // click arrow up button, substract down cur
      e.preventDefault();

      this.setState(state => ({
        cur: state.cur - 1 < -1 ?
          -1 :
          state.cur - 1,
      }), this.setWindow);
    } else if (e.key === 'Enter') {
      // click enter
      if (this.state.cur >= 0) {
        // if chose one of the list, trigger selection
        e.preventDefault();
        this.handleSelect(this.state.suggestList[this.state.cur].order)();
      }
    }
  }

  // when cur is changed, handle change of the windowing
  setWindow = () => {
    const { cur, windowTop, suggestList } = this.state;
    const { windowSize } = this.props;

    if (cur > windowTop + windowSize - 1) {
      // if cur is overflowing the current window
      this.setState(state => ({
        windowTop: state.windowTop + windowSize - 1 > suggestList.length - 1 ?
          suggestList.length - 1 - windowSize :
          state.windowTop + 1,
      }));
    } else if (cur < windowTop) {
      // if cur is underflowing the current window
      this.setState(state => ({
        windowTop: state.windowTop - 1 < 0 ? 0 : state.windowTop - 1,
      }));
    }
  }

  refCallback = (ref) => {
    this.autoCompleteRef = ref;

    // get the current fontSize in px and set the itemHeight
    const fontSize = parseFloat(window.getComputedStyle(this.autoCompleteRef).fontSize);
    this.setState({
      itemHeight: (fontSize * 2.5) + 1,
    });
  }

  autoCompleteRef = null;

  render() {
    const { windowSize } = this.props;
    const { isShow, value, suggestList, cur, itemHeight } = this.state;

    return (
      <div className="control" onFocus={this.handleOpenDropDown} onBlur={this.handleCloseDropDown}>
        <input
          className="input"
          type="text"
          name="order"
          placeholder="Place your order"
          value={value}
          onChange={this.handleChange}
          autoComplete="off"
          onKeyDown={this.handleKeyDown}
        />
        <List className="panel" innerRef={this.refCallback} maxHeight={itemHeight * windowSize} isShow={isShow}>
          {suggestList.map((suggest, i) => (
            <Item
              className={`panel-block ${i === cur ? 'is-active' : ''}`}
              key={suggest.key}
              onMouseDown={this.handleSelect(suggest.order)}
              height={itemHeight}
            >
              {suggest.order}
            </Item>
          ))}
        </List>
      </div>
    );
  }
}

export default AutoComplete;
