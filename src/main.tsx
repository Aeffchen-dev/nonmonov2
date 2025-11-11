import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { addIntersectionDots } from './lib/iconIntersections'

console.log('Main.tsx loading - current URL:', window.location.href);
console.log('Import meta env:', import.meta.env);
console.log('Base URL:', import.meta.env.BASE_URL);

createRoot(document.getElementById("root")!).render(<App />);

// Add intersection dots after initial render and on any DOM changes
setTimeout(() => addIntersectionDots(), 100);
const observer = new MutationObserver(() => {
  addIntersectionDots();
});
observer.observe(document.body, { childList: true, subtree: true });
