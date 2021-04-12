import { FC, useEffect, useState } from 'react'

const App: FC = () => {
	const [response, setResponse] = useState('')

	useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((res) => setResponse(res))
	}, [])

	return <div>Cient resopnse: {response}</div>
}

export default App
