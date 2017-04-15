import React, { PureComponent } from 'react';
import SmallLabel from '../../components/SmallLabel';
import TimeAgo from '../../components/TimeAgo';

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
    const { menus, value, handleChange } = this.props;

    if (!value) {
      return (<div>loading...</div>);
    }

    return (
      <nav className="panel">
        {menus.map(menu => (
          <a
            key={menu.key}
            className={`panel-block ${menu.key === value ? 'is-active' : ''}`}
            onClick={handleChange(menu.key)}
          >
            <p className="control">
              <span>
                {menu.name}
              </span>
              <SmallLabel className="is-pulled-right">
                <TimeAgo date={menu.timestamp} />
              </SmallLabel>
            </p>
          </a>
        ))}
      </nav>
    );
  }
}

export default Menus;
