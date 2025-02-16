function generateSecretSanta() {
    const currentYearFile = document.getElementById("currentYearFile").files[0];
    const previousYearFile = document.getElementById("previousYearFile").files[0];
    const outputDiv = document.getElementById("output");

    // Clear previous output
    outputDiv.innerHTML = "";

    if (!currentYearFile || !previousYearFile) {
        outputDiv.innerHTML = "<p style='color: red;'>Please upload both required files.</p>";
        return;
    }

    const fileExtension = (file) => file.name.split(".").pop().toLowerCase();

    if (fileExtension(currentYearFile) !== "csv" || fileExtension(previousYearFile) !== "csv") {
        outputDiv.innerHTML = "<p style='color: red;'>Invalid file type. Please upload CSV files.</p>";
        return;
    }

    let currentYearData, previousYearData;

    // Read and parse both files
    Promise.all([
        parseCSVFile(currentYearFile),
        parseCSVFile(previousYearFile),
    ])
        .then(([currentData, previousData]) => {
            currentYearData = currentData;
            previousYearData = previousData;

            // Validate required columns
            const currentKeys = Object.keys(currentYearData[0]).map((key) => key.toLowerCase());
            const previousKeys = Object.keys(previousYearData[0]).map((key) => key.toLowerCase());

            if (
                !currentKeys.includes("employee_name") ||
                !currentKeys.includes("employee_emailid")
            ) {
                throw new Error("Current year file must contain 'Employee_Name' and 'Employee_EmailID' columns.");
            }

            if (
                !previousKeys.includes("employee_name") ||
                !previousKeys.includes("employee_emailid") ||
                !previousKeys.includes("secret_child_name") ||
                !previousKeys.includes("secret_child_emailid")
            ) {
                throw new Error("Previous year file must contain 'Employee_Name', 'Employee_EmailID', 'Secret_Child_Name', and 'Secret_Child_EmailID' columns.");
            }

            // Generate Secret Santa pairs
            const pairs = generatePairs(currentYearData, previousYearData);

            // Display pairs in a table
            const tableHTML = `
                                <div>
                                    <button class="button" onclick="downloadCSV()">Download Secret Santa Pairs</button>
                                </div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Employee Email ID</th>
                                        <th>Secret Child Name</th>
                                        <th>Secret Child Email ID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    ${pairs
                                            .map(
                                                (pair) => `
                                        <tr>
                                        <td>${pair.Employee_Name}</td>
                                        <td>${pair.Employee_EmailID}</td>
                                        <td>${pair.Secret_Child_Name}</td>
                                        <td>${pair.Secret_Child_EmailID}</td>
                                        </tr>
                                    `
                                            )
                                            .join("")}
                                    </tbody>
                                </table>
                                `;

            outputDiv.innerHTML = tableHTML;

            // Save pairs for download
            window.secretSantaPairs = pairs;
        })
        .catch((error) => {
            outputDiv.innerHTML = `<p style='color: red;'>${error.message}</p>`;
        });
}

function parseCSVFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => resolve(results.data),
                error: (error) => reject(error),
            });
        };
        reader.readAsText(file);
    });
}

function generatePairs(currentYearData, previousYearData) {
    const employees = currentYearData.map((row) => ({
        name: row["Employee_Name"],
        email: row["Employee_EmailID"],
    }));

    const previousAssignments = new Map(
        previousYearData.map((row) => [row["Employee_EmailID"], row["Secret_Child_EmailID"]])
    );

    const availableRecipients = [...employees];

    const pairs = employees.map((employee) => {
        // Filter recipients to avoid self-assignments and previous year's assignments
        const validRecipients = availableRecipients.filter(
            (recipient) =>
                recipient.email !== employee.email &&
                previousAssignments.get(employee.email) !== recipient.email
        );

        if (validRecipients.length === 0) {
            throw new Error("Unable to generate valid Secret Santa pairs. Please ensure there are no conflicts.");
        }

        // Assign a random valid recipient
        const recipient = validRecipients.splice(
            Math.floor(Math.random() * validRecipients.length),
            1
        )[0];

        // Remove the assigned recipient from the pool
        const recipientIndex = availableRecipients.findIndex((r) => r.email === recipient.email);
        availableRecipients.splice(recipientIndex, 1);

        return {
            Employee_Name: employee.name,
            Employee_EmailID: employee.email,
            Secret_Child_Name: recipient.name,
            Secret_Child_EmailID: recipient.email,
        };
    });

    return pairs;
}

function downloadCSV() {
    if (!window.secretSantaPairs) {
        alert("No pairs to download. Generate pairs first!");
        return;
    }

    const csv = Papa.unparse(window.secretSantaPairs);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "Secret_Santa_Pairs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
