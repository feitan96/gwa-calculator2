document.getElementById("generateBoxes").addEventListener("click", function() {
    const subjectCount = parseInt(document.getElementById("subjectCount").value);
    const gradingFormat = document.querySelector('input[name="gradingFormat"]:checked').value;
    const subjectBoxes = document.getElementById("subjectBoxes");

    subjectBoxes.innerHTML = "";

    for (let i = 1; i <= subjectCount; i++) {
        const box = document.createElement("div");
        box.className = "subject-box";
        box.innerHTML = `
            <h3>Subject ${i}</h3>
            <label for="grade${i}">Grade:</label>
            <input type="number" id="grade${i}" class="subject-grade">
            ${gradingFormat !== "100" ? `<label for="units${i}">Units:</label>
            <input type="number" id="units${i}" class="subject-units">` : ''}
        `;
        subjectBoxes.appendChild(box);
    }

    // Disable unit input text boxes for the 100 format after generating boxes
    document.querySelectorAll(".subject-units").forEach(input => {
        input.disabled = gradingFormat === "100";
    });
});

document.getElementById("calculateGWA").addEventListener("click", function() {
    const gradingFormat = document.querySelector('input[name="gradingFormat"]:checked').value;
    let gwa = 0;
    let message = "";
    let backgroundColor = "";

    // Disable unit input text boxes for the 100 format
    document.querySelectorAll(".subject-units").forEach(input => {
        input.disabled = gradingFormat === "100";
    });

    if (gradingFormat === "5.0" || gradingFormat === "1.0") {
        const subjectBoxes = document.getElementsByClassName("subject-box");
        let totalWeightedPoints = 0;
        let totalUnits = 0;

        for (const box of subjectBoxes) {
            const units = parseFloat(box.querySelector(".subject-units").value);
            const grade = parseFloat(box.querySelector(".subject-grade").value);

            if (!isNaN(units) && !isNaN(grade)) {
                totalWeightedPoints += units * grade;
                totalUnits += units;
            } else if (isNaN(grade) && gradingFormat === "5.0") {
                document.getElementById("result").textContent = "Enter valid grades and units.";
                document.getElementById("result").style.backgroundColor = "#f2f2f2";
                return; // Exit the function early if invalid grade in 5.0 format
            }
        }

        if (totalUnits > 0) {
            gwa = totalWeightedPoints / totalUnits;
        } else {
            document.getElementById("result").textContent = "Enter valid grades and units.";
            document.getElementById("result").style.backgroundColor = "#f2f2f2";
            return; // Exit the function early if no valid units
        }
    } else if (gradingFormat === "100") {
        const subjectBoxes = document.getElementsByClassName("subject-box");
        let totalGrades = 0;
        let validSubjects = 0;

        for (const box of subjectBoxes) {
            const grade = parseFloat(box.querySelector(".subject-grade").value);
            if (!isNaN(grade)) {
                totalGrades += grade;
                validSubjects++;
            }
        }

        if (validSubjects > 0) {
            gwa = totalGrades / validSubjects;

            if (gwa >= 97) {
                //message = "With Highest Honor!";
                backgroundColor = "#73ad21";
            } else if (gwa >= 95) {
                //message = "With High Honor!";
                backgroundColor = "#98c34d";
            } else if (gwa >= 90) {
                //message = "With Honor!";
                backgroundColor = "#c3d077";
            } else if (gwa >= 75) {
                //message = "You Passed!";
                backgroundColor = "#f0e68c";
            } else {
                //message = "You Failed!";
                backgroundColor = "#ff5733";
            }
        } else {
            document.getElementById("result").textContent = "Enter valid grades.";
            document.getElementById("result").style.backgroundColor = "#f2f2f2";
            return; // Exit the function early if no valid subjects
        }
    }

    if (gradingFormat === "5.0") {
        if (gwa >= 4.8) {
            //message = "Highest Achiever!";
            backgroundColor = "#73ad21";
        } else if (gwa >= 4.6) {
            //message = "High Achiever!";
            backgroundColor = "#98c34d";
        } else if (gwa >= 4.4) {
            //message = "Achiever!";
            backgroundColor = "#c3d077";
        } else if (gwa >= 4.0) {
            //message = "Achiever gihapon pero slight ra!";
            backgroundColor = "#f0e68c";
        } else if (gwa > 3.0) {
            //message = "You Passed!";
            backgroundColor = "#ffc04c";
        } else if (gwa >= 3.0) {
            //message = "Nakakapyut ang amaw!";
            backgroundColor = "#ffc04c";
        } else {
            //message = "Failed!";
            backgroundColor = "#ff5733";
        }
    } else if (gradingFormat === "1.0") {
        if (gwa <= 1.2) {
            //message = "Highest Achiever!";
            backgroundColor = "#73ad21";
        } else if (gwa <= 1.4) {
            //message = "High Achiever!";
            backgroundColor = "#98c34d";
        } else if (gwa <= 1.6) {
            //message = "Achiever!";
            backgroundColor = "#c3d077";
        } else if (gwa <= 2.0) {
            //message = "Achiever gihapon pero slight ra!";
            backgroundColor = "#f0e68c";
        } else if (gwa <= 3.0) {
            //message = "You Passed!";
            backgroundColor = "#ffc04c";
        } else {
            //message = "Bogoa sa boang!";
            backgroundColor = "#ff5733";
        }
    }

    document.getElementById("result").style.backgroundColor = backgroundColor;
    document.getElementById("result").textContent = `Your GWA is: ${gwa.toFixed(2)} ${message}`;
});
