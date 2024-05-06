import cv2
from gaze_tracking import GazeTracking
from flask import Flask, Response, request, jsonify
import threading
import beepy
from flask_cors import CORS
import numpy as np
import mediapipe as mp
import time
import pymongo
from pymongo import MongoClient
import json
from utils.gpt_simple import ChatSimple

from armscross import are_arms_crossed, calculate_angle_between_points

app = Flask(__name__)
client= MongoClient("mongodb+srv://eesha:Alaina69!@personaspeakai.su6atxl.mongodb.net/PersonaSpeakAI?retryWrites=true&w=majority&appName=PersonaSpeakAI")

CORS(app)
gaze = GazeTracking()
importantSuggestions=["Avoid crossed arms for a more open posture.", "Maintain Eye Contact (Looking Right)", "Maintain Eye Contact (Looking Left)" ]
suggestions = []
looking_right_start_time = None
looking_left_start_time = None


def play_beep():
    beepy.beep(sound='error')

def add_suggestion(new_suggestion):
    suggestions.append(new_suggestion)
    # Remove the oldest suggestion if there are more than 3 suggestions
    if len(suggestions) > 3:
        suggestions.pop(0)

def analyze_arms_crossing(frame, pose_results):
    landmarks = None
    try:
        landmarks = pose_results.pose_landmarks.landmark
    except:
        pass

    if are_arms_crossed(landmarks):
        feedback_message = "Avoid crossed arms for a more open posture."
        add_suggestion(feedback_message)
        # ADD A CONDITION THAT CHECKS IF ARMS ARE CROSSED FOR MORE THAN A SECOND THAN IT DISPLAYS

       # cv2.putText(frame, feedback_message, (50, 50), cv2.FONT_HERSHEY_DUPLEX, 1,(0, 0, 255) , 2)


    if landmarks:
        left_shoulder_angle = calculate_angle_between_points(landmarks[11], landmarks[13], landmarks[15])
        right_shoulder_angle = calculate_angle_between_points(landmarks[12], landmarks[14], landmarks[16])

        #cv2.putText(frame, f"Left Shoulder Angle: {left_shoulder_angle:.2f} degrees", (50, 100), cv2.FONT_HERSHEY_DUPLEX,0.91, (147, 58, 31), 1)
        #cv2.putText(frame, f"Right Shoulder Angle: {right_shoulder_angle:.2f} degrees", (50, 150), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
        print(f"Left Shoulder Angle: {left_shoulder_angle:.2f} degrees")
        print(f"Right Shoulder Angle: {right_shoulder_angle:.2f} degrees")


    return frame

