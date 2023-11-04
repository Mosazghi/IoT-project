import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";

const configureCharts = () => {
    ChartJS.register(
        LinearScale,
        PointElement,
        Tooltip,
        Legend,
        TimeScale,
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        CategoryScale,
        LinearScale,
        BarElement,
        ChartDataLabels,
        Title,
        Tooltip,
        Legend
    );
};

export default configureCharts;
