import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import './stylesheets/general.vars.css';
import './stylesheets/general.transition.css';
import './stylesheets/general.animation.css';
import './stylesheets/general.class.css';
import './stylesheets/sidebar.css';
import './stylesheets/csstrans.playlist-video.css';
import './stylesheets/sk-loader.css';
import './index.css';

export { CTLayout } from './CTLayout';
export { CTNavHeader } from './CTLayout/CTNavHeader';
export { CTFragment } from './CTLayout/CTFragment';
export { CTFooter } from './CTLayout/CTFooter';
export { SignInMenu } from './CTLayout/CTNavHeader/NavHeaderMenu/SignInMenu';
export { CTErrorWrapper } from './CTLayout/CTErrorWrapper';
export { CTLoader } from './CTLayout/CTLoader';
export { CTLoadable } from './CTLayout/CTLoadable';

export { SignInPrompt } from './SignInPrompt';

export { Poster } from './Poster';
export { VideoCard, VideoCardPlaceHolder } from './Cards';

export { GeneralModal, CTModal } from './Modals';

// export { CTErrorWrapper } from './CTErrorWrapper';

// Need to be removed later
export { CTButton } from './Buttons';
export { CTForm } from './CTForm';
export { GeneralAlert } from './Alerts';
export { GeneralLoader } from './Loaders';

/**
 * General Components
 */

export function MaintenanceMessage() {
  const begin = new Date('2019-09-26T00:00:00');
  const end = new Date('2019-09-28T22:00:00');
  const current = new Date();
  const [open, setOpen] = useState(current >= begin && current <= end);
  return (
    <Alert show={open} dismissible onClose={() => setOpen(false)} variant="primary">
      <i className="material-icons">announcement</i>
      <p>
        ClassTranscribe will be down from <strong>September 27 10:00pm</strong> to{' '}
        <strong>September 28 10:00pm</strong>. Thanks for your patience.
      </p>
    </Alert>
  );
}

export function SidebarDimmer({ show, onClose }) {
  return (
    <div
      style={{ display: show ? 'block' : 'none' }}
      className="sidebar-dimmer"
      onClick={onClose}
    />
  );
}
