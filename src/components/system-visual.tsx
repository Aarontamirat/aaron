export function SystemVisual() {
  return (
    <div className="system-visual" aria-hidden="true">
      <div className="system-atmosphere" />
      <div className="visual-coordinate coordinate-top mono">
        ARCHITECTURE / CONNECTED BY DESIGN
      </div>
      <svg className="system-svg" viewBox="0 0 600 540" fill="none">
        <defs>
          <linearGradient
            id="plane-fill"
            x1="110"
            y1="160"
            x2="460"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#789DFA" stopOpacity=".18" />
            <stop offset=".5" stopColor="#142440" stopOpacity=".7" />
            <stop offset="1" stopColor="#3058AD" stopOpacity=".08" />
          </linearGradient>
          <linearGradient
            id="plane-stroke"
            x1="140"
            y1="100"
            x2="480"
            y2="390"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C2D2FF" stopOpacity=".75" />
            <stop offset=".5" stopColor="#719FF7" stopOpacity=".35" />
            <stop offset="1" stopColor="#497CD7" stopOpacity=".12" />
          </linearGradient>
          <linearGradient
            id="core-fill"
            x1="260"
            y1="180"
            x2="360"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C2D4FF" />
            <stop offset=".45" stopColor="#7397EF" />
            <stop offset="1" stopColor="#263F78" />
          </linearGradient>
          <radialGradient id="core-light">
            <stop stopColor="#709EFF" stopOpacity=".3" />
            <stop offset="1" stopColor="#709EFF" stopOpacity="0" />
          </radialGradient>
          <filter id="soft-light">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <pattern
            id="plane-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="matrix(1 .5 -1 .5 300 70)"
          >
            <path
              d="M28 0H0V28"
              stroke="#8BABF5"
              strokeOpacity=".12"
              strokeWidth=".7"
            />
          </pattern>
        </defs>
        <circle cx="300" cy="265" r="200" fill="url(#core-light)" />
        <g className="system-orbits" stroke="#6689C8" strokeOpacity=".19">
          <ellipse
            cx="300"
            cy="284"
            rx="265"
            ry="130"
            transform="rotate(-22 300 284)"
          />
          <ellipse
            cx="300"
            cy="284"
            rx="260"
            ry="125"
            transform="rotate(25 300 284)"
            strokeDasharray="3 9"
          />
          <path
            d="M300 35V497M42 284H565"
            strokeDasharray="2 9"
            strokeOpacity=".14"
          />
          <circle cx="300" cy="284" r="235" strokeOpacity=".09" />
        </g>
        <g className="system-stack">
          <path
            d="m300 268 179 96-179 96-179-96 179-96Z"
            fill="url(#plane-fill)"
            stroke="url(#plane-stroke)"
          />
          <path
            d="m121 364 179 96 179-96v12l-179 96-179-96v-12Z"
            fill="#111C32"
            stroke="#537CC4"
            strokeOpacity=".22"
          />
          <path
            d="m300 188 179 96-179 96-179-96 179-96Z"
            fill="url(#plane-fill)"
            stroke="url(#plane-stroke)"
          />
          <path
            d="m121 284 179 96 179-96v10l-179 96-179-96v-10Z"
            fill="#15213A"
            stroke="#537CC4"
            strokeOpacity=".25"
          />
          <path
            d="m300 106 179 96-179 96-179-96 179-96Z"
            fill="url(#plane-fill)"
            stroke="url(#plane-stroke)"
          />
          <path
            d="m300 106 179 96-179 96-179-96 179-96Z"
            fill="url(#plane-grid)"
          />
          <path
            d="m121 202 179 96 179-96v10l-179 96-179-96v-10Z"
            fill="#182746"
            stroke="#537CC4"
            strokeOpacity=".3"
          />
          <path
            d="M191 240v80l109 58 108-58v-80M300 299v159M191 320v82M408 320v82"
            stroke="#719CF2"
            strokeOpacity=".3"
            strokeDasharray="3 5"
          />
          <path
            d="m300 185 58 31v64l-58 31-58-31v-64l58-31Z"
            fill="url(#core-fill)"
            fillOpacity=".12"
            stroke="#95B3FF"
            strokeOpacity=".6"
          />
          <path
            d="m300 185 58 31-58 32-58-32 58-31Z"
            fill="url(#core-fill)"
            fillOpacity=".7"
          />
          <path
            d="m242 216 58 32v63l-58-31v-64Z"
            fill="#557DD2"
            fillOpacity=".5"
          />
          <path
            d="m358 216-58 32v63l58-31v-64Z"
            fill="#1F3F83"
            fillOpacity=".6"
          />
          <path
            d="m300 185 58 31-58 32-58-32 58-31Zm0 63v63"
            stroke="#B0C9FF"
            strokeOpacity=".8"
          />
          <path
            d="m273 217 27-15 27 15-27 15-27-15Z"
            fill="#B9D0FF"
            fillOpacity=".15"
            stroke="#C1D6FF"
            strokeOpacity=".65"
          />
          <path
            d="m273 217 27-15 27 15-27 15-27-15Z"
            stroke="#96B9FF"
            strokeWidth="5"
            filter="url(#soft-light)"
          />
          <g fill="#9BB9FA" stroke="#172743" strokeWidth="3">
            <circle cx="191" cy="240" r="5" />
            <circle cx="408" cy="240" r="5" />
            <circle cx="191" cy="320" r="5" />
            <circle cx="408" cy="320" r="5" />
            <circle cx="300" cy="458" r="5" />
          </g>
          <path
            d="M408 240h57l31-25M191 320h-52l-34 22M408 401h40l38 24"
            stroke="#799DDE"
            strokeOpacity=".5"
          />
        </g>
        <g
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="1.8"
          fill="#9BACC8"
        >
          <text x="470" y="201">
            INTERFACE
          </text>
          <text x="38" y="361">
            APPLICATION
          </text>
          <text x="453" y="446">
            DATABASE
          </text>
        </g>
        <g fill="#89ADF7">
          <circle cx="529" cy="238" r="3" />
          <circle cx="71" cy="332" r="2" />
          <circle cx="337" cy="71" r="2" />
        </g>
      </svg>
      <div className="visual-coordinate coordinate-bottom">
        <span className="visual-cross">+</span>
        <span className="mono">FROM THE FIRST PIXEL TO THE LAST QUERY</span>
        <span className="visual-cross">+</span>
      </div>
    </div>
  );
}
