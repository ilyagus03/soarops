import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './Demo';

// React 18 way
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Demo />);