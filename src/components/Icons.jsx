// RBT Design System Icons
// All icons: 24×24 viewBox, 1.5px stroke, sharp corners

export const Sparkle = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ display: 'inline' }}>
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"/>
  </svg>
)

export const Dot = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: 'inline' }}>
    <circle cx="12" cy="12" r="6" fill={color}/>
  </svg>
)

export const Square = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ display: 'inline' }}>
    <rect x="9" y="16" width="6" height="6"/>
  </svg>
)

export const Arrow = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5" style={{ display: 'inline' }}>
    <path d="M4 12 L20 12 M14 6 L20 12 L14 18"/>
  </svg>
)

// UI Icon Set
export const Dashboard = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18"/><path d="M3 9 H21 M9 3 V21"/>
  </svg>
)

export const List = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M3 6 H21 M3 12 H21 M3 18 H15"/>
  </svg>
)

export const ArrowLeft = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M11 4 L4 12 L11 20 M4 12 H20"/>
  </svg>
)

export const ArrowRight = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M13 4 L20 12 L13 20 M20 12 H4"/>
  </svg>
)

export const ChevronDown = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M4 7 L12 15 L20 7"/>
  </svg>
)

export const ChevronUp = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M4 17 L12 9 L20 17"/>
  </svg>
)

export const Close = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M5 5 L19 19 M19 5 L5 19"/>
  </svg>
)

export const Check = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M5 12 L10 17 L19 7"/>
  </svg>
)

export const Search = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="11" cy="11" r="6"/><path d="M16 16 L21 21"/>
  </svg>
)

export const Plus = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M3 12 H21 M12 3 V21"/>
  </svg>
)

export const Minus = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M3 12 H21"/>
  </svg>
)

export const Settings = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="3.5"/>
    <path d="M12 3 V6 M12 18 V21 M3 12 H6 M18 12 H21 M5.6 5.6 L7.7 7.7 M16.3 16.3 L18.4 18.4 M5.6 18.4 L7.7 16.3 M16.3 7.7 L18.4 5.6"/>
  </svg>
)

export const Info = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="9"/><path d="M12 7 V13 M12 16 V17"/>
  </svg>
)

// Service Pictograms (larger)
export const WebDevIcon = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <rect x="15" y="20" width="70" height="55"/>
    <path d="M15 32 H85"/>
    <circle cx="22" cy="26" r="1.5" fill={color}/><circle cx="28" cy="26" r="1.5" fill={color}/><circle cx="34" cy="26" r="1.5" fill={color}/>
    <path d="M30 50 L40 60 L30 70 M70 50 L60 60 L70 70 M52 47 L48 73"/>
  </svg>
)

export const AIIcon = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="50" cy="50" r="32"/>
    <circle cx="50" cy="50" r="20"/>
    <circle cx="50" cy="50" r="8"/>
    <circle cx="50" cy="50" r="2" fill={color}/>
    <path d="M50 18 V8 M50 92 V82 M18 50 H8 M92 50 H82"/>
  </svg>
)

export const ThreeDIcon = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M50 15 L85 35 V65 L50 85 L15 65 V35 Z"/>
    <path d="M50 15 V50 M15 35 L50 50 M85 35 L50 50 M50 50 V85"/>
    <path d="M30 25 L70 75 M70 25 L30 75" opacity="0.4"/>
  </svg>
)

export const HardwareIcon = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <rect x="20" y="35" width="60" height="40"/>
    <rect x="32" y="47" width="8" height="8"/>
    <rect x="46" y="47" width="8" height="8"/>
    <rect x="60" y="47" width="8" height="8"/>
    <path d="M30 35 V25 M50 35 V18 M70 35 V25 M30 75 V85 M50 75 V85 M70 75 V85"/>
    <circle cx="36" cy="65" r="2" fill={color}/><circle cx="50" cy="65" r="2" fill={color}/><circle cx="64" cy="65" r="2" fill={color}/>
  </svg>
)

export const ConsultingIcon = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M20 20 H80 V80 H20 Z"/>
    <path d="M30 35 H70 M30 45 H60 M30 55 H70 M30 65 H50"/>
    <path d="M75 75 L88 88" strokeWidth="2"/>
    <circle cx="72" cy="72" r="10"/>
  </svg>
)

export const InstallationsIcon = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="1.5">
    <path d="M15 75 L35 35 L55 60 L75 25 L88 50"/>
    <circle cx="35" cy="35" r="3" fill={color}/><circle cx="55" cy="60" r="3" fill={color}/><circle cx="75" cy="25" r="3" fill={color}/>
    <path d="M15 85 H88"/>
    <path d="M15 75 V20" opacity="0.4"/>
  </svg>
)
