import kind from '@enact/core/kind';
import { Panel } from '@enact/sandstone/Panels';

import GameDashboardContents from '../domain/game/components/GameDashboardContents';

const MainPanel = kind({
  name: 'MainPanel',

  render: (props) => (
    <Panel {...props}>
      <GameDashboardContents />
    </Panel>
  ),
});

export default MainPanel;
