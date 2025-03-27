document.getElementById('fileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      const imageData = event.target.result;
      const message = document.getElementById('secretMessage').value;
      
      // Encrypt and hide
      const response = await fetch('http://localhost:3000/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          imagePath: imageData 
        })
      });
      
      const result = await response.json();
      document.getElementById('result').src = result.stegoImage;
    };
    
    reader.readAsDataURL(file);
  });