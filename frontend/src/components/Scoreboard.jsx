export default function Scoreboard({ time1, time2, placar1, placar2 }) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        padding: '20px',
        fontSize: '24px',
        background: '#f3f3f3',
        borderRadius: '10px',
        margin: '20px 0'
      }}>
        <div>
          <strong>{time1}</strong>
          <div>{placar1}</div>
        </div>
        <div>
          <strong>{time2}</strong>
          <div>{placar2}</div>
        </div>
      </div>
    );
  }
  