import cv2
import threading
from gaze_tracking import GazeTracking
import beepy
import time

gaze = GazeTracking()
webcam = cv2.VideoCapture(0)
frequency = 1000
duration = 500
looking_right_start_time = None
looking_left_start_time = None

def play_beep():
    beepy.beep(sound='error')

while True:
    _, frame = webcam.read()
    frame = cv2.flip(frame, 1)
    gaze.refresh(frame)

    frame = gaze.annotated_frame()
    text = ""
    text_color = (147, 58, 31)

    if gaze.is_blinking():
        text = "Blinking"
    elif gaze.is_center():
        text = "Looking center"

    if gaze.is_right():
        if looking_right_start_time is None:
            looking_right_start_time = time.time()
        else:
            if time.time() - looking_right_start_time > 4:
                text = f"Maintain Eye Contact (Looking Right since {int(time.time() - looking_right_start_time)} sec)"
                threading.Thread(target=play_beep).start()
                text_color = (0, 0, 255)  # Red
    else:
        looking_right_start_time = None

    if gaze.is_left():
        if looking_left_start_time is None:
            looking_left_start_time = time.time()
        else:
            if time.time() - looking_left_start_time > 4:
                text = f"Maintain Eye Contact (Looking Left since {int(time.time() - looking_left_start_time)} sec)"
                threading.Thread(target=play_beep).start()
                text_color = (0, 0, 255)  # Red
    else:
        looking_left_start_time = None

    cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, text_color, 2)

    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()
    cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

    cv2.imshow("Demo", frame)

    if cv2.waitKey(1) == 27:
        break

webcam.release()
cv2.destroyAllWindows()
