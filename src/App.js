import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BasicLayout></BasicLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
