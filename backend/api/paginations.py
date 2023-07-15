import math

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PagePagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 500
    last_page_strings = ('last',)

    def get_all_count_page(self, count_rows):
        result = math.ceil(count_rows / self.get_page_size(self.request))
        if result == 0:
            result = 1
        return result

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'pages': {
                'current': self.page.number,
                # Когда-то искал если ли "из коробки" в drf подсчет страниц
                # не нашел и сделал сам - возможно плохо искал
                'all': self.get_all_count_page(self.page.paginator.count)
            },
            'results': data
        })
