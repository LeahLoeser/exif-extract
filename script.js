// Wait for DOM content load before executing script
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

    // File selection
    function handleFileSelect(event) {
        // Retrieve selected
        const file = event.target.files[0];

        if (file) {
            readExifData(file);
        }
    }

    // Read Exif data
    function readExifData(file) {
        // Create a new FileReader to read the file content
        const reader = new FileReader();

        // Define a callback function to be executed when the file reading is complete
        reader.onload = function (e) {
            // Get the ArrayBuffer of the file content
            const arrayBuffer = e.target.result;

            // Use the EXIF library to read Exif data from the ArrayBuffer
            const exifData = EXIF.readFromBinaryFile(arrayBuffer);

            // Display the read Exif data
            displayExifData(exifData);
        };

        // Read the file content as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    }

    // Function to display Exif data on the webpage
    function displayExifData(exifData) {
        // Get the HTML element with the id 'exifData'
        const exifDataElement = document.getElementById('exifData');

        // Display the Exif data as a formatted JSON string with indentation
        exifDataElement.textContent = JSON.stringify(exifData, null, 2);
    }

});
