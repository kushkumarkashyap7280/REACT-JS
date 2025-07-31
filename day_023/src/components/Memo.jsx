import React, { memo } from 'react'

function MemoComponent({ user }) {
  console.log(`📦 MemoComponent rendered with user:`, user);
  
  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px 0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>
        Memoized Component
      </h3>
      <div style={{ fontSize: '14px' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        {user.theme && <p><strong>Theme:</strong> {user.theme}</p>}
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          This component should only re-render when user props change
        </p>
      </div>
    </div>
  )
}

// ❌ Without memo - re-renders every time parent renders
// export default MemoComponent;

// ✅ With memo - only re-renders when props change
export default memo(MemoComponent);