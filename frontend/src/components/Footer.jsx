import React from 'react';
import StaticComponent from './StaticComponent';

require('./Footer.scss');

export default class Footer extends StaticComponent {
  render() {
    return (
      <div className="footer__div">
        <div>
          <a href="https://github.com/danscratch/pern">{'https://github.com/danscratch/pern'}</a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
};
