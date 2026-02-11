import praw
import os
from typing import List
try:
    from ..models import Insight
except ImportError:
    try:
        from api.models import Insight
    except ImportError:
        from models import Insight

class RedditService:
    def __init__(self):
        self.client_id = os.getenv("REDDIT_CLIENT_ID")
        self.client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        self.user_agent = "RealEstateAgent/1.0"
        
        if self.client_id and self.client_secret:
            self.reddit = praw.Reddit(
                client_id=self.client_id,
                client_secret=self.client_secret,
                user_agent=self.user_agent
            )
        else:
            self.reddit = None

    def get_top_posts(self, query: str = "marketing para incorporadoras", limit: int = 5) -> List[Insight]:
        if not self.reddit:
            return [
                Insight(
                    title="Mock Reddit Post: Marketing Trends 2024",
                    url="https://reddit.com/r/marketing",
                    source="Reddit",
                    summary="This is a mock post because REDDIT_CLIENT_ID is not set.",
                    score=100
                )
            ]

        try:
            # Searching in all subreddits or specific ones. 
            # 'marketing', 'realestate', 'business' are good candidates.
            # Using global search for now.
            insights = []
            if query:
                results = self.reddit.subreddit("all").search(query, sort="relevance", limit=limit)
            else:
                results = self.reddit.subreddit("marketing").top(time_filter="week", limit=limit)

            for post in results:
                insights.append(Insight(
                    title=post.title,
                    url=post.url,
                    source="Reddit",
                    summary=post.selftext[:200] + "..." if post.selftext else "",
                    score=post.score,
                    date_published=str(post.created_utc)
                ))
            return insights

        except Exception as e:
            print(f"Error fetching Reddit posts: {e}")
            return []
