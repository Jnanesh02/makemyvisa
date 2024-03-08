import React from 'react'
import { Chart } from "react-google-charts";


export const Piechart = (data) => {

  const ticketStatusCount = Object.values(data)[0].reduce((acc,ticket)=>{
    const status = ticket.ticketStatus || 'unknown'; // Handle missing status
    acc[status] = (acc[status] || 0) + 1; // Initialize count if not present
    return acc;
  },{})
    const pieChartData = [
        ['Ticket Status', 'Count'],
        ...Object.entries(ticketStatusCount).map(([status, count]) => [status, count])

      ];
    return (
        <>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={pieChartData}
        />
        </>
      );
}
