import React from 'react';

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