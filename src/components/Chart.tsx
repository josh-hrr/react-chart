import '../App.css'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import revenueData from "../data/revenueData.json";
import sourceData from "../data/sourceData.json";  
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Chart = () => {
  const navigate = useNavigate();
   
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  } 

    const currentUser: string = localStorage.getItem('email') || ''; 
    console.log(currentUser);

    const currentUserRevenueData = revenueData.find(user => user.email === currentUser)?.data || [];
    const currentUserSourceData = sourceData.find(user => user.email === currentUser)?.data || [];

  return (
    <div className="App">
    <h1>Current user: {currentUser}</h1>
    
    <Button className="btn" onClick={handleLogout}>Logout</Button>

      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: currentUserRevenueData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: currentUserRevenueData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "Cost",
                data: currentUserRevenueData.map((data) => data.cost),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: currentUserSourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: currentUserSourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: currentUserSourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: currentUserSourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Sources",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;