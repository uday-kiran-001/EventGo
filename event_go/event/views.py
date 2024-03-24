from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Event, Like
from django.shortcuts import get_object_or_404

def get_list_of_events(event_objects):
    events = []
    for event in event_objects:
        events.append({
            'id': event.id,
            'event_title': event.event_title,
            'description': event.description,
            'start_date': event.start_date,
            'end_date': event.end_date,
            'start_time': event.start_time,
            'end_time' : event.end_time,
            'location': event.location,
            'image': event.image.url,
            'creator': event.creator.email
        })
    return events

@api_view(['GET'])
def home(req):
    try:
        # Use select_related to fetch the related User objects in the same query
        event_objects = Event.objects.select_related('creator').all()
        events = get_list_of_events(event_objects= event_objects)

        return Response({ 'eventList': events, 'message': 'Hello, world!', 'status': 'success'})
    except Exception as e:
        return Response({'error': e, 'status': 'failure'})

@api_view(['POST'])
def login(req):
    try:
        email = req.data["email"]
        password = req.data['password']
        # Verify the credentials and send User Id, Likes List, Created Events List
        try:
            user = User.objects.get(email=email)
        except Exception as e:
            print(e)
            user = None

        
        if user and user.check_password(password=password) :
            
            likeList = []
            createList = []
            
            try:
                createEventObjects = Event.objects.filter(creator = user.id)
                likeEventObjects = Like.objects.get(user = user.id).liked_events.all()

                createList = get_list_of_events(createEventObjects)
                likeList = get_list_of_events(likeEventObjects)

            except Exception as e:
                print(e)

            
            print(f"User ID: {user}\nCreateList: {createList}\nLikeList: {likeList}")
            res = {}
            if likeList:
                res['likeList'] = likeList
            if createList:
                res['createList'] = createList


            if res:
                return Response({ **res ,'message': 'Login successfully', 'status': 'success'})
            else:
                return Response({'message': 'Login successfully', 'status': 'success'})
        else:
            return Response({'message': 'Invalid Credentials', 'status': 'failure'})
    except Exception as e:
        return Response({'error': e, 'message': 'Error Logging in', 'status': 'failure'})
    

@api_view(['POST'])
def signup(req):
    try:
        # Add the credentials in database and send User Id
        email = req.data["email"]
        password = req.data['password']
        newUser = User(email = email)
        newUser.set_password(password= password)
        newUser.save()

        return Response({ 'message': 'Signed up successfully', 'status': 'success'})
    except Exception as e:
        return Response({'error': e, 'message': 'Error Signing in', 'status': 'failure'})

@api_view(['POST'])
def addEvent(req):
    try:

        event_title = req.data.get("event_title", "Not Given")
        description = req.data.get("description", "")
        start_date = req.data.get("start_date")
        end_date = req.data.get("end_date")
        start_time = req.data.get("start_time")
        end_time = req.data.get("end_time")
        location = req.data.get("location")
        email = req.data.get("creator")
        creator = User.objects.get(email = email)
        

        new_event = Event(event_title = event_title, 
                          description = description,
                          start_date = start_date,
                          end_date = end_date,
                          start_time = start_time,
                          end_time = end_time,
                          location = location,
                          image= req.FILES['image'],
                          creator = creator)

        new_event.save()
        image_url = req.build_absolute_uri(new_event.image.url)
        return Response({'image_url': image_url, 'message': 'Event added successfully', 'status': 'success'})
    except Exception as e:
        print(e)
        return Response({'message': 'Event is not added', 'status': 'failure'})
    

@api_view(['POST'])
def likes(req):
    action = req.data.get("action")

    if action == 'LIKE_OR_UNLIKE':
        try:
            email = req.data.get("email")
            event_id = req.data.get("event_id")
            liked = req.data.get("liked")

            # Get the User and Event instances
            user = get_object_or_404(User, email=email)
            event = get_object_or_404(Event, id=event_id)

            # Check if the user has a Like instance
            user_like, created = Like.objects.get_or_create(user=user)

            if liked:
                # Add the event to the user's liked events
                user_like.liked_events.add(event)
            else:
                # Remove the event from the user's liked events
                user_like.liked_events.remove(event)

            user_like.save()

            return Response({ 'message': f'Event {"Liked" if liked else "Unliked"} successfully', 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({ 'message': 'Unable to like the event', 'status': 'failure'})

    elif action == 'GET_LIKE_LIST':
        try:
            
            email = req.data.get("email")
            user = get_object_or_404(User, email=email)

            # Get the user's Like instance
            user_like = get_object_or_404(Like, user=user)

            # Get the list of liked events
            likedEventObjects = user_like.liked_events.all()
            likeList = get_list_of_events(likedEventObjects)
            return Response({ 'likeList': likeList, 'message': 'Liked events fetched successfully', 'status': 'success'})
        except Exception as e:
            print(e)
            return Response({'message': 'Unable to fetch liked events', 'status': 'failure'})
