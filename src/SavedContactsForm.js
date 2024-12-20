import React, { useState } from 'react';

function SavedContactsForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseColor, setResponseColor] = useState('#000000');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = { name, password };

        try {
            const response = await fetch("https://www.butt-and-co.co.uk/api/user/update_customer_laokehu/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            let message;
            let color;
            switch (data.message) {
                case 'Wrong password':
                    message = 'Password is wrong!';
                    color = '#ff0000';
                    break;
                case 'Customer updated successfully':
                    message = 'Congrats, Customer updated successfully!';
                    color = '#00ff00';
                    break;
                case 'Customer not found':
                    message = 'Sorry, Customer not found!';
                    color = '#ffcc00';
                    break;
                case 'Invalid request method':
                    message = 'Invalid request, please try again.';
                    color = '#ff00ff';
                    break;
                default:
                    message = JSON.stringify(data, null, 2);
                    color = '#000000';
            }

            setResponseMessage(message);
            setResponseColor(color);
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
            setResponseColor('#ff0000');
        }
    };

    return (
        <div>
            <h1>AUTOSQUEAK Delivery Premium Upgrade</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                <label htmlFor="nameInput">UserName:</label>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '5px', width: '100%', marginBottom: '10px' }}
                />

                <label htmlFor="passwordInput">Password:</label>
                <input
                    type="password"
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '5px', width: '100%', marginBottom: '10px' }}
                />

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px' }}>
                    Submit
                </button>
            </form>

            {responseMessage && (
                <div
                    id="response"
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        backgroundColor: '#f2f2f2',
                        whiteSpace: 'pre-wrap',
                        color: responseColor,
                    }}
                >
                    {responseMessage}
                </div>
            )}
        </div>
    );
}

export default SavedContactsForm;
