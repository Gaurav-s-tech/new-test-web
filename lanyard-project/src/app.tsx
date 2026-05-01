import Lanyard from './components/lanyard'
import './app.css'

function App() {

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, background: 'transparent' }}>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />
    </div>
  )
}

export default App