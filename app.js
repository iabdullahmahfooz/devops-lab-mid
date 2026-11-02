let submissions = [];

function validateSubmission(name, reg, title, url) {
    if (!reg || reg.trim() === '') return { error: "Missing registration number" };
    try { new URL(url); } catch (_) { return { error: "Invalid submission URL" }; }

    const entry = { name, reg, title, url };
    submissions.push(entry);
    return { success: true, entry };
}

if (typeof window !== 'undefined') {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const res = validateSubmission(
            document.getElementById('name').value,
            document.getElementById('regNo').value,
            document.getElementById('title').value,
            document.getElementById('url').value
        );
        const msg = document.getElementById('msg');
        if (res.error) { msg.style.color = 'red'; msg.innerText = res.error; }
        else { msg.style.color = 'green'; msg.innerText = "Saved!"; }
    });
}
if (typeof module !== 'undefined') module.exports = { validateSubmission, submissions };