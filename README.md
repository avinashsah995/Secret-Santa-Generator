# Secret Santa Generator!

## Deployed Link
<a href="https://your-deployed-link.com" target="_blank">View the Live Application</a>

## Overview

This project is a web-based **Secret Santa Generator** application that assigns a Secret Child to each employee while following specific constraints:

1.  An employee cannot be their own Secret Child.
2.  An employee cannot have the same Secret Child as the previous year.
3.  Each employee must have a unique Secret Child assignment.

The program takes two CSV files as input:

1.  **Current Year Employee List**: Contains employee details for the current year.
2.  **Previous Year Assignments**: Contains employee assignments from the previous year.

The program generates a new CSV file with the following fields:

-   `Employee_Name`
-   `Employee_EmailID`
-   `Secret_Child_Name`
-   `Secret_Child_EmailID`


## Features

-   **Web-based**: A user-friendly interface for file uploads and downloading results.
-   **Constraint Handling**: Automatically handles the constraints for assigning Secret Children.
-   **CSV Input/Output**: Accepts CSV files as input and generates a CSV file as output.
-   **Error Validation**: Ensures input files are valid and displays helpful error messages.

## Installation and Setup

### Prerequisites

To use the Secret Santa Generator, ensure you have:

-   A modern web browser (e.g., Chrome, Firefox, Edge).
-   No additional installations are required as the solution is entirely browser-based.

### Files in the Project

1.  **index.html**: The main webpage for the application.
2.  **styles.css**: Stylesheet for designing the webpage.
3.  **script.js**: JavaScript file containing the application logic.
4.  **example_current_year.csv**: Sample CSV file for the current year employee list.
5.  **example_previous_year.csv**: Sample CSV file for the previous year’s assignments.

## Usage Instructions

1.  **Clone or Download the Project**
    
    -   Clone the repository or download the project files to your local machine:
    - 
        `git clone https://github.com/your-repo/secret-santa-generator.git` 
        
    -   Navigate to the project folder.
2.  **Open the Application**
    
    -   Open the `index.html` file in any modern web browser by double-clicking it or dragging it into the browser window.
3.  **Upload Input Files**
    
    -   Upload the **Current Year Employee List** CSV file in the first input box. Ensure the file contains the fields `Employee_Name` and `Employee_EmailID`.
    -   Upload the **Previous Year Assignments** CSV file in the second input box. Ensure the file contains the fields `Employee_Name`, `Employee_EmailID`, `Secret_Child_Name`, and `Secret_Child_EmailID`.
4.  **Generate Secret Santa Assignments**
    
    -   Click the **Generate Secret Santa** button.
    -   If the input files are valid, the program will:
        -   Display the assignments in a table.
        -   Provide a download link for the resulting CSV file.
5.  **Download the Output**
    
    -   Click the **Download CSV** button to save the generated assignments to your local machine.


## Input and Output Formats

### Current Year Employee List (Input CSV)

| Field               | Description                   |
| --------------------|:-----------------------------:|
| Employee_Name       | The name of the employee.     |
| Employee_EmailID    | The email ID of the employee. |


Example:

Employee_Name,Employee_EmailID 
Alice,alice@company.com 
Bob,bob@company.com Charlie,charlie@company.com

### Previous Year Assignments (Input CSV)

| Field                | Description                            |
| ---------------------|:--------------------------------------:|
| Employee_Name        | The name of the employee.              |
| Employee_EmailID     | The email ID of the employee.          |
| Secret_Child_Name    | The name of the Secret Child assigned. |
| Secret_Child_EmailID | The email ID of the Secret Child.      |

Example:

Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID 
Alice,alice@company.com,Bob,bob@company.com
Bob,bob@company.com,Charlie,charlie@company.com 
Charlie,charlie@company.com,Alice,alice@company.com

### Output CSV

| Field                | Description                               |
| ---------------------|:-----------------------------------------:|
| Employee_Name        | The name of the employee.                 |
| Employee_EmailID     | The email ID of the employee.             |
| Secret_Child_Name    | The name of the assigned Secret Child.    |
| Secret_Child_EmailID | The email ID of the assigned Secret Child.|

Example:

Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
Alice,alice@company.com,Charlie,charlie@company.com 
Bob,bob@company.com,Alice,alice@company.com
Charlie,charlie@company.com,Bob,bob@company.com


## Error Handling

The program validates input files for the following:

1.  **File Type**:
    
    -   Only `.csv` files are accepted. Any other file type will show an error.
2.  **Missing or Incorrect Columns**:
    
    -   If the required columns (`Employee_Name`, `Employee_EmailID`, etc.) are missing or incorrect, an error message will be displayed.
3.  **Constraint Violations**:
    
    -   If it’s impossible to generate pairs due to constraints (e.g., insufficient eligible recipients), an error will be displayed.

----------

## Code Explanation

### JavaScript Highlights (`script.js`)

-   **File Upload Handling**:
    
    -   Uses the [Papa Parse](https://www.papaparse.com/) library to parse CSV files into JavaScript objects.
-   **Constraint Logic**:
    
    -   Filters eligible recipients to ensure:
        -   An employee cannot be their own Secret Child.
        -   An employee cannot be assigned the same Secret Child as last year.
        -   Every employee gets a unique Secret Child.
-   **Random Assignment**:
    
    -   Randomly selects a recipient from the eligible pool to ensure unpredictability.
-   **Output CSV Generation**:
    
    -   Creates a downloadable CSV file using the generated assignments.

For a detailed explanation of the JavaScript, refer to the `script.js` file or check out the comments within the code.

----------

## Additional Notes

-   **Cross-Browser Compatibility**:
    
    -   The application works with modern browsers, including Chrome, Firefox, and Edge.
-   **Performance**:
    
    -   The program is designed to handle small to medium datasets efficiently. For larger datasets, additional optimizations may be required.
-   **Security**:
    
    -   All processing is done locally in the browser. No data is sent to a server, ensuring data privacy.

----------

## Future Enhancements

-   Add support for larger datasets with server-side processing.
-   Provide additional validation options for edge cases.
-   Enhance the UI for better user experience.

----------

## Contact

For questions, issues, or suggestions, feel free to reach out to:

-   **Developer**: Avinash Sah
-   **Email**: sahavinash977@gmail.com