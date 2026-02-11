import sys
import os

# Add root to path
sys.path.append(os.getcwd())

from api.index import get_daily_brief

print("Fetching daily brief...")
brief = get_daily_brief()
print(f"Date: {brief.date}")
print(f"Reddit posts: {len(brief.reddit_posts)}")
print(f"News: {len(brief.news_articles)}")
print(f"Landing Pages: {len(brief.landing_pages)}")
print(f"Ads: {len(brief.facebook_ads)}")
print("\nSample Data:")
if brief.reddit_posts:
    print(f"Reddit: {brief.reddit_posts[0].title}")
if brief.news_articles:
    print(f"News: {brief.news_articles[0].title}")
