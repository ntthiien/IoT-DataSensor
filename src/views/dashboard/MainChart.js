// import React, { useEffect, useRef } from 'react'

// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle } from '@coreui/utils'

// const MainChart = () => {
//   const chartRef = useRef(null)

//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           chartRef.current.options.scales.x.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.options.scales.y.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.update()
//         })
//       }
//     })
//   }, [chartRef])

//   const random = () => Math.round(Math.random() * 100)

//   return (
//     <>
//       <CChartLine
//         ref={chartRef}
//         style={{ height: '300px', marginTop: '40px' }}
//         data={{
//           labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//           datasets: [
//             {
//               label: 'My First dataset',
//               backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
//               borderColor: getStyle('--cui-info'),
//               pointHoverBackgroundColor: getStyle('--cui-info'),
//               borderWidth: 2,
//               data: [
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//               ],
//               fill: true,
//             },
//             {
//               label: 'My Second dataset',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-success'),
//               pointHoverBackgroundColor: getStyle('--cui-success'),
//               borderWidth: 2,
//               data: [
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//                 random(50, 200),
//               ],
//             },
//             {
//               label: 'My Third dataset',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-danger'),
//               pointHoverBackgroundColor: getStyle('--cui-danger'),
//               borderWidth: 1,
//               borderDash: [8, 5],
//               data: [65, 65, 65, 65, 65, 65, 65],
//             },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//           scales: {
//             x: {
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//                 drawOnChartArea: false,
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//             y: {
//               beginAtZero: true,
//               border: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               max: 250,
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//                 maxTicksLimit: 5,
//                 stepSize: Math.ceil(250 / 5),
//               },
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4,
//             },
//             point: {
//               radius: 0,
//               hitRadius: 10,
//               hoverRadius: 4,
//               hoverBorderWidth: 3,
//             },
//           },
//         }}
//       />
//     </>
//   )
// }

// export default MainChart


// import React, { useEffect, useRef } from 'react'

// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle } from '@coreui/utils'

// const MainChart = () => {
//   const chartRef = useRef(null)

//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           chartRef.current.options.scales.x.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.options.scales.y.grid.borderColor = getStyle(
//             '--cui-border-color-translucent',
//           )
//           chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
//           chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
//           chartRef.current.update()
//         })
//       }
//     })
//   }, [chartRef])

//   const random = (min, max) => Math.round(Math.random() * (max - min) + min)

//   return (
//     <>
//       <CChartLine
//         ref={chartRef}
//         style={{ height: '300px', marginTop: '40px' }}
//         data={{
//           labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//           datasets: [
//             {
//               label: 'Temperature',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-danger'), // Màu đỏ đại diện cho Nhiệt độ
//               pointHoverBackgroundColor: getStyle('--cui-danger'),
//               borderWidth: 2,
//               data: [
//                 random(10, 35),
//                 random(10, 35),
//                 random(10, 35),
//                 random(10, 35),
//                 random(10, 35),
//                 random(10, 35),
//                 random(10, 35),
//               ],
//               fill: false,
//             },
//             {
//               label: 'Humidity',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-info'), // Màu xanh dương đại diện cho Độ ẩm
//               pointHoverBackgroundColor: getStyle('--cui-info'),
//               borderWidth: 2,
//               data: [
//                 random(30, 80),
//                 random(30, 80),
//                 random(30, 80),
//                 random(30, 80),
//                 random(30, 80),
//                 random(30, 80),
//                 random(30, 80),
//               ],
//               fill: false,
//             },
//             {
//               label: 'Light',
//               backgroundColor: 'transparent',
//               borderColor: getStyle('--cui-success'), // Màu xanh lá đại diện cho Ánh sáng
//               pointHoverBackgroundColor: getStyle('--cui-success'),
//               borderWidth: 2,
//               data: [
//                 random(100, 1000),
//                 random(100, 1000),
//                 random(100, 1000),
//                 random(100, 1000),
//                 random(100, 1000),
//                 random(100, 1000),
//                 random(100, 1000),
//               ],
//               fill: false,
//             },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: true,
//             },
//           },
//           scales: {
//             x: {
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//                 drawOnChartArea: false,
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//             y: {
//               beginAtZero: true,
//               grid: {
//                 color: getStyle('--cui-border-color-translucent'),
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4,
//             },
//             point: {
//               radius: 0,
//               hitRadius: 10,
//               hoverRadius: 4,
//               hoverBorderWidth: 3,
//             },
//           },
//         }}
//       />
//     </>
//   )
// }

// export default MainChart


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
