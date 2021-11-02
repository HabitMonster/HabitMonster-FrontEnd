import { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Portal = ({ children, parent, className }) => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = ['portal-container'];

    if (className) {
      className.split(' ').forEach((classChunk) => classList.push(classChunk));
    }

    target.appendChild(element);

    return () => target.removeChild(element);
  }, [element, parent, className]);

  return createPortal(children, element);
};

Portal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType])
    .isRequired,
  parent: PropTypes.instanceOf(Element),
  className: PropTypes.string,
};

export default Portal;
