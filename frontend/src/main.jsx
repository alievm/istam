import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ConfigProvider} from "antd";
import frFR from 'antd/locale/ru_RU.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ConfigProvider
          locale={frFR}
          theme={{
              token: {
                  colorPrimary: '#43D0FF',
              },
          }}
      >
    <App />
      </ConfigProvider>
  </StrictMode>,
)
