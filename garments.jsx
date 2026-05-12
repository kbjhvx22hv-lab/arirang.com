const GarmentBase = ({ children, viewBox = "0 0 200 240" }) => (
  <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={{ width: "70%", height: "70%", display: "block" }}>
    {children}
  </svg>
);

const shade = (c) => "rgba(0,0,0,.08)";

const Tee = ({ color = "#e8e3d8", alt = false }) => (
  <GarmentBase>
    <defs>
      <linearGradient id="teeShade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="rgba(0,0,0,.06)" />
        <stop offset=".5" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,.08)" />
      </linearGradient>
    </defs>
    <path
      d="M40 60 L70 35 Q100 22 130 35 L160 60 L185 90 L165 105 L155 90 L155 200 Q155 215 140 218 L60 218 Q45 215 45 200 L45 90 L35 105 L15 90 Z"
      fill={color}
      stroke="rgba(0,0,0,.5)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {alt ? (
      <path d="M82 35 Q100 42 118 35" fill="none" stroke="rgba(0,0,0,.45)" strokeWidth="1.2" />
    ) : (
      <path
        d="M78 32 Q100 56 122 32"
        fill={shade(color)}
        stroke="rgba(0,0,0,.4)"
        strokeWidth="1.2"
      />
    )}
    <rect x="45" y="60" width="110" height="158" fill="url(#teeShade)" />
    <path d="M70 35 L78 60" stroke="rgba(0,0,0,.18)" strokeWidth=".8" fill="none" />
    <path d="M130 35 L122 60" stroke="rgba(0,0,0,.18)" strokeWidth=".8" fill="none" />
    <line x1="50" y1="212" x2="150" y2="212" stroke="rgba(0,0,0,.15)" strokeWidth=".5" />
  </GarmentBase>
);

const Hoodie = ({ color = "#3a3631", alt = false }) => (
  <GarmentBase>
    <defs>
      <linearGradient id="hoodShade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="rgba(0,0,0,.12)" />
        <stop offset=".5" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,.14)" />
      </linearGradient>
    </defs>
    <path
      d="M70 38 Q100 8 130 38 Q140 48 138 60 L62 60 Q60 48 70 38 Z"
      fill={color}
      stroke="rgba(0,0,0,.55)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M82 50 Q100 32 118 50 Q120 56 118 60 L82 60 Q80 56 82 50 Z"
      fill="rgba(0,0,0,.35)"
    />
    <path
      d="M40 65 L65 45 L78 60 L122 60 L135 45 L160 65 L185 95 L168 112 L158 102 L158 205 Q158 222 142 224 L58 224 Q42 222 42 205 L42 102 L32 112 L15 95 Z"
      fill={color}
      stroke="rgba(0,0,0,.55)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {!alt && (
      <path
        d="M70 145 L130 145 L140 195 L60 195 Z"
        fill="none"
        stroke="rgba(0,0,0,.3)"
        strokeWidth=".9"
      />
    )}
    {!alt && (
      <>
        <line x1="92" y1="60" x2="90" y2="100" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
        <line x1="108" y1="60" x2="110" y2="100" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
        <circle cx="90" cy="102" r="1.5" fill="rgba(255,255,255,.6)" />
        <circle cx="110" cy="102" r="1.5" fill="rgba(255,255,255,.6)" />
      </>
    )}
    <line x1="15" y1="95" x2="32" y2="112" stroke="rgba(0,0,0,.25)" strokeWidth=".6" />
    <line x1="185" y1="95" x2="168" y2="112" stroke="rgba(0,0,0,.25)" strokeWidth=".6" />
    <rect x="42" y="216" width="116" height="8" fill="rgba(0,0,0,.18)" />
    <rect x="45" y="60" width="110" height="164" fill="url(#hoodShade)" />
  </GarmentBase>
);

const Pants = ({ color = "#2a2722", alt = false }) => (
  <GarmentBase viewBox="0 0 200 280">
    <defs>
      <linearGradient id="pantsShade" x1="0" x2="1">
        <stop offset="0" stopColor="rgba(0,0,0,.1)" />
        <stop offset=".5" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,.12)" />
      </linearGradient>
    </defs>
    <rect x="55" y="20" width="90" height="14" fill={color} stroke="rgba(0,0,0,.5)" strokeWidth="1" />
    <path
      d="M55 34 L145 34 L150 90 L138 260 L108 260 L100 130 L92 260 L62 260 L50 90 Z"
      fill={color}
      stroke="rgba(0,0,0,.5)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <line x1="100" y1="34" x2="100" y2="130" stroke="rgba(0,0,0,.25)" strokeWidth=".7" />
    {!alt && (
      <>
        <rect x="68" y="20" width="2" height="6" fill="rgba(0,0,0,.4)" />
        <rect x="98" y="20" width="2" height="6" fill="rgba(0,0,0,.4)" />
        <rect x="128" y="20" width="2" height="6" fill="rgba(0,0,0,.4)" />
      </>
    )}
    {!alt ? (
      <>
        <path d="M62 44 Q72 56 88 56" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth=".7" />
        <path d="M138 44 Q128 56 112 56" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth=".7" />
      </>
    ) : (
      <>
        <rect x="68" y="60" width="22" height="22" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth=".7" />
        <rect x="110" y="60" width="22" height="22" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth=".7" />
      </>
    )}
    <line x1="62" y1="256" x2="92" y2="256" stroke="rgba(0,0,0,.2)" strokeWidth=".7" />
    <line x1="108" y1="256" x2="138" y2="256" stroke="rgba(0,0,0,.2)" strokeWidth=".7" />
    <rect x="50" y="34" width="100" height="226" fill="url(#pantsShade)" />
  </GarmentBase>
);

