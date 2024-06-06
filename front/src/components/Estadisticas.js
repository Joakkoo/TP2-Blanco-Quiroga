import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { temperatura } from '../services/authServices';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export default function Estadisticas() {

const [getData, setData] = useState([])

useEffect( ()=>{
(async()=>{
    const response = await temperatura()
    console.log(response)
setData(response)
})()
}, [])
const data = {
  labels: getData.map(value => value.timestamp),
  datasets: [
    {
      label: 'Dataset 1',
      data:getData.map(value => value.temperatura),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ]
};
  return <Line options={options} data={data} />;
}