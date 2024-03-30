import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomizeUserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, username, profilePicture, bio });
    alert('Profile updated successfully!');
    navigate('/dashboard');
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
  };

  // Adjusted inline styles specific to this component
  const styles = {
    formContainer: {
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Align items to the left
    },
    heading: {
      alignSelf: 'flex-start', // Align the heading to the left
      fontSize: '28px', // Increase the font size of the heading
      marginBottom: '20px',
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%', // Ensure the container uses the full width
    },
    leftColumn: {
      flex: '1',
    },
    rightColumn: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: '90%', // Adjust input width
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    textarea: {
      width: '90%', // Adjust textarea width
      height: '100px',
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    profileImageBox: {
      border: '1px solid #ccc', // Box around the current profile picture
      padding: '10px',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '10px', // Add some space between the box and the "Choose File" button
    },
    profileImage: {
      maxWidth: '200px',
      borderRadius: '5px',
    },
    button: {
      cursor: 'pointer',
      padding: '10px 20px',
      backgroundColor: '#FFA0A3',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      width: '50%', // Make the button width smaller
      marginTop: '20px',
    },
  };

  return (
    <div className="App" style={styles.formContainer}>
      <h1 style={styles.heading}>Customize Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.profileContainer}>
          <div style={styles.leftColumn}>
            <input style={styles.input} type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input style={styles.input} type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            <input style={styles.input} type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <textarea style={styles.textarea} placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
          </div>
          <div style={styles.rightColumn}>
            <input type="file" onChange={handlePictureChange} />
            <div style={styles.profileImageBox}>
              {profilePicture && (
                <>
                  <img src={profilePicture} alt="Profile" style={styles.profileImage} />
                  <button style={{ ...styles.button, marginTop: '10px', width: 'auto' }} onClick={handleRemovePicture}>Remove Picture</button>
                </>
              )}
            </div>
          </div>
        </div>
        <button style={{ ...styles.button, marginTop: '20px', width: 'auto' }} type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default CustomizeUserProfile
