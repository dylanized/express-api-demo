const express = require('express');

// instantiate express app
const app = express();

// if port env var, use it, else use default
const port = (process.env.PORT) || 3000;

// mount ReportSave route
app.post('/report', (req, res) => {
	// if no report or report is not valid, send error
	if (!req.params.report && !validateReport(req.params.report)) res.sendStatus(500);
	// else if report saves successfully, send success msg
	else if (saveReport(req.params.report)) res.sendStatus(200);
	// else report save failed, send error
	else res.sendStatus(500);
});

// mount ReportGet route - /report?id=123
app.get('/report', (req, res) => {
	// if no report id or report id is not valid, send error
	if (!req.query.id) res.sendStatus(500);
	// else handle request
	else {
		// try to get report
		const report = getReport(req.params.id);
		// if report found, send it
		if (report) res.send(report);
		// else no report found, send error
		else res.sendStatus(500);
	}
});

// mount catchall error route
app.get('*', (req, res) => {
	res.sendStatus(401);
});

// define report validater
const validateReport = (report) => {
	// if report validates, return true
	if (report) return true;
	// else return false
	return false;
};

// define report saver
const saveReport = (report) => {
	// if report saves, return true
	if (report) return true;
	// else return false
	return false;
};

// define report getter
const getReport = (id) => {
	// load report
	const report = {
		text: 'Report goes here',
	};
	// if report loaded, return it
	if (report) return report;
	// else return false
	return false;
};

// define questions getter
const getQuestions = (id) => {
	// load questions
	const questions = [
		{
			question: 'What is your name?',
			answer: 'Jane Doe',
		},
	];
	// if questions loaded, return them
	if (questions) return questions;
	// else return false
	return false;
};

// launch app and display console msg
app.listen(port, () => console.log(`Express is running on port ${ port }`));
