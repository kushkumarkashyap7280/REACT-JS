import React from 'react'

function Button({ onClick, children }) {
  console.log(`🔄 Button "${children}" rendered`);

  return (
    <div style={{ margin: '5px', display: 'inline-block' }}>
      <button
        onClick={onClick}
        style={{
          padding: '8px 16px',
          margin: '2px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#0056b3';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#007bff';
        }}
      >
        {children}
      </button>
    </div>
  )
}

// ❌ Without React.memo - re-renders every time parent renders
// export default Button;

// ✅ With React.memo - only re-renders when props change
export default React.memo(Button);


