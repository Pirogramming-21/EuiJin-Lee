from django.shortcuts import render, get_object_or_404, redirect
from .models import Idea, DevTool
from .forms import IdeaForm, DevToolForm
from django.db.models import F
from django.http import JsonResponse
from django.core.paginator import Paginator

def idea_list(request):
    sort_by = request.GET.get('sort_by', 'title')
    if sort_by == 'interest':
        idea_list = Idea.objects.all().order_by('-interest')
    elif sort_by == 'starred':
        idea_list = Idea.objects.filter(starred=True).order_by('-starred', '-interest')
    else:
        idea_list = Idea.objects.all().order_by(sort_by)
    
    paginator = Paginator(idea_list, 4)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'ideas/idea_list.html', {'page_obj': page_obj})

def idea_detail(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    return render(request, 'ideas/idea_detail.html', {'idea': idea})

def idea_new(request):
    if request.method == "POST":
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            idea = form.save()
            return redirect('idea_detail', pk=idea.pk)
    else:
        form = IdeaForm()
    return render(request, 'ideas/idea_edit.html', {'form': form})

def idea_edit(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    if request.method == "POST":
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            idea = form.save()
            return redirect('idea_detail', pk=idea.pk)
    else:
        form = IdeaForm(instance=idea)
    return render(request, 'ideas/idea_edit.html', {'form': form})

def idea_delete(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    idea.delete()
    return redirect('idea_list')

def devtool_list(request):
    devtools = DevTool.objects.all()
    return render(request, 'ideas/devtool_list.html', {'devtools': devtools})

def devtool_detail(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)
    return render(request, 'ideas/devtool_detail.html', {'devtool': devtool})

def devtool_new(request):
    if request.method == "POST":
        form = DevToolForm(request.POST)
        if form.is_valid():
            devtool = form.save()
            return redirect('devtool_detail', pk=devtool.pk)
    else:
        form = DevToolForm()
    return render(request, 'ideas/devtool_edit.html', {'form': form})

def devtool_edit(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)
    if request.method == "POST":
        form = DevToolForm(request.POST, instance=devtool)
        if form.is_valid():
            devtool = form.save()
            return redirect('devtool_detail', pk=devtool.pk)
    else:
        form = DevToolForm(instance=devtool)
    return render(request, 'ideas/devtool_edit.html', {'form': form})

def devtool_delete(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)
    devtool.delete()
    return redirect('devtool_list')

def idea_star(request,pk):
    idea = get_object_or_404(Idea, pk=pk)
    idea.starred = not idea.starred
    idea.save()
    return JsonResponse({'starred': idea.starred})

def idea_interest(request,pk,action):
    idea = get_object_or_404(Idea, pk=pk)
    if action == 'increase':
        idea.interest += 1
    elif action == 'decrease':
        idea.interest -= 1
    idea.save()
    return JsonResponse({'interest': idea.interest})