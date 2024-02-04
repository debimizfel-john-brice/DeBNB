import "./VacationsReport.css";
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { RootState } from "../../Globalstate/Store";
import { useSelector } from "react-redux";
import notifyService from "../../Services/NotifyService";
import VacationsService from "../../Services/VacationsService";
import VacationWithLikes from "../../Models/VacationWithLikesModel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios";
import Header from "../../Layout/Header/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VacationsReport(): JSX.Element {

  async function download() {
    try {
      const response = await axios.get("http://localhost:4000/report.csv");
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: any) {
      notifyService.error(error.message);
    }

  }

  const vacations = useSelector<RootState, VacationWithLikes[]>(state => state.vacations.vacations);
  useEffect(() => {
    if (!vacations.length) {
      VacationsService.getVacations()
        .catch(e => notifyService.error(e.message));
    }
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vacations Report',
      },
    },
  };

  const labels = vacations.map((vacation) => vacation.destination);

  const data = {
    labels,
    datasets: [
      {
        label: 'Likes',
        data: vacations.map(v => v.likes),
        backgroundColor: '#ffacaf',
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="VacationsReport">
        <Bar options={options} data={data} />
        <div className="download_button">
          <a role="button" className="secondary" href="/vacations">Back</a >
          <a role="button" href="#" onClick={download} >Download CSV</a >
        </div>
      </div>
    </>
  );
}

export default VacationsReport;
