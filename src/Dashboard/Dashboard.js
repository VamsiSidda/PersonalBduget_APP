import React, { useEffect, useRef } from 'react';
import BarChart from '../Barchart/Barchart';
import LineChart from '../Linechart/Linechart';
// import PieChart from '../Piechart/Piechart';
import { axiosGet } from './../AxiosService';
import { Chart } from 'chart.js/auto';
// import * as d3 from 'd3';

function Dashboard() {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosGet('http://localhost:5000/api/budgets/user');

                if (response && response.data) {
                    const myBudgetData = response.data;
                    // console.log(myBudgetData);
                    const labels = myBudgetData.map((item) => item.title);
                    const data = myBudgetData.map((item) => item.related_value);
                    const colors = myBudgetData.map((item) => item.color);
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }

                    const chartContext = chartRef.current.getContext('2d');
                    const newChartInstance = new Chart(chartContext, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: data,
                                    backgroundColor: colors
                                },
                            ],
                        },
                    });

                    chartInstanceRef.current = newChartInstance;
                    console.log("before");
                    // drawD3DonutChart(myBudgetData);

                }
            } catch (error) {
                console.error('Fetching error data:', error);
            }
        };

        fetchData();
    }, []);





    return (
        <div>
        <h2>Dashboard</h2>
        <section className="container center" role="main" aria-label="Features">
            <div>
                
                <article className="text-box">
                    <h1>Pie Chart</h1>
                    <p>
                        <canvas id="myChart" style={{"height": "400px","width": "400px"}} ref={chartRef}></canvas>
                    </p>
                </article>
                {/* <article className="text-box">
                    <h1>D3JS Chart</h1>
                        <div id="d3DonutChart"></div>
                </article> */}
            </div>
        </section>
        {/* <PieChart/> */}
        <BarChart/>
        <LineChart/>
        </div>
    );
  }
  


  export default Dashboard;