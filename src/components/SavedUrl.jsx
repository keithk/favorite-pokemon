import React, { useRef, useState } from 'react';

const SavedUrl = ({ url }) => {
  const inputRef = useRef(null);

  return (
    <div>
      <h2>Save URL</h2>
      <p>Send this URL to show what team you've chosen:</p>
      need to completely rebuild this, it was insane
    </div>
  );
};

export default React.memo(SavedUrl);
