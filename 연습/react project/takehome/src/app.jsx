import './app.css';
import Canvas from './components/canvas/canvas';
import List from './components/list/list';

function App() {
  return (
    <div className='app'>
        <h3>Project Canvas</h3>
        <section className='container'>
            <Canvas/>
            <List/>
        </section>
    </div>
  );
}

export default App;
