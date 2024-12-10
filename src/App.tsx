import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import AnimatedBackground from './components/Background/AnimatedBackground';

function App() {
  return (
    <>
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;