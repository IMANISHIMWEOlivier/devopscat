// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Store in localStorage (in a real app, this would be sent to a server)
            let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({
                ...formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            // Show success message
            alert('Thank you! Your message has been sent successfully.');
            
            // Reset form
            contactForm.reset();
        });
    }
});

