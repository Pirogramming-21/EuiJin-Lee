from django.shortcuts import render, get_object_or_404, redirect
from .models import Review
from .forms import ReviewForm

def review_list(request):
    reviews = Review.objects.all()
    return render(request, 'reviews/review_list.html', {'reviews': reviews})

def review_detail(request, id):
    review = get_object_or_404(Review, id=id)
    return render(request, 'reviews/review_detail.html', {'review': review})

def review_create(request):
    if request.method == "POST":
        form = ReviewForm(request.POST, request.FILES)
        if form.is_valid():
            review = form.save()
            return redirect('review_detail', id=review.id)
    else:
        form = ReviewForm()
    return render(request, 'reviews/review_form.html', {'form': form})

def review_edit(request, id):
    review = get_object_or_404(Review, id=id)
    if request.method == "POST":
        form = ReviewForm(request.POST, request.FILES, instance=review)
        if form.is_valid():
            form.save()
            return redirect('review_detail', id=review.id)
    else:
        form = ReviewForm(instance=review)
    return render(request, 'reviews/review_form.html', {'form': form})


def review_delete(request, id):
    review = get_object_or_404(Review, id=id)
    if request.method == 'POST':
        review.delete()
        return redirect('review_list')
    return render(request, 'reviews/review_confirm_delete.html', {'review': review})

