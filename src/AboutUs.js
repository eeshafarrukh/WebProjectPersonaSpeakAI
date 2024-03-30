import React, { useState } from 'react';
import './AboutUs.css'; // Ensure this path matches where your CSS file is located

const AboutUs = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [section]: !prevExpandedSections[section],
    }));
  };

  return (
    <div className="AboutUs-Container">
      <h1 className="AboutUs-Title">About PersonaSpeakAI</h1>
      <div className="AboutUs-Content">
        <section>
          <h2 className="AboutUs-SectionHeading">Brief Description</h2>
          <p className="AboutUs-Text">
            The PersonaSpeakAI is an AI interview platform that represents a pioneering leap in the realm of recruitment and talent acquisition.
          </p>
          {expandedSections['BriefDescription'] ? (
            <>
              <p className="AboutUs-Text">
                This innovative web application harnesses the power of artificial intelligence to delve into the intricacies of both verbal and non-verbal communication exhibited by candidates during interviews. By employing advanced algorithms and machine learning techniques, PersonaSpeakAI scrutinizes responses against predefined company requirements, going beyond mere keywords to discern nuances in tone, body language, and contextual understanding.
              </p>
              <button onClick={() => toggleSection('BriefDescription')} className="AboutUs-ShowMore">
                Show Less
              </button>
            </>
          ) : (
            <button onClick={() => toggleSection('BriefDescription')} className="AboutUs-ShowMore">
              Read More
            </button>
          )}
        </section>

        {/* Additional sections with similar structure */}
        <section>
          <h2 className="AboutUs-SectionHeading">Core Functionality</h2>
          <p className="AboutUs-Text">
            At its core, PersonaSpeakAI seeks to transcend the limitations of conventional hiring methodologies by providing employers with comprehensive and insightful evaluations of candidate interactions.
          </p>
          {expandedSections['CoreFunctionality'] ? (
            <>
              <p className="AboutUs-Text">
                Through its sophisticated analysis, the platform offers a holistic perspective on each interviewee's suitability for the role, enabling recruiters to make more informed decisions. Gone are the days of relying solely on resumes and gut instincts; PersonaSpeakAI equips hiring managers with a data-driven approach, facilitating a fair and unbiased assessment process.
              </p>
              <button onClick={() => toggleSection('CoreFunctionality')} className="AboutUs-ShowMore">
                Show Less
              </button>
            </>
          ) : (
            <button onClick={() => toggleSection('CoreFunctionality')} className="AboutUs-ShowMore">
              Read More
            </button>
          )}
        </section>

        <section>
          <h2 className="AboutUs-SectionHeading">Benefits</h2>
          <p className="AboutUs-Text">
            By revolutionizing the hiring process, PersonaSpeakAI not only streamlines recruitment efforts but also ensures that organizations secure the best possible talent for their teams.
          </p>
          {expandedSections['Benefits'] ? (
            <>
              <p className="AboutUs-Text">
                Beyond efficiency gains, the platform fosters diversity and inclusion by minimizing unconscious biases and promoting equal opportunities based on merit. With PersonaSpeakAI, employers can confidently navigate the complexities of candidate evaluation, paving the way for stronger, more cohesive teams and driving sustained organizational success in today's competitive landscape.
              </p>
              <button onClick={() => toggleSection('Benefits')} className="AboutUs-ShowMore">
                Show Less
              </button>
            </>
          ) : (
            <button onClick={() => toggleSection('Benefits')} className="AboutUs-ShowMore">
              Read More
            </button>
          )}
        </section>

        <section>
          <h2 className="AboutUs-SectionHeading">Scope</h2>
          <p className="AboutUs-Text">
            This project entails developing a comprehensive AI-driven interview platform with a focus on fundamental business logic, personal productivity, collaboration, and user-centric features.
          </p>
          {expandedSections['Scope'] ? (
            <>
              <p className="AboutUs-Text">
                Functional requirements highlight AI algorithms for assessment, detailed reports, and secure authentication across devices. Additional elements include AI recommendations, user profiles, intuitive navigation, and collaboration tools. Extra features like photo showcases, blogging, social media buttons, PDF generation, and cash flow statements enhance versatility. The project also prioritizes coding excellence with clean code, security measures, and adherence to industry standards. Responsive design ensures optimal performance on various devices, while robust error handling and secure user authentication contribute to reliability and security.
              </p>
              <button onClick={() => toggleSection('Scope')} className="AboutUs-ShowMore">
                Show Less
              </button>
            </>
          ) : (
            <button onClick={() => toggleSection('Scope')} className="AboutUs-ShowMore">
              Read More
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
