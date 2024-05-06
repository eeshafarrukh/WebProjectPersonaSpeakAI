from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from utils.gpt_simple import ChatSimple

app = Flask(__name__)
CORS(app, resource={r"/initiateSession/*": {"origins": "*"}})

job_title = 'Associate software engineer'
job_skill = "python, react js"
experience = 3
job_level = "senior"
keywords = "AWS, Docker, fast learner"
industry_department = "software developement"

@app.route('/initiateSession/generateQuestions', methods=['GET','POST'])
def generate_questions():
    """
    Returns response from gpt api
    """

    # Extract query parameters from the request
    # job_title = request.form['jobTitle']
    # job_skill = request.form['jobSkill']
    # experience = request.form['yearsOfExperience']
    # job_level = request.form['jobLevel']
    # keywords = request.form['keywords']
    # industry_department = request.form['industryDepartment']


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
    app.run(host='0.0.0.0', debug=True)
