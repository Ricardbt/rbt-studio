import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Fuentes servidas desde el propio dominio: Google Fonts era una hoja de
// estilo externa que bloqueaba el primer pintado. Archivo lleva el eje de
// ancho (wdth) además del de peso; el sistema lo usa para la densidad.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/spline-sans-mono/wght.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)