import { useEffect, useState } from 'react';

import useRSocket from '../../../shared/hooks/useRSocket';

const wsHost = 'ws://192.168.10.91:10001';
const RSOCKET_CONNECT = 'connect';
const RSOCKET_STOPWATCH_CONNECT = 'stopWatch.connect';

interface StopWatchData {
  action: 'START' | 'PAUSE';
  seconds: number;
}

export default function GameDashboardContents() {
  // state
  const [dashborad, setDashboard] = useState<GameDashboard>();
  const [stopWatch, setStopWatch] = useState<StopWatchData>();
  const [currentSeconds, setCurrentSeconds] = useState<number>(24);

  // hooks
  useRSocket({ host: wsHost, payloadData: {}, connectMapping: RSOCKET_CONNECT }, (data) => {
    setDashboard(data as GameDashboard);
  });

  useRSocket({ host: wsHost, payloadData: {}, connectMapping: RSOCKET_STOPWATCH_CONNECT }, (data) => {
    setStopWatch(data as StopWatchData);
  });

  // useEffect
  useEffect(() => {
    if (!stopWatch) {
      return;
    }

    let intervalId = null;

    setCurrentSeconds(stopWatch?.seconds || 24);

    if (stopWatch.action === 'START') {
      intervalId = setInterval(() => {
        setCurrentSeconds((prev) => {
          const current = prev - 1;

          return current < 0 ? 0 : current;
        });
      }, 1_000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [stopWatch]);

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

          {/* stop watch */}
          <div
            className=""
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '100px' }}
          >
            <div className="" style={{ flex: '1', textAlign: 'center', fontSize: '120px' }}>
              {currentSeconds > 0 ? (
                <span className="" style={{ color: currentSeconds < 10 ? 'red' : '' }}>
                  {currentSeconds}
                </span>
              ) : (
                <span style={{ color: 'red' }}>Turn Over!!!</span>
              )}
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
