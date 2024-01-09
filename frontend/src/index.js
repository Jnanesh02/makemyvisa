import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoadingPage from './Pages/LoadingPage/LoadingPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
const LazyApp = React.lazy(() => import('./App'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>
);


