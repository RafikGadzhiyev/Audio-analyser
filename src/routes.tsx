import { createBrowserRouter } from "react-router-dom";

import App from './App.tsx'
import Visualizer from "./pages/Visualizer.tsx";
import MicrophoneVisualizer from "./pages/MicrophoneVisualizer.tsx";
import SongVisualizer from "./pages/SongVisualizer.tsx";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
    },
    {
      path: '/visualizer',
      element: <Visualizer/>,
      children: [
        {
          path: 'microphone',
          element: <MicrophoneVisualizer/>,
        },
        {
          path: 'audio',
          element: <SongVisualizer/>,
        }
      ]
    },
    {
      path: '*',
      element: <div>Not found</div>
    }
  ]
)
