
import logging as log
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwner(BasePermission):
    message = 'You must be the owner of this object.'

    # def has_permission(self, request, view):
    #     print("Is Owner permission check")
    #     return True

    def has_object_permission(self, request, view, obj):
        print("Checking object permissions")
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        log.warn(obj)
        log.warn("obj.owner: {} and request.user: {}".format(obj.user, request.user))
        return obj.user == request.user


# class IsOwnerOrReadOnly(BasePermission):
    # message = 'You must be the owner of this object.'
    # my_safe_method = ['GET', 'PUT']
    # def has_permission(self, request, view):
    #     if request.method in self.my_safe_method:
    #         return True
    #     return False

#     def has_object_permission(self, request, view, obj):
#         #member = Membership.objects.get(user=request.user)
#         #member.is_active
#         # if request.method in SAFE_METHODS:
#             # return True
#         return obj.user == request.user
