const ProgressBar = ({ progress }) => {
    return (
      <div style={{ width: '100%', backgroundColor: '#ddd', height: '16px' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#4caf50',
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </div>
    )
  }
  
  export default ProgressBar
  