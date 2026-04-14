import { getTaskCountGroupByDate, getArticleCountGroupByDate } from "@/app/lib/data";
import GrowthDashboard from "@/app/components/GrowthDashboard";

export default async function Page() {
  const taskCountGroupByDate = await getTaskCountGroupByDate();
  const articleCountGroupByDate = await getArticleCountGroupByDate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">成长记录</h1>
        <p className="text-gray-600 dark:text-gray-400">
          查看你的任务完成情况和文章发布统计
        </p>
      </div>
      <GrowthDashboard 
        taskCountData={taskCountGroupByDate} 
        articleCountData={articleCountGroupByDate} 
      />
    </div>
  );
}
