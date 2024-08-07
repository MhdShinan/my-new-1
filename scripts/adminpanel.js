/*document.getElementById('skillsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const skillName = document.getElementById('skillName').value;
    const skillLevel = document.getElementById('skillLevel').value;
    const skillPercentage = document.getElementById('skillPercentage').value;
    const skillColumn = document.getElementById('skillColumn').value;

    let skillClass;
    switch(skillLevel) {
        case 'Expert':
            skillClass = 'bg-expert';
            break;
        case 'Average':
            skillClass = 'bg-average';
            break;
        case 'Beginner':
            skillClass = 'bg-beginner';
            break;
        default:
            skillClass = 'bg-expert';
    }

    fetch('/save-skill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            skillName,
            skillLevel,
            skillPercentage,
            skillColumn,
            skillClass
        }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});*/
