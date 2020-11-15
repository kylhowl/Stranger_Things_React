import React from 'react';

/**
 * Create and export a component called Loading which uses this static HTML template:
 *
 * <div id="loading">
 *   <h2 className="message">Searching...</h2>
 * </div>
 */

const Loading = ( { option } ) => {
  return (
    <div className={option}>
        <div id='loading'>
            <h2 className='gremlins'>Gremlins at work...</h2>
        </div>
    </div>
  );
};

export default Loading