from typing import List
try:
    from ..models import Insight
except ImportError:
    try:
        from api.models import Insight
    except ImportError:
        from models import Insight

class AdsService:
    def get_top_ads(self, limit: int = 5) -> List[Insight]:
        # Facebook Ads Library API is restricted. 
        # Truly scraping it requires Selenium/Puppeteer which is unstable on Serverless.
        # Returning high-quality mock data for the dashboard demo.
        return [
            Insight(
                title="Ad: Lançamento de Alto Padrão - Jardins",
                url="https://facebook.com/ads/library/123",
                source="Facebook Ads",
                summary="Imagem de fachada moderna com CTA 'Saiba Mais'. Copy focado em exclusividade.",
                date_published="2024-02-01"
            ),
            Insight(
                title="Ad: Consultoria para Incorporadoras",
                url="https://facebook.com/ads/library/456",
                source="Facebook Ads",
                summary="Vídeo curto de especialista explicando ROI. CTA 'Agendar Reunião'.",
                date_published="2024-02-02"
            ),
            Insight(
                title="Ad: Gestão de Vendas Imobiliárias",
                url="https://facebook.com/ads/library/789",
                source="Facebook Ads",
                summary="Carrossel com depoimentos de clientes.",
                date_published="2024-02-03"
            )
        ]
