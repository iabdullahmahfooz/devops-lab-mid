const { validateSubmission, submissions } = require('./app');

beforeEach(() => submissions.length = 0);

test('Valid submission URL', () => {
    const res = validateSubmission('Ali', 'FA23-123', 'Lab', 'http://github.com');
    expect(res.success).toBe(true);
});

test('Missing registration number', () => {
    const res = validateSubmission('Ali', '', 'Lab', 'http://github.com');
    expect(res.error).toBe("Missing registration number");
});

test('Invalid submission URL', () => {
    const res = validateSubmission('Ali', 'FA23-123', 'Lab', 'not-a-url');
    expect(res.error).toBe("Invalid submission URL");
});