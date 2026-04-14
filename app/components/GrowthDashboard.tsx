import TaskCountChart from "./TaskCountChart";
import ArticleCountChart from "./ArticleCountChart";
import { TaskCountData } from "@/app/lib/data";

type GrowthDashboardProps = {
  taskCountData: TaskCountData[];
  articleCountData: TaskCountData[];
};

export default function GrowthDashboard({ taskCountData, articleCountData }: GrowthDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="card-elegant">
        <h2 className="text-xl font-bold mb-4">任务完成统计</h2>
        <TaskCountChart data={taskCountData} />
      </div>
      <div className="card-elegant">
        <h2 className="text-xl font-bold mb-4">文章发布统计</h2>
        <ArticleCountChart data={articleCountData} />
      </div>
    </div>
  );
}
