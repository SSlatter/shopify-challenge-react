import React from 'react';

import '../styles/Repository.css';

export default function Repository ({ name, language, tag, onClick, btn }) {
  return (
    <div className='table-row'>
      <div className='repo-name'>{name}</div>
      <div className='repo-language'>{language}</div>
      <div className='repo-tag'>{tag}</div>
      {btn.show && 
        <a href='#' className='repo-button' onClick={onClick}>
          {btn.type === 'add' ? 'Add' : 'Remove'}
        </a>
      }
    </div>
  );
}