const Jacket = ({ color = "#4a4339", alt = false }) => (
  <GarmentBase viewBox="0 0 200 260">
    <defs>
      <linearGradient id="jktShade" x1="0" x2="1">
        <stop offset="0" stopColor="rgba(0,0,0,.1)" />
        <stop offset=".5" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,.12)" />
      </linearGradient>
    </defs>
    <path
      d="M40 70 L72 38 Q88 32 100 38 Q112 32 128 38 L160 70 L186 100 L170 116 L160 104 L160 230 Q160 240 150 240 L50 240 Q40 240 40 230 L40 104 L30 116 L14 100 Z"
      fill={color}
      stroke="rgba(0,0,0,.55)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {!alt && (
      <>
        <path d="M72 38 L100 70 L100 220" fill="rgba(0,0,0,.18)" stroke="rgba(0,0,0,.5)" strokeWidth=".9" />
        <path d="M128 38 L100 70" fill="rgba(0,0,0,.18)" stroke="rgba(0,0,0,.5)" strokeWidth=".9" />
        <circle cx="100" cy="120" r="1.6" fill="rgba(0,0,0,.55)" />
        <circle cx="100" cy="160" r="1.6" fill="rgba(0,0,0,.55)" />
        <circle cx="100" cy="200" r="1.6" fill="rgba(0,0,0,.55)" />
      </>
    )}
    {alt && (
      <line x1="100" y1="38" x2="100" y2="240" stroke="rgba(0,0,0,.3)" strokeWidth=".8" />
    )}
    <rect x="55" y="160" width="34" height="3" fill="rgba(0,0,0,.4)" />
    <rect x="111" y="160" width="34" height="3" fill="rgba(0,0,0,.4)" />
    <rect x="40" y="70" width="120" height="170" fill="url(#jktShade)" />
  </GarmentBase>
);

const Cap = ({ color = "#1a1815", alt = false }) => (
  <GarmentBase viewBox="0 0 220 160">
    <defs>
      <linearGradient id="capShade" x1="0" x2="1">
        <stop offset="0" stopColor="rgba(0,0,0,.15)" />
        <stop offset=".5" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,.18)" />
      </linearGradient>
    </defs>
    <path
      d="M40 95 Q40 50 110 45 Q180 50 180 95 L180 100 L40 100 Z"
      fill={color}
      stroke="rgba(0,0,0,.5)"
      strokeWidth="1"
    />
    <path
      d="M30 100 L195 100 L210 118 Q140 128 30 118 Z"
      fill={color}
      stroke="rgba(0,0,0,.5)"
      strokeWidth="1"
    />
    {!alt && (
      <>
        <path d="M110 45 L90 95" stroke="rgba(0,0,0,.18)" strokeWidth=".7" fill="none" />
        <path d="M110 45 L130 95" stroke="rgba(0,0,0,.18)" strokeWidth=".7" fill="none" />
        <circle cx="110" cy="46" r="2" fill="rgba(0,0,0,.4)" />
      </>
    )}
    {alt && <rect x="80" y="68" width="60" height="22" fill="rgba(0,0,0,.25)" />}
    <rect x="40" y="50" width="140" height="50" fill="url(#capShade)" />
  </GarmentBase>
);

const Bag = ({ color = "#a8997e", alt = false }) => (
  <GarmentBase viewBox="0 0 200 240">
    <path d="M70 50 Q70 18 100 18 Q130 18 130 50" fill="none" stroke={color} strokeWidth="4" />
    <rect x="40" y="50" width="120" height="160" fill={color} stroke="rgba(0,0,0,.5)" strokeWidth="1" />
    {!alt ? (
      <text x="100" y="135" textAnchor="middle" fontFamily="serif" fontSize="14" fill="rgba(0,0,0,.45)">
        ARIRANG
      </text>
    ) : (
      <rect x="60" y="120" width="80" height="22" fill="none" stroke="rgba(0,0,0,.3)" />
    )}
  </GarmentBase>
);

const Dress = ({ color = "#222", alt = false }) => (
  <GarmentBase viewBox="0 0 200 280">
    <defs>
      <linearGradient id="dressShade" x1="0" x2="1">
        <stop offset="0" stopColor="rgba(0,0,0,.1)" />
        <stop offset=".5" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,.12)" />
      </linearGradient>
    </defs>
    <path
      d="M70 38 Q100 28 130 38 L142 90 L160 260 L40 260 L58 90 Z"
      fill={color}
      stroke="rgba(0,0,0,.5)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {alt ? (
      <path d="M88 38 Q100 70 112 38" fill={shade(color)} stroke="rgba(0,0,0,.4)" strokeWidth="1" />
    ) : (
      <path d="M82 38 Q100 56 118 38" fill={shade(color)} stroke="rgba(0,0,0,.4)" strokeWidth="1" />
    )}
    <rect x="40" y="38" width="120" height="222" fill="url(#dressShade)" />
  </GarmentBase>
);

window.Garments = { Tee, Hoodie, Pants, Jacket, Cap, Bag, Dress };
