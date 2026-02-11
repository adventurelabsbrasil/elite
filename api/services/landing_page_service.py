from googlesearch import search
from typing import List
try:
    from ..models import Insight
except ImportError:
    try:
        from api.models import Insight
    except ImportError:
        from models import Insight

class LandingPageService:
    def get_top_landing_pages(self, query: str = "marketing imobiliário landing page", limit: int = 5) -> List[Insight]:
        try:
            # Note: googlesearch-python is a simple scraper and might be rate limited.
            # In production, use Custom Search JSON API.
            results = search(query, num_results=limit, advanced=True)
            
            insights = []
            for result in results:
                # Result is an object with title, url, description in recent versions of googlesearch-python
                # Or just a string URL in older versions. 
                # advanced=True returns objects
                insights.append(Insight(
                    title=result.title if hasattr(result, 'title') else "Search Result",
                    url=result.url if hasattr(result, 'url') else result,
                    source="Google Search",
                    summary=result.description if hasattr(result, 'description') else "No description available."
                ))
            return insights

        except Exception as e:
            print(f"Error fetching landing pages: {e}")
            return [
                Insight(
                    title="Mock Landing Page: High Converting Real Estate Funnels",
                    url="https://example.com/funnel",
                    source="Google",
                    summary="Mock data due to search error or rate limiting.",
                )
            ]
