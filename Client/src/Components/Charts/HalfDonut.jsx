import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";

function HomeDoughnutChart() {
  const [amountData, setAmountData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('http://localhost:8081/transactions/categoryPercentages');
        const newData = [];
        for (let key in result.data) {
          if (newData.length < 4 && (key.includes("Food") || key.includes("Fashion") || key.includes("Travel") || key.includes("Fuel"))) {
            newData.push([key, result.data[key]]);
          }
        }
        setAmountData(newData);
        setOptions({
          title: {
            text: ['Total:<br>$' + result.data.TotalAmountSpent],
            align: 'center',
            verticalAlign: 'middle',
            y: 80,
            style: {
              color: '#FFFFFF'
            }
          },
          credits: {
            enabled: false
          },
          tooltip: {
            animation: false,
            backgroundColor: '#010003',
            borderRadius: 5,
            style: {
              color: '#fff',
            }
          },
          chart: {
            type: 'pie',
            backgroundColor: '#1B2520',
          },
          series: [{
            name: 'Percentage Spent',
            innerSize: '50%',
            colors: ['#094C62', '#297E77', '#41CE8C', '#008405','#3DDC43'],
            data: newData,
            dataLabels: {
              enabled: true,
              align: 'center',
              distance: -40,
              color: '#1B2520',
              formatter: function () {
                return Highcharts.numberFormat(this.percentage, 1) + '%';
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
          }]
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="DoughnutChart">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default HomeDoughnutChart;
