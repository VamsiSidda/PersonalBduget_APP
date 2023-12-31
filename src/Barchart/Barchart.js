import React,{useEffect,useContext,useState} from 'react';
import { Line,Bar } from "react-chartjs-2";
import axios from 'axios';


export default function BarChart() {
        const [labels, setLabels] = useState([]);
        const [data, setData] = useState([]);
        // const [backgroundColor, setBackgroundColor] = useState([]);
        const[expense, setExpense] = useState([]);
        const[expenseTitle, setExpenseTitle] = useState([]);
    
    useEffect(() => {
        // const token=localStorage.getItem("auth-token");
       // axios.get('http://localhost:5000/api/budgets/user')
       axios.get('http://167.99.62.218:5000/api/budgets/user')


        .then(res => {
            var l=[];
            var d =[];
            // var b=[];
            for (var i = 0; i < res.data.length; i++) {
                l.push(res.data[i].title);

                d.push(res.data[i].related_value);
                
            //    b.push(res.data[i].color);
                
            }
            setLabels(l);
            setData(d);
            // setBackgroundColor(b);
            
            })

        //axios.get('http://localhost:5000/api/expenses/user')
        axios.get('http://167.99.62.218:5000/api/expenses/user')

        .then(res => {
            // var f = [];
            var e=[];
            for (var i = 0; i < res.data.length; i++) {
                // f.push(res.data[i].title);
                e.push(res.data[i].related_value);
                   
                    
                }
                // setExpenseTitle(f);
                setExpense(e);
                // console.log(dataSource);
                })
            
            
          },[])
    return (
        <div className="App">
        <Bar data={{ 
            datasets: [
                {
                    label : "Total Budget Made",
                    data: data,
                    backgroundColor: ['#008000']
                        // '#ffcd56',
                        // '#ff6384',
                        // '#36a2eb',
                        // '#fd6b19',
                        // '#B3B6B7',
                        // '#A533FF',
                        // '#311846',
                        // '#6D6673'
                    
                },
                {
                    label: "Total Expenses Made",
                    data: expense,
                    backgroundColor: [
                        '#B22222'
                        // '#ff6384',
                        // '#36a2eb',
                        // '#000000',
                        // '#B3B6B7',
                        // '#A533FF',
                        // '#311846',
                        // '#6D6673'
                    ]
                }



            ],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
        }} />
      </div>
    )
}