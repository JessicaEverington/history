import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from '../A';
import LocaleToggleComponent from '../../containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper
      className="footer mt-auto py-3 text-muted"
    >
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggleComponent />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/danactive">Dan BROOKS</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
