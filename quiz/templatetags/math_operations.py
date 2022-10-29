from django import template

register = template.Library()

@register.filter
def mult(value, arg):
    return value * arg

@register.filter
def lst(list1, i):
    return list1[i]

@register.filter(name="range")
def filter_range(start, end, step = 1):
    return range(start, end, step)

@register.filter(name="negrange")
def neg_range(start, end, step = -1):
    return range(start, end, step)

@register.filter(name="int")
def to_int(number):
    return int(number)

@register.filter(name="comparevar")
def comparevar(a, b):
    return a == b