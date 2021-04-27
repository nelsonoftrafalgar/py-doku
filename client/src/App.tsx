import Game from './containers/Game'
import GlobalState from './containers/GlobalState'
import { SectorValues } from './model'
import { createGlobalStyle } from 'styled-components'

const StyleReset = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}`

const App = () => {
	return (
		<>
			<StyleReset />
			<GlobalState render={(data: SectorValues[]) => <Game data={data} />} />
		</>
	)
}

export default App
