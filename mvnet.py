from flask_cors import CORS  # Import CORS
import tensorflow as tf
import numpy as np
from matplotlib import pyplot as plt
import cv2

EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}

def draw_connections(frame, keypoints, edges, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))

    for edge, color in edges.items():
        p1, p2 = edge
        y1, x1, c1 = shaped[p1]
        y2, x2, c2 = shaped[p2]

        if (c1 > confidence_threshold) & (c2 > confidence_threshold):
            cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0,0,255), 2)

def draw_keypoints(frame, keypoints, confidence_threshold):
  y, x, c = frame.shape
  shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
  for kp in shaped:
      ky, kx, kp_conf = kp
      if kp_conf > confidence_threshold:
        cv2.circle(frame, (int(kx), int(ky)), 4, (0,255,0), -1)
interpreter=tf.lite.Interpreter(model_path="/Users/eeshafarrukh/Documents/Final Year Project/FYP/backend/movenet.tflite")
interpreter.allocate_tensors()
cap = cv2.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()
    frame = cv2.flip(frame, 1)
    # reshape image
    img = frame.copy()
    img = tf.image.resize_with_pad(np.expand_dims(img, axis=0), 192,192)
    input_image = tf.cast(img, dtype=tf.float32)
    # setup input and output
    input_details = interpreter.get_input_details()
    output_details =interpreter.get_output_details()
    # make predictions
    interpreter.set_tensor(input_details[0]['index'], np.array(input_image))
    interpreter.invoke()
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])
    print(keypoints_with_scores)
    left_shoulder=keypoints_with_scores[0][0][5]
    right_shoulder=keypoints_with_scores[0][0][6]
    ls=np.array(left_shoulder[:2]*[480,640]).astype(int)
    rs=np.array(right_shoulder[:2]*[480,640]).astype(int)  # pixel relative coordinates
    draw_connections(frame, keypoints_with_scores, EDGES, 0.4)
    draw_keypoints(frame, keypoints_with_scores, 0.4)

    cv2.imshow('MoveNet Lightning', frame)
    while cv2.waitKey(10) & 0xFF==ord('q'):
      break
cap.release()
cv2.destroyAllwindows()
