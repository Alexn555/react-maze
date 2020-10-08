import React from 'react';
import '../../styles/common.scss';

export default function MazeError({page, items, loading, errors}){

  const loadingMessage = (
     <div className="errorMessage">
       <span> Loading... </span>
     </div>
  );

  const emptyMessage = (
      <div className="errorMessage">
        <span>No Map items found for game <b> {page} </b> </span>
      </div>
  );

  const timeoutMessage = (
      <div className="errorMessage">
        <span>{errors.global}</span>
        <p>Is the backend server running?</p>
      </div>
  );

  return (
      <div>
          { loading && loadingMessage }
          { (items === null || typeof items === 'undefined' || items.length === 0)
          && !loading  && !errors.global && emptyMessage }
          { errors.global && timeoutMessage }
      </div>
  )
}
