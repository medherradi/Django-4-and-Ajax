from django.shortcuts import render
from .forms import PictureForm
from django.http import JsonResponse
from .utils import is_ajax
# Create your views here.

def add_view(request):
    form = PictureForm(request.POST or None, request.FILES or None)
    data = {}
    if is_ajax(request=request):
        if form.is_valid():
            form.save()
            data['name'] = form.cleaned_data.get('name')
            data['description'] = form.cleaned_data.get('description')
            return JsonResponse(data)
    context = {
        'form':form,
    }
    return render(request, 'base/main.html', context)
