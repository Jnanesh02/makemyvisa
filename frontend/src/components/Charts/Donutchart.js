import React from 'react'
import { Chart } from "react-google-charts";
 
export const Donutchart = (data) => {
    const hostelTicketStatus = Object.values(data)[0].reduce((acc,ticket)=>{
        const status = ticket.ticketStatus || "undefined";
         acc[status] = (acc[status] || 0) + 1;
        return acc;
    },{});
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff'];
    const donutChartData = [
        ["Ticket Status", "Count"],
        ...Object.entries(hostelTicketStatus).map(([status,count])=>[status,count])
    ]
    const options = {
        pieHole: 0.4,
        is3D: false,
        colors
      };
      
  return (
   <Chart
   chartType="PieChart"
   width="100%"
   height="400px"
   data={donutChartData}
   options={options}/>
  )
}
