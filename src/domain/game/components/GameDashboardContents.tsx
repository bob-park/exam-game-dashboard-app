import { useState } from 'react';

import useRSocket from '../../../shared/hooks/useRSocket';

const wsHost = 'ws://192.168.10.91:10001';
const RSOCKET_CONNECT = 'connect';

export default function GameDashboardContents() {
  // state
  const [dashborad, setDashboard] = useState<GameDashboard>();

  // hooks
  useRSocket({ host: wsHost, payloadData: {}, connectMapping: RSOCKET_CONNECT }, (data) => {
    setDashboard(data as GameDashboard);
  });

  return (
    <div className="" style={{ width: '100%', height: '100%' }}>
      {dashborad ? (
        <>
          {/*  title*/}
          <h2 className="" style={{ letterSpacing: 'var(--tracking-widest)' }}>
            {dashborad.game.name}
          </h2>

          {/* dashboard */}
          <div
            className=""
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '100px' }}
          >
            <div className="" style={{ flex: '1', textAlign: 'center' }}>
              <p className="" style={{}}>
                <strong>Home Team</strong>
              </p>
              <p className="" style={{ marginTop: '150px' }}>
                <span className="" style={{ fontSize: '240px' }}>
                  {dashborad.homeScore}
                </span>
              </p>
            </div>
            <div className="" style={{ flex: '1', textAlign: 'center' }}>
              <p className="" style={{ fontSize: '120px', fontFamily: 'initial', paddingTop: '130px' }}>
                VS
              </p>
            </div>
            <div className="" style={{ flex: '1', textAlign: 'center' }}>
              <p>
                <strong style={{}}>Away Team</strong>
              </p>
              <p style={{ marginTop: '150px' }}>
                <span className="" style={{ fontSize: '240px' }}>
                  {dashborad.awayScore}
                </span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div
          className=""
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
        >
          <p className="" style={{ flex: '1', textAlign: 'center' }}>
            대기중...
          </p>
        </div>
      )}
    </div>
  );
}
