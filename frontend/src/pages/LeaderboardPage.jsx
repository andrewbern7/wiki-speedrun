const LeaderboardPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      

      {/* Title */}
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#1e40af', margin: '3rem 0', textAlign: 'center' }}>
         Leaderboard 
      </h1>

      {/* Table */}
      <table style={{ width: '100%', fontSize: '1.75rem', textAlign: 'center', borderCollapse: 'separate', borderSpacing: '0 1.5rem', backgroundColor: 'transparent' }}>
        <thead style={{ backgroundColor: '#1d4ed8', color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
          <tr>
            <th style={{ padding: '1.5rem' }}>#</th>
            <th style={{ padding: '1.5rem' }}>Player</th>
            <th style={{ padding: '1.5rem' }}>Fastest Time</th>
            <th style={{ padding: '1.5rem' }}>Fastest Click</th>
            <th style={{ padding: '1.5rem' }}>Recent Runs</th>
            <th style={{ padding: '1.5rem' }}>Fewest Clicks</th>
          </tr>
        </thead>
        <tbody>
        <tr style={{ backgroundColor: 'transparent' }}>
            <td style={{ padding: '1.5rem' }}>01</td>
            <td style={{ padding: '1.5rem' }}>Alice</td>
            <td style={{ padding: '1.5rem' }}>1:23</td>
            <td style={{ padding: '1.5rem' }}>4</td>
            <td style={{ padding: '1.5rem' }}>6</td>
            <td style={{ padding: '1.5rem' }}>3</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={{ padding: '1.5rem' }}>02</td>
            <td style={{ padding: '1.5rem' }}>Bob</td>
            <td style={{ padding: '1.5rem' }}>1:45</td>
            <td style={{ padding: '1.5rem' }}>5</td>
            <td style={{ padding: '1.5rem' }}>5</td>
            <td style={{ padding: '1.5rem' }}>4</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={{ padding: '1.5rem' }}>03</td>
            <td style={{ padding: '1.5rem' }}>Charlie</td>
            <td style={{ padding: '1.5rem' }}>2:01</td>
            <td style={{ padding: '1.5rem' }}>6</td>
            <td style={{ padding: '1.5rem' }}>8</td>
            <td style={{ padding: '1.5rem' }}>4</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={{ padding: '1.5rem' }}>04</td>
            <td style={{ padding: '1.5rem' }}>Dana</td>
            <td style={{ padding: '1.5rem' }}>2:20</td>
            <td style={{ padding: '1.5rem' }}>7</td>
            <td style={{ padding: '1.5rem' }}>9</td>
            <td style={{ padding: '1.5rem' }}>6</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={{ padding: '1.5rem' }}>05</td>
            <td style={{ padding: '1.5rem' }}>Eli</td>
            <td style={{ padding: '1.5rem' }}>2:45</td>
            <td style={{ padding: '1.5rem' }}>8</td>
            <td style={{ padding: '1.5rem' }}>7</td>
            <td style={{ padding: '1.5rem' }}>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
