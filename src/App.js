// App.js
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./components/Home'));
const BreedDetail = lazy(() => import('./components/BreedDetail'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breed/:breed/:subBreed?" element={<BreedDetail />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
