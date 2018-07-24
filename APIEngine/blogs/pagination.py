from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination,
    )

class BlogPageNumberPagination(PageNumberPagination):
    page_size = 5

# class PostLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10
#     max_limit = 10