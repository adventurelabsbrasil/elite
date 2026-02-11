import requests
import os
from typing import List
try:
    from ..models import Insight
except ImportError:
    try:
        from api.models import Insight
    except ImportError:
        from models import Insight

class NewsService:
    def __init__(self):
        self.api_key = os.getenv("NEWS_API_KEY")
        self.base_url = "https://newsapi.org/v2/everything"

    def get_top_news(self, query: str = "negócios imobiliários", limit: int = 5) -> List[Insight]:
        if not self.api_key:
            return [
                Insight(
                    title="Mock News: Real Estate Market Booms in 2024",
                    url="https://example.com/news",
                    source="NewsAPI",
                    summary="This is a mock news article because NEWS_API_KEY is not set.",
                    date_published="2024-02-04"
                )
            ]

        try:
            params = {
                "q": query,
                "sortBy": "relevance",
                "apiKey": self.api_key,
                "pageSize": limit,
                "language": "pt" # Portuguese news
            }
            response = requests.get(self.base_url, params=params)
            data = response.json()
            
            insights = []
            if data.get("status") == "ok":
                for article in data.get("articles", []):
                    insights.append(Insight(
                        title=article.get("title"),
                        url=article.get("url"),
                        source="News",
                        summary=article.get("description"),
                        date_published=article.get("publishedAt")
                    ))
            return insights

        except Exception as e:
            print(f"Error fetching news: {e}")
            return []
