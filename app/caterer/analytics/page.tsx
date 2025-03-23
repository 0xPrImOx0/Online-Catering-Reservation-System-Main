"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, DollarSign, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { chartData, favoriteMenus, mostSellingMenus, trendingPackages } from "../../../lib/caterer/analytics-metadata";

export default function AnalyticsDashboard() {
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format number with k for thousands
  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num.toString();
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Insights to Drive Sales Performance and Business Growth.
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div> */}
      </div>

      {/* Chart and Trending Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Chart Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Chart Orders</h2>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-12 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-xl font-bold">257k</span>
              </div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div>
              <div className="text-xl font-bold">1,245</div>
              <div className="text-sm text-muted-foreground">
                Avg. Sales per day
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[240px] relative">
            <div className="absolute left-0 top-0 text-xs text-muted-foreground">
              120
            </div>
            <div className="absolute left-0 top-1/4 text-xs text-muted-foreground">
              100
            </div>
            <div className="absolute left-0 top-1/2 text-xs text-muted-foreground">
              80
            </div>
            <div className="absolute left-0 top-3/4 text-xs text-muted-foreground">
              60
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 240">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line
                x1="0"
                y1="60"
                x2="400"
                y2="60"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="120"
                x2="400"
                y2="120"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="180"
                x2="400"
                y2="180"
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              {/* Chart line */}
              <path
                d={`M 0 ${240 - chartData[0].value * 2} ${chartData
                  .map(
                    (point, i) =>
                      `L ${i * (400 / (chartData.length - 1))} ${
                        240 - point.value * 2
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Area under the line */}
              <path
                d={`M 0 ${240 - chartData[0].value * 2} ${chartData
                  .map(
                    (point, i) =>
                      `L ${i * (400 / (chartData.length - 1))} ${
                        240 - point.value * 2
                      }`
                  )
                  .join(" ")} 
                  L ${400} 240 L 0 240 Z`}
                fill="url(#gradient)"
              />

              {/* Data points */}
              {chartData.map((point, i) => (
                <circle
                  key={i}
                  cx={i * (400 / (chartData.length - 1))}
                  cy={240 - point.value * 2}
                  r="4"
                  fill="#10b981"
                />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              {chartData.map((point, i) => (
                <div key={i}>{point.month}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Trending Packages</h2>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {trendingPackages.map((pkg, index) => (
              <div key={pkg.id} className="flex items-center gap-4">
                <div className="font-bold text-muted-foreground w-8">
                  #{index + 1}
                </div>
                <div className="h-14 w-14 rounded-md overflow-hidden">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{pkg.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(pkg.price)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pkg.eventType}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{pkg.sales}</div>
                  <div className="flex items-center text-xs text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>Sales ({pkg.percentChange}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Favorites Items */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Most Favorites Items</h2>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favoriteMenus.map((menu) => (
            <div key={menu.id} className="rounded-lg overflow-hidden border">
              <div className="h-40 w-full relative">
                <Image
                  src={menu.image || "/placeholder.svg"}
                  alt={menu.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium mb-2">{menu.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 4
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center text-indigo-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    <span>{formatNumber(menu.likes)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Selling Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Most Selling Items</h2>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mostSellingMenus.map((menu) => (
            <div
              key={menu.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="h-16 w-16 rounded-md overflow-hidden">
                <Image
                  src={menu.image || "/placeholder.svg"}
                  alt={menu.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{menu.name}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">
                    {formatCurrency(menu.price)}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-indigo-50 text-indigo-600 border-indigo-200"
                  >
                    {menu.category}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Serves for {menu.servesFor} {menu.prepTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
