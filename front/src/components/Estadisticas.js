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
import { DatePicker, Row, Col, Space } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
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
      text: 'Temperature Chart',
    },
  },
};

export default function Estadisticas() {
  const [getData, setData] = useState([]);
  const [startDate, setStartDate] = useState(moment().startOf('day').subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment().startOf('day'));
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await temperatura();
      console.log('Fetched data:', response);
      setData(response);
    };

    fetchData();
  }, []);

  const filterDataByDateRange = (data, start, end) => {
    return data.filter(value => {
      const date1 = new Date(start)
      const date2 = new Date(end)
      const date3 = new Date(value.timestamp)
      console.log("Date1",date1)
      console.log("Date2",date2)
      console.log("Date3",date3)
      if (date3 >= date1 && date3<=date2) {
        return true
      }
      return false

      // const date = moment(value.timestamp).startOf('day');
      // if (start && end) {
      //   console.log("a")
      //   return date.isBetween(start, end, null, '[]');
      // } else if (start) {
      //   console.log("b")
      //   return date.isSameOrAfter(start);
      // } else if (end) {
      //   console.log("c")
      //   return date.isSameOrBefore(end);
      // } else {
      //   console.log("d")
      //   return true;
      // }
    });
  };
  
  useEffect(() => {
    const filtered = filterDataByDateRange(getData, startDate, endDate);
    setFilteredData(filtered);
    console.log('Filtered data:', filtered);
  }, [getData, startDate, endDate]);

  const data = {
    labels: filteredData.map(value => moment(value.timestamp).format('YYYY-MM-DD')),
    datasets: [
      {
        label: 'Temperatura',
        data: filteredData.map(value => value.temperatura),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="container">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="center" gutter={16}>
          <Col>
            <label>Inicio: </label>
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date ? date.startOf('day') : null)}
              format="YYYY-MM-DD"
            />
          </Col>
          <Col>
            <label>Final: </label>
            <DatePicker
              value={endDate}
              onChange={(date) => setEndDate(date ? date.startOf('day') : null)}
              format="YYYY-MM-DD"
            />
          </Col>
        </Row>
        <Line options={options} data={data} />
      </Space>
    </div>
  );
}
