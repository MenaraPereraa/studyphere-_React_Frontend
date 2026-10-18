import React from 'react'
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend)

/**
 * ChartRenderer - Generic chart component for dashboard
 * @param {object} props
 * @param {string} props.type - Chart type ('line', 'bar', 'pie', 'doughnut')
 * @param {object} props.data - Chart.js data object
 * @param {object} [props.options] - Chart.js options object
 */
const ChartRenderer = ({ type, data, options }) => {
  switch (type) {
    case 'line':
      return <Line data={data} options={options} />
    case 'bar':
      return <Bar data={data} options={options} />
    case 'pie':
      return <Pie data={data} options={options} />
    case 'doughnut':
      return <Doughnut data={data} options={options} />
    default:
      return null
  }
}

export default ChartRenderer

