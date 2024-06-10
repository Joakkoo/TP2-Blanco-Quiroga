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
import { DatePicker, Row, Col, Space, Button } from 'antd';
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
        borderColor: '#F28705',
        backgroundColor: '#F28705',
      },
    ],
  };

  return (
    <div style={containerStyle}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle" gutter={16}>
          <Col>
            <Row justify="center" align="middle" gutter={16}>
              <Col>
                <img src="http://metservice.intnet.mu/images/mms-logo.png" alt="Logo" style={logoStyle} />
              </Col>
              <Col>
                <label style={labelStyle}>Inicio: </label>
                <DatePicker
                  value={startDate}
                  onChange={(date) => setStartDate(date ? date.startOf('day') : null)}
                  format="YYYY-MM-DD"
                  style={datePickerStyle}
                />
              </Col>
              <Col>
                <label style={labelStyle}>Final: </label>
                <DatePicker
                  value={endDate}
                  onChange={(date) => setEndDate(date ? date.startOf('day') : null)}
                  format="YYYY-MM-DD"
                  style={datePickerStyle}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button type="primary" href='./Logout'>
              Logout
            </Button>
          </Col>
        </Row>
        <div style={chartContainerStyle}>
          <Line options={options} data={data} />
        </div>
      </Space>
    </div>
);
};

const containerStyle = {
padding: 20,
background: '#05F2F2',
borderRadius: 10,
boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
maxWidth: 800,
margin: '0 auto',
marginTop: 40,
};

const labelStyle = {
display: 'block',
marginBottom: 8,
fontWeight: 'bold',
};

const datePickerStyle = {
width: '100%',
};

const chartContainerStyle = {
padding: 20,
background: '#fff',
borderRadius: 10,
boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
marginTop: 20,
};

const logoStyle = {
  width: 70,
  height: 90,
  marginRight: 20,
};
