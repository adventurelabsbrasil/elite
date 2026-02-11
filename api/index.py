from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
def hello_world():
    return {"message": "Hello from Python on Vercel!"}

try:
    from .services.reddit_service import RedditService
    from .services.news_service import NewsService
    from .services.landing_page_service import LandingPageService
    from .services.ads_service import AdsService
    from .models import DailyBrief
except ImportError:
    from api.services.reddit_service import RedditService
    from api.services.news_service import NewsService
    from api.services.landing_page_service import LandingPageService
    from api.services.ads_service import AdsService
    from api.models import DailyBrief
from datetime import date

@app.get("/api/daily-brief", response_model=DailyBrief)
def get_daily_brief():
    reddit = RedditService()
    news = NewsService()
    lp = LandingPageService()
    ads = AdsService()

    return DailyBrief(
        date=str(date.today()),
        reddit_posts=reddit.get_top_posts(),
        news_articles=news.get_top_news(),
        landing_pages=lp.get_top_landing_pages(),
        facebook_ads=ads.get_top_ads()
    )

try:
    from .services.email_service import EmailService
except ImportError:
    from api.services.email_service import EmailService

@app.get("/api/cron/daily-digest")
def trigger_daily_digest():
    # Reuse logic (in a real app, refactor to a controller function)
    reddit = RedditService()
    news = NewsService()
    lp = LandingPageService()
    ads = AdsService()
    
    brief = DailyBrief(
        date=str(date.today()),
        reddit_posts=reddit.get_top_posts(),
        news_articles=news.get_top_news(),
        landing_pages=lp.get_top_landing_pages(),
        facebook_ads=ads.get_top_ads()
    )
    
    # Send to admin (or iterate users from DB)
    # Hardcoded for demo:
    email_service = EmailService()
    email_service.send_daily_brief("admin@elite.com", brief)
    
    return {"status": "success", "message": "Digest sent"}
