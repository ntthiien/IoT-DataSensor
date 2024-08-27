


import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const random = (min, max) => Math.round(Math.random() * (max - min) + min)

  // Tạo nhãn cho các ngày trong tháng
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`)

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: days,
          datasets: [
            {
              label: 'Temperature',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-danger'), // Màu đỏ đại diện cho Nhiệt độ
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 2,
              data: Array.from({ length: 31 }, () => random(10, 35)),
              yAxisID: 'y1',
              fill: false,
            },
            {
              label: 'Humidity',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-info'), // Màu xanh dương đại diện cho Độ ẩm
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: Array.from({ length: 31 }, () => random(30, 80)),
              yAxisID: 'y1',
              fill: false,
            },
            {
              label: 'Light',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'), // Màu xanh lá đại diện cho Ánh sáng
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: Array.from({ length: 31 }, () => random(100, 1000)),
              yAxisID: 'y2',
              fill: false,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y1: {
              type: 'linear',
              position: 'left',
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                beginAtZero: true,
                max: 100,
              },
            },
            y2: {
              type: 'linear',
              position: 'right',
              grid: {
                color: 'transparent', // Ẩn lưới cho trục y2
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                beginAtZero: true,
                max: 1000,
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart

