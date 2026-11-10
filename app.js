let submissions = [];

function validateSubmission(name, reg, title, url) {
    if (!reg || reg.trim() === '') return { error: "Missing registration number" };
    try { new URL(url); } catch (_) { return { error: "Invalid submission URL" }; }

    // Store the time of submission for the UI
    const entry = { name, reg, title, url, time: new Date().toLocaleTimeString() };
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
        msg.classList.remove('hidden');
        
        if (res.error) { 
            msg.className = 'p-3 rounded-md text-sm font-medium bg-red-100 text-red-700 mb-4';
            msg.innerText = "Error: " + res.error; 
        } else { 
            msg.className = 'p-3 rounded-md text-sm font-medium bg-green-100 text-green-700 mb-4';
            msg.innerText = "Assignment saved successfully!"; 
            renderList();
            document.getElementById('form').reset();
            
            // Auto-hide success message after 3 seconds
            setTimeout(() => { msg.classList.add('hidden'); }, 3000);
        }
    });

    function renderList() {
        const list = document.getElementById('list');
        list.innerHTML = '';
        
        // Reverse array so newest submissions appear at the top
        submissions.slice().reverse().forEach(sub => {
            const li = document.createElement('li');
            li.className = 'p-4 border border-gray-200 rounded-md hover:bg-indigo-50 transition-colors flex justify-between items-center group';
            li.innerHTML = `
                <div>
                    <p class="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        ${sub.name} <span class="text-gray-500 text-sm font-normal">(${sub.reg})</span>
                    </p>
                    <a href="${sub.url}" target="_blank" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium underline transition-colors">
                        ${sub.title}
                    </a>
                </div>
                <span class="text-xs text-gray-400 font-medium">${sub.time}</span>
            `;
            list.appendChild(li);
        });
    }
}

if (typeof module !== 'undefined') module.exports = { validateSubmission, submissions };