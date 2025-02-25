import kind from '@enact/core/kind';
import Panels from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import RQProvider from '../shared/provider/RQProvider';
import MainPanel from '../views/MainPanel';
import css from './App.module.less';

const App = kind({
  name: 'App',

  styles: {
    css,
    className: 'app',
  },

  render: (props) => (
    <div {...props}>
      <Panels>
        <RQProvider>
          <MainPanel />
        </RQProvider>
      </Panels>
    </div>
  ),
});

export default ThemeDecorator(App);