def generate_frames():
    video_capture = cv2.VideoCapture(0)

    with mp.solutions.pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while True:
            success, frame = video_capture.read()

            frame = cv2.flip(frame, 1)
            if not success:
                break

            gaze.refresh(frame)

            text = ""
            text_color = (147, 58, 31)
            pose_results = pose.process(frame)



            frame_with_gaze = frame.copy()

            # Display pose analysis on the left side
            frame_with_gaze = analyze_arms_crossing(frame_with_gaze, pose_results)
            gaze_text=""
            gaze_text_color = (147, 58, 31)
            # Display gaze analysis on the right side
            if gaze.is_blinking():
                gaze_text = "Blinking"

                gaze_text_color = (147, 58, 31)
            elif gaze.is_center():
                gaze_text = "Looking Center"
                add_suggestion("")
                gaze_text_color = (147, 58, 31)
            if gaze.is_right():
                if looking_right_start_time is None:
                        looking_right_start_time = time.time()
                else:
                    if time.time() - looking_right_start_time > 4:
                            gaze_text = f"Maintain Eye Contact (Looking Left)"
                            threading.Thread(target=play_beep).start()
                            add_suggestion("Maintain Eye Contact (Looking Left)")
                            gaze_text_color = (0, 0, 255)  # Red
            else:
                looking_right_start_time = None

            if gaze.is_left():
                if looking_left_start_time is None:
                    looking_left_start_time = time.time()
                else:
                    if time.time() - looking_left_start_time > 4:
                        gaze_text = f"Maintain Eye Contact (Looking Right)"
                        threading.Thread(target=play_beep).start()
                        add_suggestion("Maintain Eye Contact (Looking Right)")
                        gaze_text_color = (0, 0, 255)  # Red
            else:
                looking_left_start_time = None


            text_x = max(10, frame_with_gaze.shape[1] - 800)

            cv2.putText(frame_with_gaze, gaze_text, (text_x, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, gaze_text_color, 2)

            left_pupil = gaze.pupil_left_coords()
            right_pupil = gaze.pupil_right_coords()
            print("Left Pupil:"+ str(left_pupil))
            print("Right pupil: " + str(right_pupil))
            frame_with_gaze = frame.copy()

            # Display pose analysis on the left side
            frame_with_gaze = analyze_arms_crossing(frame_with_gaze, pose_results)

            # Determine the most recent suggestion
            recent_suggestion = suggestions[-1] if suggestions else ""

            # Calculate the size of the text
            text_size, _ = cv2.getTextSize(recent_suggestion, cv2.FONT_HERSHEY_SIMPLEX, 1.3, 2)


            border_color = (0, 0, 255) if any(suggestion in recent_suggestion for suggestion in importantSuggestions) else (0, 255, 0)
            if recent_suggestion == "":
                border_color = None
            #print("Sug" , suggestions)
            #print("Recent" ,recent_suggestion)

            background_x = 650
            background_y = 100 - text_size[1]
            background_width = text_size[0] + 40
            background_height = text_size[1] + 30

            # Calculate the starting x-coordinate for the text to be centered
            text_x = background_x + (background_width - text_size[0]) // 2
            if border_color is not None:

                background = np.full((background_height, background_width, 3), border_color, dtype=np.uint8)


                alpha = 0.5  # Adjust transparency
                cv2.addWeighted(background, alpha, frame_with_gaze[background_y:background_y+background_height, background_x:background_x+background_width], 1 - alpha, 0, frame_with_gaze[background_y:background_y+background_height, background_x:background_x+background_width])

                # Calculate the y-coordinate for drawing the text
                text_y = background_y + (background_height + text_size[1]) // 2  # Center align vertically

                # Display suggestion text
                cv2.putText(frame_with_gaze, recent_suggestion, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (255, 255, 255), 2)



            ret, buffer = cv2.imencode('.jpg', frame_with_gaze)
            if not ret:
                continue

            # Yield the frame in the response
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')




@app.route('/video')
def video():
    print("Request received")
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/members')
def members():
    return {"members": ['Mem1','Mem2','Mem3']}

@app.route('/submit_interview', methods=['POST'])
def submit_interview():
    data = request.json
    job_title = data.get('job_title')
    job_skills = data.get('job_skills')
    years_experience = data.get('years_experience')
    job_level = data.get('job_level')
    keywords = data.get('keywords')
    industry = data.get('industry')
    db = client['interviewData']
    interviews_collection = db['interviewData']
    interview_data = {
        'job_title': job_title,
        'job_skills': job_skills,
        'years_experience': years_experience,
        'job_level': job_level,
        'keywords': keywords,
        'industry': industry
    }

    interviews_collection.insert_one(interview_data)

    return Response(json.dumps({"message": "Interview data saved successfully."}), status=201, mimetype='application/json')

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    email = data.get('email')
    fullName = data.get('fullName')
    phone = data.get('phone')
    dob = data.get('dateOfBirth')
    gender = data.get('gender')
    password = data.get('password')
    print(data)
    # Here, you can add the logic to insert the user data into MongoDB
    db = client['Users']
    users_collection = db['Users']
    user_data = {
        'fullName': fullName,
        'phone': phone,
        'dob': dob,
        'gender': gender,
        'email': email,
        'password': password
    }
    users_collection.insert_one(user_data)

    return Response(json.dumps({"message": "User added successfully"}), status=201, mimetype='application/json')

@app.route('/generateQuestions', methods=['POST'])
def generate_questions():
    """
    Returns response from gpt api
    """

    data = request.json
    job_title = data.get('job_title')
    job_skill = data.get('job_skills')
    experience = data.get('years_experience')
    job_level = data.get('job_level')
    keywords = data.get('keywords')
    industry_department = data.get('industry')
    print("job_title = ", job_title)
    print("skill =", job_skill)
    print("exp =", experience)
    print("level = ", job_level)
    print("keywords = ", keywords)
    print("industry =", industry_department)

    # Construct query string
    query = (
        f"I am interviewing for: "
        f"Job Title: {job_title}, "
        f"Job Skill: {job_skill}, "
        f"Experience: {experience}, "
        f"Job Level: {job_level}, "
        f"Key Words: {keywords}, "
        f"Industry/Department: {industry_department}."
    )

    print("query =", query)


    gpt_bot = ChatSimple()
    gpt_bot.sysprompt = (
        "You are an Interview bot, that will handle all the queries "
        "related to interviews, interview questions etc.."
        "The user has the following information: {Query} ."
        "Based on this information, you need to generate 10 questions an employee may ask the user."
        "Dont write anything else. Just give the 10 questions."
    )

    response = gpt_bot.send_query(query)

    if not response:
        return Response("Failed to load chat", status=500, mimetype='text/plain')

    print("response = ", response)

    # Split the response into individual questions
    questions = response.split("\n")

    question_data = jsonify(questions)
    print(question_data)

    return question_data

if __name__ == "__main__":
    app.run(debug=True)
