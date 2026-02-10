"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideTrendingUp, LucideNewspaper, LucideSearch, LucideMegaphone, LucideLoader2 } from "lucide-react";

interface Insight {
    title: string;
    url: string;
    source: string;
    summary: string;
    date_published?: string;
    score?: number;
}

interface DailyBrief {
    date: string;
    reddit_posts: Insight[];
    news_articles: Insight[];
    landing_pages: Insight[];
    facebook_ads: Insight[];
}

export default function Dashboard() {
    const [data, setData] = useState<DailyBrief | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/daily-brief")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <LucideLoader2 className="h-12 w-12 animate-spin text-blue-600" />
                    <p className="text-gray-500">Generating Daily Insight Brief...</p>
                </div>
            </div>
        );
    }

    if (!data) return <div>Failed to load data.</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Elite Real Estate Agent</h1>
                    <p className="text-gray-500">Daily Marketing Intelligence • {data.date}</p>
                </div>
                <Button onClick={() => window.location.reload()}>Refresh Data</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                {/* Reddit Section */}
                <SectionCard
                    title="Community Trends (Reddit)"
                    icon={<LucideTrendingUp className="h-5 w-5 text-orange-500" />}
                    items={data.reddit_posts}
                    bg="bg-orange-50"
                    border="border-orange-100"
                />

                {/* News Section */}
                <SectionCard
                    title="Market News"
                    icon={<LucideNewspaper className="h-5 w-5 text-blue-500" />}
                    items={data.news_articles}
                    bg="bg-blue-50"
                    border="border-blue-100"
                />

                {/* Landing Pages Section */}
                <SectionCard
                    title="Top Landing Pages"
                    icon={<LucideSearch className="h-5 w-5 text-green-500" />}
                    items={data.landing_pages}
                    bg="bg-green-50"
                    border="border-green-100"
                />

                {/* Ads Section */}
                <SectionCard
                    title="Facebook Ads Gallery"
                    icon={<LucideMegaphone className="h-5 w-5 text-purple-500" />}
                    items={data.facebook_ads}
                    bg="bg-purple-50"
                    border="border-purple-100"
                />

            </div>
        </div>
    );
}

function SectionCard({ title, icon, items, bg, border }: { title: string, icon: any, items: Insight[], bg: string, border: string }) {
    return (
        <Card className={`shadow-sm ${border}`}>
            <CardHeader className={`${bg} border-b ${border}`}>
                <div className="flex items-center gap-2">
                    {icon}
                    <CardTitle className="text-lg">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-500">No data available.</p>
                ) : (
                    items.map((item, idx) => (
                        <div key={idx} className="pb-4 border-b last:border-0 last:pb-0">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm hover:underline hover:text-blue-600 block mb-1">
                                {item.title}
                            </a>
                            <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
                            {item.score !== undefined && item.score > 0 && (
                                <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                    Score: {item.score}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}
