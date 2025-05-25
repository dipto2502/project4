import React, { useState } from 'react';

const ContactUsPage = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State for form submission status and messages
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // In a real application, you would send this data to your backend API.
    // For this example, we'll simulate an API call.
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate a successful response
      console.log('Form data submitted:', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-rose-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8">
          Contact <span className="text-red-600">Us</span>
        </h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Have questions, feedback, or just want to say hello? Fill out the form below, and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              required
            />
          </div>

          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block text-gray-700 text-lg font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Regarding an order / General inquiry"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              placeholder="Type your message here..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-y"
              required
            ></textarea>
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            disabled={status === 'Sending...'}
          >
            {status === 'Sending...' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status Message */}
          {status && (
            <p className={`text-center text-lg mt-4 ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
