from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Insight(BaseModel):
    title: str
    url: str
    source: str  # "Reddit", "News", "Facebook", "Google"
    summary: Optional[str] = None
    date_published: Optional[str] = None
    score: Optional[int] = 0

class DailyBrief(BaseModel):
    date: str
    reddit_posts: List[Insight]
    news_articles: List[Insight]
    landing_pages: List[Insight]
    facebook_ads: List[Insight]
