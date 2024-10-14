// Mock data object used for LineChart and BarChart

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [{
    data: [
      50,
      20,
      2,
      86,
      71,
      100,
      125
    ],
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` // optional
  }]
}

export { data }