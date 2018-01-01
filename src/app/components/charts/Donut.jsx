import React from 'react';

class Donut extends React.Component {
  render() {
    const percent = (100 * this.props.score) / this.props.total;
    const svg = (
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" style={{ stopColor: '#E67207' }} />
            <stop offset="30%" style={{ stopColor: '#E67207' }} />
            <stop offset="60%" style={{ stopColor: '#EF4E7B' }} />
            <stop offset="100%" style={{ stopColor: '#A166AB' }} />
          </linearGradient>
        </defs>
        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="19"
          fill="url(#grad)"
          stroke="#101416"
          strokeWidth="0"
        />
        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="18.6"
          fill="#101416"
          stroke="#101416"
          strokeWidth="0"
        />
        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="17.9"
          fill="url(#grad)"
          stroke="#101416"
          strokeWidth="0"
        />
        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="17.5"
          fill="#101416"
          stroke="#101416"
          strokeWidth="0"
        />
        <circle
          className="donut-segment animated fadeIn rotateIn"
          cx="21"
          cy="21"
          r="18"
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth="1.5"
          strokeDasharray={`${percent} ${100 - percent}`}
        />

        <g className="donut-text">
          <text x="50%" y="50%" className="donut-number">
            {this.props.score}
          </text>
          <text x="50%" y="50%" className="donut-label">
            Total
          </text>
        </g>
      </svg>
    );
    return svg;
  }
}

export default Donut;
