// import 'chartjs-adapter-date-fns'

export const dataOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: false,
  },

  animation: {
    duration: 500,
  },

  maintainAspectRatio: true,
  responsive: true,
  scales: {
    xAxes: 
      {
        type: "time",
        distribution: "linear"
      }
    
  },
};
