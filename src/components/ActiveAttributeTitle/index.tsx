import React from 'react';
import useActiveAttribute from '../../hooks/useActiveAttribute';
import { extractGroupNameFromGroupKey } from '../../utils/function/functions';

function ActiveAttributeTitle() {
  const { attributeData } = useActiveAttribute();

  return attributeData?.groupName || attributeData?.name ? (
    <div style={{ fontSize: '18px', lineHeight: '24px' }}>
      Select a{' '}
      {attributeData?.groupName
        ? extractGroupNameFromGroupKey(attributeData?.groupName)
        : attributeData?.name}
    </div>
  ) : null;
}

export default ActiveAttributeTitle;
