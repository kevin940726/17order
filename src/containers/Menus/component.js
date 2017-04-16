import React, { PureComponent } from 'react';
import SmallLabel from '../../components/SmallLabel';
import styled from 'styled-components';
import { mapTimestampToDate, getShortDate } from '../../utils/dates';

const Icon = styled.span`
  margin-right: 0.5em;
  color: #999;
`;

const getYesterdayTimestamp = () => {
  const now = new Date();
  // set to yesterday same time
  const yesterday = new Date(now.setDate(now.getDate() - 1));
  // set to 00:00
  yesterday.setHours(0, 0, 0, 0);

  // convert to timestamp
  return yesterday.getTime();
};

class Menus extends PureComponent {
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

  render() {
    const { menus, value, handleChange, isExpanded, expandMenus, handleOpenNewMenuModal } = this.props;

    if (!value) {
      return null;
    }

    return (
      <div>
        <div className="field has-text-right">
          <button
            className="button is-primary is-outlined"
            onClick={handleOpenNewMenuModal}
          >
            New Menu
          </button>
        </div>

        <nav className="panel">
          <div className="panel-heading">
            Menus
          </div>
          {menus.filter(menu => isExpanded ? true : menu.timestamp >= getYesterdayTimestamp() )
            .map(menu => (
              <a
                key={menu.key}
                className={`panel-block ${menu.key === value ? 'is-active' : ''}`}
                onClick={handleChange(menu.key)}
              >
                <p className="control">
                  <Icon className="icon">
                    {menu.type === 'restaurant' ? (
                      <i className="fa fa-cutlery"></i>
                    ) : (
                      <i className="fa fa-coffee"></i>
                    )}
                  </Icon>
                  <span>
                    {menu.name}
                  </span>
                  <SmallLabel className="is-pulled-right">
                    <span>{mapTimestampToDate(menu.timestamp)}</span>
                    {' '}
                    <span>{getShortDate(menu.timestamp)}</span>
                  </SmallLabel>
                </p>
              </a>
            ))}
          <div className="panel-block">
            <button
              className="button is-fullwidth"
              onClick={expandMenus}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menus;
